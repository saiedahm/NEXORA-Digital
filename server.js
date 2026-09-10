'use strict';

require('dotenv').config();

const express = require('express');
const path = require('path');
const crypto = require('crypto');
const dns = require('dns').promises;
const net = require('net');
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
let dbInitError = null;
let dbInitialization = null;

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
      stage TEXT NOT NULL DEFAULT 'LEAD_INTAKE',
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

    CREATE TABLE IF NOT EXISTS nexora_users (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_login_at TIMESTAMPTZ
    );

    CREATE TABLE IF NOT EXISTS nexora_sessions (
      id UUID PRIMARY KEY,
      user_id BIGINT NOT NULL REFERENCES nexora_users(id) ON DELETE CASCADE,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_nexora_sessions_user
      ON nexora_sessions(user_id);

    CREATE INDEX IF NOT EXISTS idx_nexora_sessions_expires
      ON nexora_sessions(expires_at);

    CREATE TABLE IF NOT EXISTS bookings (
      id UUID PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      appointment_date DATE NOT NULL,
      appointment_time TIME NOT NULL,
      note TEXT,
      language TEXT NOT NULL DEFAULT 'de',
      status TEXT NOT NULL DEFAULT 'REQUESTED',
      ai_result JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_bookings_date_time
      ON bookings(appointment_date, appointment_time);

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

async function databaseRequired(req, res, next) {
  if (!pool) {
    return res.status(503).json({
      success: false,
      error: 'DATABASE_NOT_CONFIGURED',
      message: 'Persistent database is not configured.'
    });
  }

  if (!dbReady && dbInitialization) {
    try {
      await dbInitialization;
    } catch {}
  }

  if (!dbReady) {
    return res.status(503).json({
      success: false,
      error: 'DATABASE_UNAVAILABLE',
      message: dbInitError
        ? 'Persistent database is unavailable.'
        : 'Persistent database is still initializing.'
    });
  }

  next();
}

function adminRequired(req, res, next) {
  if (!ADMIN_API_TOKEN) {
    return res.status(503).json({
      success: false,
      error: 'ADMIN_API_NOT_CONFIGURED'
    });
  }

  const supplied = req.get('x-admin-token');

  if (!supplied || supplied !== ADMIN_API_TOKEN) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED'
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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  let response;

  try {
    response = await openai.chat.completions.create({
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
      ],
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }

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
  'LEAD_INTAKE',
  'LEAD_RESEARCH',
  'WEBSITE_AUDIT',
  'OPPORTUNITY_ANALYSIS',
  'DESIGN_BRIEF',
  'CLIENT_PORTAL',
  'DESIGN_APPROVAL',
  'QUOTE',
  'CONTRACT_TERMS',
  'INVOICE',
  'PAYMENT_CONFIRMATION',
  'DEVELOPMENT',
  'QA',
  'LAUNCH'
];

const ADMIN_API_TOKEN = process.env.ADMIN_API_TOKEN || '';

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
    payment: {
      enabled: false,
      status: 'NOT_CONFIGURED'
    },
    features: {
      projectRequests: database === 'connected',
      aiManager: Boolean(openai) && database === 'connected',
      websiteAudit: database === 'connected',
      payments: false
    },
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

app.get('/api/pipeline', databaseRequired, adminRequired, async (req, res, next) => {
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
   EMAIL AUTHENTICATION
========================================================= */

const AUTH_COOKIE = 'nexora_session';
const AUTH_SESSION_DAYS = 30;

function parseCookies(req) {
  const raw = req.get('cookie') || '';

  return raw.split(';').reduce((cookies, part) => {
    const index = part.indexOf('=');

    if (index === -1) return cookies;

    const key = part.slice(0, index).trim();
    const value = decodeURIComponent(
      part.slice(index + 1).trim()
    );

    if (key) {
      cookies[key] = value;
    }

    return cookies;
  }, {});
}

function passwordHash(
  password,
  salt = crypto.randomBytes(16).toString('hex')
) {
  const derived = crypto.scryptSync(
    password,
    salt,
    64,
    {
      N: 16384,
      r: 8,
      p: 1
    }
  ).toString('hex');

  return `scrypt:${salt}:${derived}`;
}

function verifyPassword(password, stored) {
  const parts = String(stored || '').split(':');

  if (
    parts.length !== 3 ||
    parts[0] !== 'scrypt'
  ) {
    return false;
  }

  const [, salt, expectedHex] = parts;

  const actual = crypto.scryptSync(
    password,
    salt,
    64,
    {
      N: 16384,
      r: 8,
      p: 1
    }
  );

  const expected = Buffer.from(
    expectedHex,
    'hex'
  );

  return (
    expected.length === actual.length &&
    crypto.timingSafeEqual(
      actual,
      expected
    )
  );
}

function setSessionCookie(res, token) {
  const maxAge =
    AUTH_SESSION_DAYS *
    24 *
    60 *
    60;

  res.setHeader(
    'Set-Cookie',
    `${AUTH_COOKIE}=${encodeURIComponent(token)}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=Lax`
  );
}

function clearSessionCookie(res) {
  res.setHeader(
    'Set-Cookie',
    `${AUTH_COOKIE}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`
  );
}

async function getAuthenticatedUser(req) {
  if (!pool || !dbReady) {
    return null;
  }

  const token =
    parseCookies(req)[AUTH_COOKIE];

  if (!token) {
    return null;
  }

  const result = await pool.query(
    `
      SELECT
        u.id,
        u.name,
        u.email
      FROM nexora_sessions s
      JOIN nexora_users u
        ON u.id = s.user_id
      WHERE
        s.id = $1
        AND s.expires_at > NOW()
      LIMIT 1
    `,
    [token]
  );

  return result.rows[0] || null;
}

app.post(
  '/api/auth',
  sensitiveLimiter,
  databaseRequired,
  async (req, res, next) => {
    const action =
      cleanString(
        req.query.action,
        30
      ).toLowerCase();

    try {
      if (action === 'logout') {
        const token =
          parseCookies(req)[AUTH_COOKIE];

        if (token) {
          await pool.query(
            'DELETE FROM nexora_sessions WHERE id = $1',
            [token]
          );
        }

        clearSessionCookie(res);

        return res.json({
          success: true
        });
      }

      const email =
        cleanString(
          req.body.email,
          254
        ).toLowerCase();

      const password =
        String(req.body.password || '');

      const name =
        cleanString(
          req.body.name,
          150
        );

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          email
        )
      ) {
        return res.status(400).json({
          success: false,
          error: 'INVALID_EMAIL',
          message:
            'Bitte eine gültige E-Mail-Adresse eingeben.'
        });
      }

      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          error: 'WEAK_PASSWORD',
          message:
            'Das Passwort muss mindestens 8 Zeichen haben.'
        });
      }

      if (action === 'register') {
        if (!name) {
          return res.status(400).json({
            success: false,
            error: 'NAME_REQUIRED',
            message:
              'Bitte Ihren Namen eingeben.'
          });
        }

        const exists =
          await pool.query(
            `
              SELECT id
              FROM nexora_users
              WHERE email = $1
              LIMIT 1
            `,
            [email]
          );

        if (exists.rows.length) {
          return res.status(409).json({
            success: false,
            error: 'EMAIL_EXISTS',
            message:
              'Für diese E-Mail-Adresse existiert bereits ein Konto.'
          });
        }

        const created =
          await pool.query(
            `
              INSERT INTO nexora_users
                (
                  name,
                  email,
                  password_hash
                )
              VALUES
                ($1, $2, $3)
              RETURNING
                id,
                name,
                email,
                created_at
            `,
            [
              name,
              email,
              passwordHash(password)
            ]
          );

        const token =
          crypto.randomUUID();

        await pool.query(
          `
            INSERT INTO nexora_sessions
              (
                id,
                user_id,
                expires_at
              )
            VALUES
              (
                $1,
                $2,
                NOW() + INTERVAL '30 days'
              )
          `,
          [
            token,
            created.rows[0].id
          ]
        );

        setSessionCookie(
          res,
          token
        );

        return res.status(201).json({
          success: true,
          user: created.rows[0]
        });
      }

      if (action === 'login') {
        const found =
          await pool.query(
            `
              SELECT
                id,
                name,
                email,
                password_hash
              FROM nexora_users
              WHERE email = $1
              LIMIT 1
            `,
            [email]
          );

        if (
          !found.rows.length ||
          !verifyPassword(
            password,
            found.rows[0].password_hash
          )
        ) {
          return res.status(401).json({
            success: false,
            error: 'INVALID_CREDENTIALS',
            message:
              'E-Mail-Adresse oder Passwort ist nicht korrekt.'
          });
        }

        const token =
          crypto.randomUUID();

        await pool.query(
          `
            DELETE FROM nexora_sessions
            WHERE expires_at <= NOW()
          `
        );

        await pool.query(
          `
            INSERT INTO nexora_sessions
              (
                id,
                user_id,
                expires_at
              )
            VALUES
              (
                $1,
                $2,
                NOW() + INTERVAL '30 days'
              )
          `,
          [
            token,
            found.rows[0].id
          ]
        );

        await pool.query(
          `
            UPDATE nexora_users
            SET last_login_at = NOW()
            WHERE id = $1
          `,
          [found.rows[0].id]
        );

        setSessionCookie(
          res,
          token
        );

        return res.json({
          success: true,
          user: {
            id: found.rows[0].id,
            name: found.rows[0].name,
            email: found.rows[0].email
          }
        });
      }

      return res.status(400).json({
        success: false,
        error: 'INVALID_AUTH_ACTION'
      });

    } catch (error) {
      next(error);
    }
  }
);

app.get(
  '/api/auth',
  databaseRequired,
  async (req, res, next) => {
    try {
      const action =
        cleanString(
          req.query.action,
          30
        ).toLowerCase();

      if (action !== 'me') {
        return res.status(400).json({
          success: false,
          error: 'INVALID_AUTH_ACTION'
        });
      }

      const user =
        await getAuthenticatedUser(req);

      res.json({
        success: true,
        authenticated: Boolean(user),
        user
      });

    } catch (error) {
      next(error);
    }
  }
);

app.get(
  '/api/auth/oauth',
  (req, res) => {
    const provider =
      cleanString(
        req.query.provider,
        30
      ).toLowerCase();

    return res.status(501).json({
      success: false,
      error: 'OAUTH_NOT_CONFIGURED',
      provider,
      message:
        `OAuth für ${provider || 'diesen Anbieter'} benötigt die offiziellen Client-ID/Secret-Einstellungen in Vercel.`
    });
  }
);

/* =========================================================
   BOOKING
========================================================= */

app.post(
  '/api/booking',
  sensitiveLimiter,
  databaseRequired,
  async (req, res, next) => {
    const id = requestId();

    try {
      const name =
        cleanString(
          req.body.name,
          150
        );

      const email =
        cleanString(
          req.body.email,
          254
        ).toLowerCase();

      const date =
        cleanString(
          req.body.date,
          10
        );

      const time =
        cleanString(
          req.body.time,
          5
        );

      const note =
        cleanString(
          req.body.note,
          2000
        );

      const language =
        cleanString(
          req.body.language,
          10
        ) || 'de';

      if (
        !name ||
        !email ||
        !date ||
        !time
      ) {
        return res.status(400).json({
          success: false,
          error: 'VALIDATION_ERROR',
          message:
            'Name, E-Mail, Datum und Uhrzeit sind erforderlich.'
        });
      }

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          email
        )
      ) {
        return res.status(400).json({
          success: false,
          error: 'INVALID_EMAIL',
          message:
            'Bitte eine gültige E-Mail-Adresse eingeben.'
        });
      }

      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        !/^\d{2}:\d{2}$/.test(time)
      ) {
        return res.status(400).json({
          success: false,
          error: 'INVALID_DATETIME',
          message:
            'Bitte Datum und Uhrzeit korrekt auswählen.'
        });
      }

      const ai =
        await runOpenAI(
          `You are the NEXORA Digital AI General Manager. A client requested an introductory meeting. Reply briefly with the operational next step. Do not claim that the meeting is confirmed; it is only a request until a human confirms it.`,
          JSON.stringify({
            name,
            email,
            date,
            time,
            note,
            language
          })
        ).catch(
          () => ({
            enabled: false,
            content:
              'Terminwunsch gespeichert und zur Bestätigung weitergeleitet.'
          })
        );

      await pool.query(
        `
          INSERT INTO bookings
            (
              id,
              name,
              email,
              appointment_date,
              appointment_time,
              note,
              language,
              ai_result
            )
          VALUES
            (
              $1,
              $2,
              $3,
              $4::date,
              $5::time,
              $6,
              $7,
              $8::jsonb
            )
        `,
        [
          id,
          name,
          email,
          date,
          time,
          note || null,
          language,
          JSON.stringify(ai)
        ]
      );

      res.status(201).json({
        success: true,
        bookingId: id,
        status: 'REQUESTED',
        ai
      });

    } catch (error) {
      next(error);
    }
  }
);

app.get(
  '/api/booking',
  databaseRequired,
  adminRequired,
  async (req, res, next) => {
    try {
      const result =
        await pool.query(`
          SELECT
            id,
            name,
            email,
            appointment_date,
            appointment_time,
            note,
            language,
            status,
            created_at,
            updated_at
          FROM bookings
          ORDER BY
            appointment_date ASC,
            appointment_time ASC
          LIMIT 100
        `);

      res.json({
        success: true,
        count: result.rows.length,
        bookings: result.rows
      });

    } catch (error) {
      next(error);
    }
  }
);

/* =========================================================
   CLIENTS
========================================================= */

app.post(
  '/api/clients',
  sensitiveLimiter,
  databaseRequired,
  async (req, res, next) => {
    const id = requestId();

    try {
      const name =
        cleanString(
          req.body.name,
          150
        );

      const company =
        cleanString(
          req.body.company,
          200
        );

      const email =
        cleanString(
          req.body.email,
          254
        ).toLowerCase();

      const service =
        cleanString(
          req.body.service,
          150
        );

      const message =
        cleanString(
          req.body.message,
          5000
        );

      const language =
        cleanString(
          req.body.language,
          10
        ) || 'de';

      if (
        !name ||
        !email ||
        !message
      ) {
        return res.status(400).json({
          success: false,
          error: 'VALIDATION_ERROR',
          message:
            'Name, email and project description are required.'
        });
      }

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          email
        )
      ) {
        return res.status(400).json({
          success: false,
          error: 'INVALID_EMAIL'
        });
      }

      const clientResult =
        await pool.query(
          `
            INSERT INTO clients
              (
                name,
                company,
                email,
                service
              )
            VALUES
              (
                $1,
                $2,
                $3,
                $4
              )
            RETURNING
              id,
              name,
              company,
              email,
              service,
              created_at
          `,
          [
            name,
            company || null,
            email,
            service || null
          ]
        );

      const client =
        clientResult.rows[0];

      const payload = {
        name,
        company: company || null,
        email,
        service: service || null,
        message,
        language
      };

      await pool.query(
        `
          INSERT INTO pipeline_requests
            (
              id,
              client_id,
              type,
              payload,
              stage
            )
          VALUES
            (
              $1,
              $2,
              'PROJECT_REQUEST',
              $3::jsonb,
              'LEAD_INTAKE'
            )
        `,
        [
          id,
          client.id,
          JSON.stringify(payload)
        ]
      );

      // AI is optional: the lead is still safely stored when no provider key exists.
      let ai = null;
      let stage = 'LEAD_INTAKE';

      let nextAgent =
        routeCommand(
          `${service || ''} ${message}`
        );

      if (openai) {
        try {
          await updatePipelineStage(
            id,
            'LEAD_RESEARCH'
          );

          ai =
            await runOpenAI(
              `You are the NEXORA Digital General Manager. Analyze a new website/digital-service lead.
Return a concise operational brief with: requested service, key requirements, missing information,
recommended next step, and which NEXORA AI team member should handle it. Do not promise delivery,
pricing, payment or legal acceptance.`,
              JSON.stringify(payload)
            );

          await updatePipelineStage(
            id,
            'QUOTE',
            ai
          );

          stage = 'QUOTE';

        } catch (aiError) {
          console.error(
            '[Project Request AI]',
            aiError.message
          );

          await updatePipelineStage(
            id,
            'LEAD_INTAKE',
            {
              aiError:
                'AI processing temporarily unavailable'
            }
          );
        }
      }
             return res.status(201).json({
        success: true,
        requestId: id,
        stage,
        stageNumber: PIPELINE_STAGES.indexOf(stage) + 1,
        client,
        nextAgent,
        ai
      });
    } catch (error) {
      next(error);
    }
  }
);

app.get('/api/clients', databaseRequired, adminRequired, async (req, res, next) => {
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

app.get('/api/clients/:id', databaseRequired, adminRequired, async (req, res, next) => {
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
  adminRequired,
  async (req, res, next) => {
    try {
      const clientId = Number(req.params.id);
      const stage = cleanString(
        req.body.stage,
        50
      ).toUpperCase();

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
          RETURNING
            id,
            client_id,
            type,
            stage,
            updated_at
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
   AI ROUTING
========================================================= */

function routeCommand(command) {
  const text = command.toLowerCase();

  if (
    /werbung|werbeanzeige|kampagne|advertis|social media|google ads|meta ads/.test(text)
  ) {
    return AI_TEAM.find(
      a => a.id === 'advertising-agent'
    );
  }

  if (
    /website prüfen|website analys|seo|audit|performance|fehler|technisch/.test(text)
  ) {
    return AI_TEAM.find(
      a => a.id === 'website-audit'
    );
  }

  if (
    /design|ui|ux|logo|farben|layout|landingpage/.test(text)
  ) {
    return AI_TEAM.find(
      a => a.id === 'design-agent'
    );
  }

  if (
    /entwickl|programm|code|api|backend|frontend|automation|automatis/.test(text)
  ) {
    return AI_TEAM.find(
      a => a.id === 'development-agent'
    );
  }

  if (
    /preis|angebot|quote|kosten|paket/.test(text)
  ) {
    return AI_TEAM.find(
      a => a.id === 'quote-generator'
    );
  }

  if (
    /launch|deploy|veröff|produktion|vercel/.test(text)
  ) {
    return AI_TEAM.find(
      a => a.id === 'launch-agent'
    );
  }

  if (
    /test|qa|qualität|bug/.test(text)
  ) {
    return AI_TEAM.find(
      a => a.id === 'qa-agent'
    );
  }

  if (
    /markt|wettbewerb|research|unternehmen|branche/.test(text)
  ) {
    return AI_TEAM.find(
      a => a.id === 'lead-research'
    );
  }

  return AI_TEAM.find(
    a => a.id === 'general-manager'
  );
}

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
      const command = cleanString(
        req.body.command,
        5000
      );

      const language = cleanString(
        req.body.language,
        10
      ) || 'de';

      const clientId = req.body.clientId
        ? Number(req.body.clientId)
        : null;

      if (!command) {
        return res.status(400).json({
          success: false,
          error: 'COMMAND_REQUIRED',
          message:
            'Bitte geben Sie einen Auftrag ein.'
        });
      }

      const assignedAgent =
        routeCommand(command);

      await pool.query(
        `
          INSERT INTO pipeline_requests
            (
              id,
              client_id,
              type,
              payload,
              stage
            )
          VALUES
            (
              $1,
              $2,
              'COMMAND',
              $3::jsonb,
              'LEAD_INTAKE'
            )
        `,
        [
          id,
          Number.isInteger(clientId)
            ? clientId
            : null,
          JSON.stringify({
            command,
            language,
            assignedAgent:
              assignedAgent.id
          })
        ]
      );

      await updatePipelineStage(
        id,
        'LEAD_RESEARCH'
      );

      await updatePipelineStage(
        id,
        'ASSIGNED',
        {
          agent: assignedAgent
        }
      );

      let aiResult;

      try {
        aiResult =
          await runOpenAI(
            `You are the NEXORA Digital AI General Manager. Analyze the client's request and coordinate the correct specialist. The specialist already selected by the routing layer is ${assignedAgent.name} (${assignedAgent.role}). Return a concise response in ${language} with: 1) understanding of the request, 2) what will happen next, 3) the specialist handling it, 4) any one critical missing detail if needed. Never claim an action was completed when it was not.`,
            command
          );
      } catch (aiError) {
        aiResult = {
          enabled: false,
          fallback: true,
          message:
            'AI provider temporarily unavailable.',
          content:
            `Anfrage verstanden. Nächster zuständiger Agent: ${assignedAgent.name}. Der Auftrag wurde im NEXORA Workflow registriert.`
        };
      }

      const result = {
        requestId: id,
        language,
        assignedAgent,
        nextAgent: assignedAgent,
        actions: [
          'Request registered',
          `Routed to ${assignedAgent.name}`,
          'Awaiting specialist processing'
        ],
        ai: aiResult
      };

      await updatePipelineStage(
        id,
        'PROCESSING',
        result
      );

      res.status(200).json({
        success: true,
        requestId: id,
        stage: 'PROCESSING',
        assignedAgent,
        nextAgent: assignedAgent,
        actions: result.actions,
        ai: aiResult,
        response:
          aiResult.content ||
          aiResult.message
      });

    } catch (error) {
      try {
        await updatePipelineStage(
          id,
          'AI_REVIEW',
          {
            error: error.message
          }
        );
      } catch {}

      next(error);
    }
  }
);

/* =========================================================
   WEBSITE AUDIT SSRF PROTECTION
========================================================= */

function isPrivateIPv4(ip) {
  const parts =
    ip.split('.').map(Number);

  if (
    parts.length !== 4 ||
    parts.some(Number.isNaN)
  ) {
    return false;
  }

  const [a, b, c, d] = parts;

  return (
    a === 10 ||
    a === 127 ||
    a === 0 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 198 && (b === 18 || b === 19))
  );
}

function isPrivateIPv6(ip) {
  const normalized =
    ip.toLowerCase();

  return (
    normalized === '::1' ||
    normalized.startsWith('fc') ||
    normalized.startsWith('fd') ||
    normalized.startsWith('fe80:')
  );
}

function isBlockedIP(ip) {
  if (net.isIPv4(ip)) {
    return isPrivateIPv4(ip);
  }

  if (net.isIPv6(ip)) {
    return isPrivateIPv6(ip);
  }

  return true;
}
      

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
      'Payment is intentionally disabled until a verified payment provider, business details and webhook endpoint are configured.',
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
      'Payment is intentionally disabled until a verified payment provider, business details and webhook endpoint are configured.'
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

dbInitialization = initializeDatabase().catch(error => {
  dbInitError = error;
  console.error('[Database] Initialization failed:', error.message);
});

async function start() {
  if (process.env.VERCEL) {
    await dbInitialization;
    return;
  }

  await dbInitialization;
  app.listen(PORT, () => {
    console.log(`[NEXORA Digital] Server listening on port ${PORT}`);
    console.log(`[NEXORA Digital] PostgreSQL: ${dbReady ? 'READY' : 'NOT CONFIGURED'}`);
    console.log(`[NEXORA Digital] OpenAI: ${openai ? 'CONFIGURED' : 'NOT CONFIGURED'}`);
    console.log('[NEXORA Digital] Payment: DISABLED until a verified provider is connected.');
  });
}

if (!process.env.VERCEL) {
  start();
}

module.exports = app;
