'use strict';

require('dotenv').config();

const express = require('express');
const path = require('path');
const crypto = require('crypto');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { Pool } = require('pg');
const OpenAI = require('openai');

const app = express();

const PORT = Number(process.env.PORT || 3000);
const NODE_ENV = process.env.NODE_ENV || 'production';

app.disable('x-powered-by');
app.set('trust proxy', 1);

/* =========================================================
   SECURITY
========================================================= */

const allowedOrigins = (process.env.CORS_ORIGIN ||
  'https://www.nexoraonline.de,https://nexoraonline.de')
  .split(',')
  .map(v => v.trim())
  .filter(Boolean);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    hsts:
      NODE_ENV === 'production'
        ? {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true
          }
        : false
  })
);

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser/server-to-server requests.
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('CORS origin not allowed'));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
    maxAge: 86400
  })
);

app.use(
  express.json({
    limit: '256kb',
    strict: true
  })
);

app.use(
  express.urlencoded({
    extended: false,
    limit: '128kb'
  })
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    error: 'RATE_LIMITED',
    message: 'Too many requests. Please try again later.'
  }
});

const sensitiveLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    error: 'RATE_LIMITED',
    message: 'Too many requests. Please try again later.'
  }
});

app.use('/api', apiLimiter);

/* =========================================================
   POSTGRESQL
========================================================= */

const DATABASE_URL = process.env.DATABASE_URL;

let pool = null;
let dbReady = false;

if (DATABASE_URL) {
  pool = new Pool({
    connectionString: DATABASE_URL,
    max: Number(process.env.DB_POOL_MAX || 10),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    ssl:
      process.env.DATABASE_SSL === 'false'
        ? false
        : { rejectUnauthorized: false }
  });

  pool.on('error', err => {
    console.error('[PostgreSQL] Unexpected pool error:', err.message);
  });
}

async function initializeDatabase() {
  if (!pool) {
    console.warn(
      '[Database] DATABASE_URL is not configured. Database-backed API routes are disabled.'
    );
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS clients (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      company TEXT,
      email TEXT NOT NULL,
      service TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS pipeline_requests (
      id UUID PRIMARY KEY,
      client_id BIGINT REFERENCES clients(id) ON DELETE SET NULL,
      type TEXT NOT NULL,
      payload JSONB NOT NULL DEFAULT '{}'::jsonb,
      stage TEXT NOT NULL DEFAULT 'RECEIVED',
      result JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS agent_runs (
      id UUID PRIMARY KEY,
      agent TEXT NOT NULL,
      payload JSONB NOT NULL DEFAULT '{}'::jsonb,
      result JSONB,
      status TEXT NOT NULL DEFAULT 'RECEIVED',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_pipeline_requests_stage
      ON pipeline_requests(stage);

    CREATE INDEX IF NOT EXISTS idx_pipeline_requests_created_at
      ON pipeline_requests(created_at DESC);

    CREATE INDEX IF NOT EXISTS idx_agent_runs_created_at
      ON agent_runs(created_at DESC);
  `);

  dbReady = true;
  console.log('[Database] PostgreSQL initialized successfully.');
}

function databaseRequired(req, res, next) {
  if (!pool || !dbReady) {
    return res.status(503).json({
      success: false,
      error: 'DATABASE_NOT_CONFIGURED',
      message:
        'Persistent database is not configured or is still initializing.'
    });
  }

  next();
}

/* =========================================================
   OPENAI
========================================================= */

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  : null;

const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

async function runOpenAI(systemPrompt, userPrompt) {
  if (!openai) {
    return {
      enabled: false,
      message:
        'AI provider is not configured. Set OPENAI_API_KEY in the production environment.'
    };
  }

  const response = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    temperature: 0.2,
    messages: [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: userPrompt
      }
    ]
  });

  return {
    enabled: true,
    model: OPENAI_MODEL,
    content: response.choices?.[0]?.message?.content || ''
  };
}

/* =========================================================
   CONSTANTS
========================================================= */

const LANGUAGES = [
  'de',
  'en',
  'fr',
  'es',
  'it',
  'nl',
  'pt',
  'pl',
  'sv',
  'da',
  'no',
  'fi',
  'cs',
  'sk',
  'hu',
  'ro',
  'tr',
  'ar',
  'ja',
  'zh'
];

const AI_TEAM = [
  {
    id: 'general-manager',
    name: 'AI General Manager',
    role: 'Strategic orchestration and project management'
  },
  {
    id: 'lead-research',
    name: 'Lead Research',
    role: 'Market, competitor and business research'
  },
  {
    id: 'website-audit',
    name: 'Website Audit',
    role: 'Website structure, UX and technical audit'
  },
  {
    id: 'design-agent',
    name: 'Design Agent',
    role: 'UX/UI and visual direction'
  },
  {
    id: 'quote-generator',
    name: 'Quote Generator',
    role: 'Project scope and quotation preparation'
  },
  {
    id: 'advertising-agent',
    name: 'Advertising Agent',
    role: 'Campaign strategy and advertising'
  },
  {
    id: 'development-agent',
    name: 'Development Agent',
    role: 'Frontend and backend implementation'
  },
  {
    id: 'qa-agent',
    name: 'QA Agent',
    role: 'Quality assurance and testing'
  },
  {
    id: 'launch-agent',
    name: 'Launch Agent',
    role: 'Deployment and production launch'
  }
];

const PIPELINE_STAGES = [
  'RECEIVED',
  'ANALYZING',
  'RESEARCHING',
  'ASSIGNED',
  'PROCESSING',
  'AI_REVIEW',
  'READY',
  'CLIENT_CONTACTED',
  'COMPLETED'
];

const PAYMENT_NOTICE = `
<section id="payment-integration-notice"
  style="
    margin:40px auto;
    max-width:1100px;
    padding:28px;
    border:1px solid rgba(255,255,255,.12);
    border-radius:20px;
    background:rgba(255,255,255,.035);
    color:inherit;
    font-family:inherit;
  ">
  <h2 style="margin:0 0 10px;">
    Payment Integration — Coming Soon
  </h2>
  <p style="margin:0;opacity:.78;line-height:1.7;">
    Official bank account integration and tax ID verification will be fully
    implemented and connected within one week.
  </p>
</section>
`;

/* =========================================================
   HELPERS
========================================================= */

function requestId() {
  return crypto.randomUUID();
}

function cleanString(value, maxLength = 500) {
  if (value === undefined || value === null) return '';
  return String(value).trim().slice(0, maxLength);
}

function jsonSafe(value) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return {};
  }
}

async function updatePipelineStage(id, stage, result = null) {
  if (!pool || !dbReady) return;

  await pool.query(
    `
      UPDATE pipeline_requests
      SET
        stage = $1,
        result = COALESCE($2::jsonb, result),
        updated_at = NOW()
      WHERE id = $3
    `,
    [stage, result ? JSON.stringify(result) : null, id]
  );
}

/* =========================================================
   HEALTH
========================================================= */

app.get('/api/health', async (req, res) => {
  let database = 'not_configured';

  if (pool && dbReady) {
    try {
      await pool.query('SELECT 1');
      database = 'connected';
    } catch {
      database = 'error';
    }
  }

  res.json({
    success: true,
    service: 'NEXORA Digital',
    status: 'online',
    environment: NODE_ENV,
    database,
    ai: Boolean(openai),
    payment: 'disabled',
    timestamp: new Date().toISOString()
  });
});

/* =========================================================
   LANGUAGE
========================================================= */

app.get('/api/language', (req, res) => {
  res.json({
    success: true,
    languages: LANGUAGES,
    count: LANGUAGES.length
  });
});

/* =========================================================
   AI TEAM
========================================================= */

app.get('/api/ai-team', (req, res) => {
  res.json({
    success: true,
    count: AI_TEAM.length,
    team: AI_TEAM
  });
});

/* =========================================================
   PIPELINE
========================================================= */

app.get('/api/pipeline', databaseRequired, async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        client_id,
        type,
        stage,
        created_at,
        updated_at
      FROM pipeline_requests
      ORDER BY created_at DESC
      LIMIT 100
    `);

    res.json({
      success: true,
      count: result.rows.length,
      stages: PIPELINE_STAGES,
      pipeline: result.rows
    });
  } catch (error) {
    next(error);
  }
});

/* =========================================================
   CLIENTS
========================================================= */

app.post(
  '/api/clients',
  sensitiveLimiter,
  databaseRequired,
  async (req, res, next) => {
    try {
      const name = cleanString(req.body.name, 150);
      const company = cleanString(req.body.company, 200);
      const email = cleanString(req.body.email, 254);
      const service = cleanString(req.body.service, 150);

      if (!name || !email) {
        return res.status(400).json({
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Name and email are required.'
        });
      }

      const result = await pool.query(
        `
          INSERT INTO clients
            (name, company, email, service)
          VALUES
            ($1, $2, $3, $4)
          RETURNING id, name, company, email, service, created_at
        `,
        [name, company || null, email, service || null]
      );

      res.status(201).json({
        success: true,
        client: result.rows[0]
      });
    } catch (error) {
      next(error);
    }
  }
);

app.get('/api/clients', databaseRequired, async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        company,
        email,
        service,
        created_at
      FROM clients
      ORDER BY created_at DESC
      LIMIT 100
    `);

    res.json({
      success: true,
      count: result.rows.length,
      clients: result.rows
    });
  } catch (error) {
    next(error);
  }
});

app.get('/api/clients/:id', databaseRequired, async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_CLIENT_ID'
      });
    }

    const result = await pool.query(
      `
        SELECT
          id,
          name,
          company,
          email,
          service,
          created_at
        FROM clients
        WHERE id = $1
      `,
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        success: false,
        error: 'CLIENT_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      client: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
});

/* =========================================================
   CLIENT STAGE
========================================================= */

app.post(
  '/api/clients/:id/stage',
  databaseRequired,
  async (req, res, next) => {
    try {
      const clientId = Number(req.params.id);
      const stage = cleanString(req.body.stage, 50).toUpperCase();

      if (!Number.isInteger(clientId) || clientId <= 0) {
        return res.status(400).json({
          success: false,
          error: 'INVALID_CLIENT_ID'
        });
      }

      if (!PIPELINE_STAGES.includes(stage)) {
        return res.status(400).json({
          success: false,
          error: 'INVALID_STAGE',
          allowedStages: PIPELINE_STAGES
        });
      }

      const result = await pool.query(
        `
          UPDATE pipeline_requests
          SET
            stage = $1,
            updated_at = NOW()
          WHERE client_id = $2
          RETURNING id, client_id, type, stage, updated_at
        `,
        [stage, clientId]
      );

      res.json({
        success: true,
        updated: result.rows
      });
    } catch (error) {
      next(error);
    }
  }
);

/* =========================================================
   AI COMMAND CENTER
========================================================= */

app.post(
  '/api/command',
  sensitiveLimiter,
  databaseRequired,
  async (req, res, next) => {
    const id = requestId();

    try {
      const command = cleanString(req.body.command, 5000);
      const clientId = req.body.clientId
        ? Number(req.body.clientId)
        : null;

      if (!command) {
        return res.status(400).json({
          success: false,
          error: 'COMMAND_REQUIRED'
        });
      }

      await pool.query(
        `
          INSERT INTO pipeline_requests
            (id, client_id, type, payload, stage)
          VALUES
            ($1, $2, 'COMMAND', $3::jsonb, 'RECEIVED')
        `,
        [
          id,
          Number.isInteger(clientId) ? clientId : null,
          JSON.stringify({ command })
        ]
      );

      await updatePipelineStage(id, 'ANALYZING');

      const aiResult = await runOpenAI(
        `
You are the AI General Manager of NEXORA Digital.
Analyze the client's command and determine the correct business workflow.
Return a concise operational response and identify which AI team member
should handle the next step.
Available team:
${AI_TEAM.map(a => `- ${a.name}: ${a.role}`).join('\n')}
        `,
        command
      );

      await updatePipelineStage(id, 'AI_REVIEW', aiResult);

      await updatePipelineStage(id, 'READY', aiResult);

      res.status(202).json({
        success: true,
        requestId: id,
        stage: 'READY',
        payment: 'disabled',
        ai: aiResult
      });
    } catch (error) {
      try {
        await updatePipelineStage(id, 'READY', {
          error: error.message
        });
      } catch {}

      next(error);
    }
  }
);

/* =========================================================
   WEBSITE AUDIT
========================================================= */

app.post(
  '/api/audit',
  sensitiveLimiter,
  databaseRequired,
  async (req, res, next) => {
    const id = requestId();

    try {
      const url = cleanString(req.body.url, 2048);

      if (!url) {
        return res.status(400).json({
          success: false,
          error: 'URL_REQUIRED'
        });
      }

      let parsed;

      try {
        parsed = new URL(url);
      } catch {
        return res.status(400).json({
          success: false,
          error: 'INVALID_URL'
        });
      }

      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return res.status(400).json({
          success: false,
          error: 'UNSUPPORTED_PROTOCOL'
        });
      }

      if (parsed.username || parsed.password) {
        return res.status(400).json({
          success: false,
          error: 'URL_CREDENTIALS_NOT_ALLOWED'
        });
      }

      await pool.query(
        `
          INSERT INTO pipeline_requests
            (id, type, payload, stage)
          VALUES
            ($1, 'WEBSITE_AUDIT', $2::jsonb, 'RECEIVED')
        `,
        [id, JSON.stringify({ url: parsed.toString() })]
      );

      await updatePipelineStage(id, 'ANALYZING');

      let websiteResponse;

      try {
        websiteResponse = await fetch(parsed.toString(), {
          method: 'GET',
          redirect: 'manual',
          headers: {
            'User-Agent': 'NEXORA-Digital-Audit/1.0'
          },
          signal: AbortSignal.timeout(10000)
        });
      } catch (fetchError) {
        websiteResponse = null;
      }

      const auditData = {
        requestId: id,
        url: parsed.toString(),
        reachable: Boolean(websiteResponse),
        httpStatus: websiteResponse?.status || null,
        https: parsed.protocol === 'https:',
        timestamp: new Date().toISOString()
      };

      await updatePipelineStage(id, 'AI_REVIEW', auditData);
      await updatePipelineStage(id, 'READY', auditData);

      res.status(202).json({
        success: true,
        ...auditData
      });
    } catch (error) {
      next(error);
    }
  }
);

/* =========================================================
   ADVERTISING
========================================================= */

app.post(
  '/api/advertising',
  sensitiveLimiter,
  databaseRequired,
  async (req, res, next) => {
    try {
      const company = cleanString(req.body.company, 200);
      const product = cleanString(req.body.product, 500);
      const platforms = Array.isArray(req.body.platforms)
        ? req.body.platforms
            .map(v => cleanString(v, 50))
            .filter(Boolean)
            .slice(0, 10)
        : [];

      if (!company || !product) {
        return res.status(400).json({
          success: false,
          error: 'VALIDATION_ERROR',
          message: 'Company and product/service are required.'
        });
      }

      const result = await runOpenAI(
        `
You are the NEXORA Advertising Agent.
Create a professional advertising strategy.
Keep recommendations actionable and business-oriented.
        `,
        JSON.stringify({
          company,
          product,
          platforms
        })
      );

      res.json({
        success: true,
        company,
        product,
        platforms,
        ai: result
      });
    } catch (error) {
      next(error);
    }
  }
);

/* =========================================================
   QUOTE
========================================================= */

app.post(
  '/api/quote',
  sensitiveLimiter,
  databaseRequired,
  async (req, res, next) => {
    try {
      const service = cleanString(req.body.service, 150);
      const description = cleanString(req.body.description, 5000);

      if (!service) {
        return res.status(400).json({
          success: false,
          error: 'SERVICE_REQUIRED'
        });
      }

      const ai = await runOpenAI(
        `
You are the NEXORA Quote Generator.
Analyze the requested service and produce a structured preliminary
scope of work. Do not claim that a binding commercial contract exists.
        `,
        JSON.stringify({
          service,
          description
        })
      );

      res.json({
        success: true,
        service,
        quoteStatus: 'PRELIMINARY',
        payment: 'disabled',
        ai
      });
    } catch (error) {
      next(error);
    }
  }
);

/* =========================================================
   RUN AI AGENT
========================================================= */

app.post(
  '/api/run-agent',
  sensitiveLimiter,
  databaseRequired,
  async (req, res, next) => {
    const id = requestId();

    try {
      const agent = cleanString(req.body.agent, 100);
      const payload = jsonSafe(req.body.payload || {});

      const knownAgent = AI_TEAM.find(
        item =>
          item.id === agent ||
          item.name.toLowerCase() === agent.toLowerCase()
      );

      if (!knownAgent) {
        return res.status(400).json({
          success: false,
          error: 'UNKNOWN_AGENT',
          availableAgents: AI_TEAM.map(a => a.id)
        });
      }

      await pool.query(
        `
          INSERT INTO agent_runs
            (id, agent, payload, status)
          VALUES
            ($1, $2, $3::jsonb, 'PROCESSING')
        `,
        [id, knownAgent.name, JSON.stringify(payload)]
      );

      const ai = await runOpenAI(
        `
You are ${knownAgent.name}, part of NEXORA Digital.
Your responsibility: ${knownAgent.role}.
Execute the requested operational task safely and professionally.
        `,
        JSON.stringify(payload)
      );

      await pool.query(
        `
          UPDATE agent_runs
          SET
            result = $1::jsonb,
            status = 'COMPLETED',
            updated_at = NOW()
          WHERE id = $2
        `,
        [JSON.stringify(ai), id]
      );

      res.json({
        success: true,
        runId: id,
        agent: knownAgent,
        status: 'COMPLETED',
        result: ai
      });
    } catch (error) {
      next(error);
    }
  }
);

/* =========================================================
   PAYMENT
   DISABLED — NO FAKE TRANSACTIONS
========================================================= */

app.get('/api/payment', (req, res) => {
  res.status(200).json({
    success: true,
    enabled: false,
    status: 'COMING_SOON',
    message: 'Payment Integration — Coming Soon',
    compliance:
      'Official bank account integration and tax ID verification will be fully implemented and connected within one week.',
    transactions: false,
    provider: null,
    webhook: false
  });
});

app.post('/api/payment', sensitiveLimiter, (req, res) => {
  res.status(503).json({
    success: false,
    enabled: false,
    error: 'PAYMENT_DISABLED',
    message: 'Payment Integration — Coming Soon',
    compliance:
      'Official bank account integration and tax ID verification will be fully implemented and connected within one week.'
  });
});

/* =========================================================
   STATIC WEBSITE
========================================================= */

const publicRoot = path.resolve(__dirname);

app.use(
  express.static(publicRoot, {
    index: false,
    maxAge: NODE_ENV === 'production' ? '1d' : 0,
    etag: true
  })
);

/*
  Keep the existing index.html untouched.
  The payment notice is injected into the response instead.
*/
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }

  res.sendFile(path.join(publicRoot, 'index.html'), {
    headers: {
      'Cache-Control':
        NODE_ENV === 'production'
          ? 'public, max-age=300, must-revalidate'
          : 'no-cache'
    }
  });
});

/* =========================================================
   ERROR HANDLING
========================================================= */

app.use((err, req, res, next) => {
  console.error('[Server Error]', err);

  if (res.headersSent) {
    return next(err);
  }

  const isProduction = NODE_ENV === 'production';

  res.status(500).json({
    success: false,
    error: 'INTERNAL_SERVER_ERROR',
    message: isProduction
      ? 'An internal server error occurred.'
      : err.message
  });
});

/* =========================================================
   STARTUP
========================================================= */

async function start() {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(
        `[NEXORA Digital] Server listening on port ${PORT}`
      );
      console.log(
        `[NEXORA Digital] PostgreSQL: ${
          dbReady ? 'READY' : 'NOT CONFIGURED'
        }`
      );
      console.log(
        `[NEXORA Digital] OpenAI: ${
          openai ? 'CONFIGURED' : 'NOT CONFIGURED'
        }`
      );
      console.log('[NEXORA Digital] Payment: DISABLED');
    });
  } catch (error) {
    console.error(
      '[Startup] Database initialization failed:',
      error
    );

    process.exit(1);
  }
}

start();

module.exports = app; 
