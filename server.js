'use strict';

/**
 * NEXORA Enterprise Backend
 * AI Agents + SQLite + Activity Logging + 14-Stage Workflow
 *
 * Required packages:
 * npm install express cors dotenv sqlite3 sqlite helmet express-rate-limit openai
 *
 * Required .env:
 * OPENAI_API_KEY=your_openai_api_key
 * PORT=3000
 * OPENAI_MODEL=gpt-5.5
 */

require('dotenv').config();

const path = require('path');
const fs = require('fs');
const util = require('util');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sqlite3 = require('sqlite3').verbose();
const OpenAI = require('openai');

const app = express();

const PORT = Number(process.env.PORT || 3000);
const DB_PATH = path.join(__dirname, 'nexora_enterprise.db');

const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5.5';

if (!process.env.OPENAI_API_KEY) {
    console.error(
        '[NEXORA FATAL] OPENAI_API_KEY is missing. Add it to your .env file before starting the server.'
    );
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    timeout: 120000,
    maxRetries: 2
});

app.disable('x-powered-by');

app.use(
    helmet({
        crossOriginResourcePolicy: false
    })
);

app.use(
    cors({
        origin: process.env.CORS_ORIGIN
            ? process.env.CORS_ORIGIN.split(',').map((item) => item.trim())
            : true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

app.use(
    express.json({
        limit: '2mb'
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: '2mb'
    })
);

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: 'Too many requests. Please try again later.'
    }
});

app.use('/api', apiLimiter);

const db = new sqlite3.Database(DB_PATH);

const dbRun = util.promisify(db.run.bind(db));
const dbGet = util.promisify(db.get.bind(db));
const dbAll = util.promisify(db.all.bind(db));

const PIPELINE = [
    {
        id: 'lead-research',
        name: 'Lead Research',
        stage: 1
    },
    {
        id: 'website-audit',
        name: 'Website Audit',
        stage: 2
    },
    {
        id: 'ai-manager',
        name: 'AI Manager',
        stage: 3
    },
    {
        id: 'crm',
        name: 'CRM Qualification',
        stage: 4
    },
    {
        id: 'client-portal',
        name: 'Client Portal',
        stage: 5
    },
    {
        id: 'design-agent',
        name: 'Design Agent',
        stage: 6
    },
    {
        id: 'design-approval',
        name: 'Design Approval',
        stage: 7
    },
    {
        id: 'quote-generator',
        name: 'Quote Generator',
        stage: 8
    },
    {
        id: 'invoice',
        name: 'Invoice',
        stage: 9
    },
    {
        id: 'payment-confirmation',
        name: 'Payment Confirmation',
        stage: 10
    },
    {
        id: 'development',
        name: 'Development Workflow',
        stage: 11
    },
    {
        id: 'qa',
        name: 'Quality Assurance',
        stage: 12
    },
    {
        id: 'launch',
        name: 'Launch',
        stage: 13
    },
    {
        id: 'growth',
        name: 'Growth & Optimization',
        stage: 14
    }
];

const SUPPORTED_AGENTS = {
    'lead-research': {
        name: 'LEAD RESEARCH',
        stage: 1
    },
    'website-audit': {
        name: 'WEBSITE AUDIT',
        stage: 2
    },
    'design-agent': {
        name: 'DESIGN AGENT',
        stage: 6
    },
    'quote-generator': {
        name: 'QUOTE GENERATOR',
        stage: 8
    }
};

const AGENT_ALIASES = {
    leadresearch: 'lead-research',
    lead_research: 'lead-research',
    lead: 'lead-research',

    websiteaudit: 'website-audit',
    website_audit: 'website-audit',
    audit: 'website-audit',

    design: 'design-agent',
    designagent: 'design-agent',
    design_agent: 'design-agent',

    quote: 'quote-generator',
    quotegenerator: 'quote-generator',
    quote_generator: 'quote-generator'
};

function normalizeAgentId(agentId) {
    if (typeof agentId !== 'string') {
        return null;
    }

    const normalized = agentId.trim().toLowerCase();

    if (SUPPORTED_AGENTS[normalized]) {
        return normalized;
    }

    return AGENT_ALIASES[normalized] || null;
}

function nowISO() {
    return new Date().toISOString();
}

function safeParseJSON(value, fallback) {
    if (!value || typeof value !== 'string') {
        return fallback;
    }

    try {
        return JSON.parse(value);
    } catch (error) {
        return fallback;
    }
}

function sanitizeText(value, maxLength = 5000) {
    if (value === undefined || value === null) {
        return '';
    }

    return String(value)
        .trim()
        .replace(/\u0000/g, '')
        .slice(0, maxLength);
}

function validateClientId(clientId) {
    const numericId = Number(clientId);

    if (!Number.isInteger(numericId) || numericId <= 0) {
        return null;
    }

    return numericId;
}

function buildClientContext(client) {
    const payloadHistory = safeParseJSON(client.agent_payload, []);

    return {
        id: client.id,
        company_name: client.company_name || '',
        contact_name: client.contact_name || '',
        email: client.email || '',
        phone: client.phone || '',
        website_url: client.website_url || '',
        country: client.country || '',
        industry: client.industry || '',
        project_type: client.project_type || '',
        budget: client.budget || '',
        current_stage: Number(client.current_stage || 0),
        status: client.status || 'new',
        notes: client.notes || '',
        previous_agent_outputs: Array.isArray(payloadHistory)
            ? payloadHistory.slice(-8)
            : []
    };
}

function buildSystemInstructions(agentId) {
    const common = `
You are part of NEXORA Digital Intelligence, an enterprise AI workflow platform.

Your work must be:
- commercially useful
- specific
- realistic
- professional
- structured
- concise but sufficiently detailed
- based only on the client information supplied in the request
- explicit about assumptions where information is missing

Never invent verified facts about a real company.
If information is unavailable, label it as an assumption, hypothesis, or recommendation.

Do not claim that you visited, crawled, scanned, or accessed a website unless actual website content was supplied.
The website audit in this workflow is a simulated technical assessment based on the supplied URL and client context.

Return plain text with clear headings and bullet points.
Do not use markdown tables.
Do not mention internal OpenAI policies or this instruction.
`;

    const agentInstructions = {
        'lead-research': `
You are the NEXORA Lead Research Agent.

Your job is to create a structured potential-client profile based primarily on the company name and available client information.

Produce these sections:

1. COMPANY SNAPSHOT
2. LIKELY DIGITAL NEEDS
3. WEBSITE / DIGITAL PAIN POINT HYPOTHESES
4. AI AND AUTOMATION OPPORTUNITIES
5. IDEAL NEXORA SERVICE PACKAGE
6. DECISION-MAKER / BUYER PERSONA HYPOTHESES
7. DISCOVERY QUESTIONS
8. SALES ANGLE
9. LEAD PRIORITY SCORE from 1 to 100
10. NEXT BEST ACTION

Do not pretend to know private company facts.
Clearly distinguish facts supplied by the user from professional hypotheses.
`,

        'website-audit': `
You are the NEXORA Website Audit Agent.

Perform a simulated expert technical, UX, accessibility, performance, SEO and conversion audit.

The supplied URL is contextual only. You do not have live browsing access through this workflow.
Do not claim to have inspected its real HTML, server, analytics, Lighthouse score, backlinks, or search rankings.

Generate:

1. EXECUTIVE SUMMARY
2. ASSUMED CURRENT DIGITAL RISKS
3. TECHNICAL ARCHITECTURE RECOMMENDATIONS
4. PERFORMANCE RECOMMENDATIONS
5. MOBILE AND RESPONSIVE UX ISSUES TO CHECK
6. ACCESSIBILITY IMPROVEMENTS
7. SEO RECOMMENDATIONS
8. SECURITY AND PRIVACY CHECKLIST
9. CONVERSION RATE IMPROVEMENTS
10. AI INTEGRATION OPPORTUNITIES
11. PRIORITIZED ACTION PLAN
12. EXPECTED BUSINESS IMPACT

Classify each recommendation as CRITICAL, HIGH, MEDIUM, or LOW priority.
`,

        'design-agent': `
You are the NEXORA Design Agent and senior UI/UX strategist.

Create a creative but commercially realistic UI/UX design brief for the client's requested digital project.

Generate:

1. DESIGN VISION
2. BRAND AND VISUAL DIRECTION
3. TARGET USERS
4. USER EXPERIENCE STRATEGY
5. INFORMATION ARCHITECTURE
6. HOMEPAGE WIREFRAME CONCEPT
7. CORE PAGE WIREFRAME CONCEPTS
8. PRIMARY USER FLOWS
9. RESPONSIVE DESIGN STRATEGY
10. COMPONENT SYSTEM
11. ACCESSIBILITY REQUIREMENTS
12. AI-POWERED EXPERIENCE IDEAS
13. THREE CREATIVE DESIGN CONCEPTS WITH DISTINCT NAMES
14. RECOMMENDED CONCEPT

Describe wireframes in structured textual blocks that a developer and designer can directly use.
`,

        'quote-generator': `
You are the NEXORA Quote Generator and enterprise digital project estimator.

Generate a realistic EUR project estimate based on the client context and previous agent outputs.

You must calculate a professional cost breakdown using explicit assumptions and scope.

Include:

1. PROJECT SUMMARY
2. SCOPE OF WORK
3. COST BREAKDOWN IN EUR
4. OPTIONAL ADD-ONS
5. DELIVERY TIMELINE
6. PAYMENT MILESTONES
7. ASSUMPTIONS
8. EXCLUSIONS
9. FORMAL PROJECT PROPOSAL
10. RECOMMENDED PACKAGE
11. TOTAL PROJECT INVESTMENT IN EUR

The total must equal the sum of the mandatory cost items.

Use reasonable enterprise pricing.
Do not claim this is a legally binding contract.
The proposal should be ready for human review before sending to a customer.
`
    };

    return `${common}\n${agentInstructions[agentId] || ''}`;
}

function buildAgentInput(agentId, client) {
    const context = buildClientContext(client);

    const companyName =
        sanitizeText(context.company_name, 300) || 'Unnamed Company';

    const websiteUrl =
        sanitizeText(context.website_url, 2000) ||
        'No website URL supplied';

    const projectType =
        sanitizeText(context.project_type, 1000) ||
        'Website modernization / digital transformation';

    const budget =
        sanitizeText(context.budget, 200) ||
        'Budget not specified';

    const previousOutputs = context.previous_agent_outputs.length
        ? JSON.stringify(context.previous_agent_outputs, null, 2)
        : 'No previous AI agent outputs available.';

    if (agentId === 'lead-research') {
        return `
Create a lead research profile for the following potential client.

Company name: ${companyName}
Industry: ${context.industry || 'Not specified'}
Country: ${context.country || 'Germany or target market not specified'}
Website: ${websiteUrl}
Requested project: ${projectType}
Known budget: ${budget}
Internal notes: ${sanitizeText(context.notes, 4000)}

Previous workflow context:
${previousOutputs}
`;
    }

    if (agentId === 'website-audit') {
        return `
Perform a simulated professional website and digital presence audit.

Company: ${companyName}
Industry: ${context.industry || 'Not specified'}
Website URL: ${websiteUrl}
Requested project: ${projectType}
Country / market: ${context.country || 'Not specified'}
Known business context: ${sanitizeText(context.notes, 4000)}

Previous workflow context:
${previousOutputs}

Important:
The URL is supplied as a reference only. Do not claim live crawling or direct access.
`;
    }

    if (agentId === 'design-agent') {
        return `
Create the UI/UX strategy and textual wireframe concepts.

Company: ${companyName}
Industry: ${context.industry || 'Not specified'}
Current website: ${websiteUrl}
Project type: ${projectType}
Target market: ${context.country || 'Not specified'}
Budget guidance: ${budget}
Additional notes: ${sanitizeText(context.notes, 4000)}

Previous workflow outputs:
${previousOutputs}
`;
    }

    if (agentId === 'quote-generator') {
        return `
Create a detailed EUR project quote and formal proposal.

Client company: ${companyName}
Industry: ${context.industry || 'Not specified'}
Website: ${websiteUrl}
Requested project: ${projectType}
Budget guidance: ${budget}
Country / market: ${context.country || 'Not specified'}
Additional notes: ${sanitizeText(context.notes, 4000)}

Use all useful information from these previous workflow outputs:
${previousOutputs}

The quote must contain arithmetic that is internally consistent.
Show every mandatory cost item and then show the exact total.
`;
    }

    throw new Error(`Unsupported agent: ${agentId}`);
}

async function callAgent(agentId, client) {
    const instructions = buildSystemInstructions(agentId);
    const input = buildAgentInput(agentId, client);

    const response = await openai.responses.create(
        {
            model: OPENAI_MODEL,
            instructions,
            input
        },
        {
            timeout: 120000
        }
    );

    const output = sanitizeText(response.output_text, 100000);

    if (!output) {
        throw new Error('OpenAI returned an empty agent response.');
    }

    return {
        output,
        responseId: response.id || null,
        requestId: response._request_id || null,
        model: OPENAI_MODEL
    };
}

async function initializeDatabase() {
    await dbRun(`
        CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company_name TEXT NOT NULL,
            contact_name TEXT,
            email TEXT,
            phone TEXT,
            website_url TEXT,
            country TEXT,
            industry TEXT,
            project_type TEXT,
            budget TEXT,
            notes TEXT,
            current_stage INTEGER NOT NULL DEFAULT 0,
            status TEXT NOT NULL DEFAULT 'new',
            agent_payload TEXT NOT NULL DEFAULT '[]',
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `);

    const columns = await dbAll(`PRAGMA table_info(clients)`);

    const columnNames = new Set(columns.map((column) => column.name));

    const requiredColumns = [
        ['contact_name', 'TEXT'],
        ['email', 'TEXT'],
        ['phone', 'TEXT'],
        ['website_url', 'TEXT'],
        ['country', 'TEXT'],
        ['industry', 'TEXT'],
        ['project_type', 'TEXT'],
        ['budget', 'TEXT'],
        ['notes', 'TEXT'],
        ['current_stage', 'INTEGER NOT NULL DEFAULT 0'],
        ['status', "TEXT NOT NULL DEFAULT 'new'"],
        ['agent_payload', "TEXT NOT NULL DEFAULT '[]'"],
        ['created_at', 'TEXT'],
        ['updated_at', 'TEXT']
    ];

    for (const [columnName, definition] of requiredColumns) {
        if (!columnNames.has(columnName)) {
            await dbRun(
                `ALTER TABLE clients ADD COLUMN ${columnName} ${definition}`
            );
        }
    }

    await dbRun(`
        CREATE TABLE IF NOT EXISTS activity_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_id INTEGER,
            agent_id TEXT,
            action TEXT NOT NULL,
            status TEXT NOT NULL,
            details TEXT,
            created_at TEXT NOT NULL,
            FOREIGN KEY(client_id) REFERENCES clients(id)
        )
    `);

    await dbRun(`
        CREATE INDEX IF NOT EXISTS idx_activity_logs_client_id
        ON activity_logs(client_id)
    `);

    await dbRun(`
        CREATE INDEX IF NOT EXISTS idx_clients_current_stage
        ON clients(current_stage)
    `);

    await dbRun(`
        UPDATE clients
        SET agent_payload = '[]'
        WHERE agent_payload IS NULL OR TRIM(agent_payload) = ''
    `);

    console.log(`[NEXORA] SQLite database ready: ${DB_PATH}`);
}

async function logActivity({
    clientId = null,
    agentId = null,
    action,
    status,
    details = null
}) {
    const safeDetails =
        details === null || details === undefined
            ? null
            : JSON.stringify(details);

    await dbRun(
        `
        INSERT INTO activity_logs (
            client_id,
            agent_id,
            action,
            status,
            details,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
            clientId,
            agentId,
            sanitizeText(action, 500),
            sanitizeText(status, 100),
            safeDetails,
            nowISO()
        ]
    );
}

async function appendAgentPayload(client, agentId, result) {
    const existingPayload = safeParseJSON(client.agent_payload, []);

    const payloadHistory = Array.isArray(existingPayload)
        ? existingPayload
        : [];

    const newEntry = {
        agent_id: agentId,
        agent_name: SUPPORTED_AGENTS[agentId].name,
        stage: SUPPORTED_AGENTS[agentId].stage,
        generated_at: nowISO(),
        model: result.model,
        response_id: result.responseId,
        request_id: result.requestId,
        output: result.output
    };

    payloadHistory.push(newEntry);

    const serializedPayload = JSON.stringify(payloadHistory);

    await dbRun(
        `
        UPDATE clients
        SET
            agent_payload = ?,
            current_stage = ?,
            status = ?,
            updated_at = ?
        WHERE id = ?
        `,
        [
            serializedPayload,
            SUPPORTED_AGENTS[agentId].stage,
            'in_progress',
            nowISO(),
            client.id
        ]
    );

    return newEntry;
}

async function getClientById(clientId) {
    return dbGet(
        `
        SELECT *
        FROM clients
        WHERE id = ?
        `,
        [clientId]
    );
}

async function executeAgentPipeline(clientId, agentId) {
    const client = await getClientById(clientId);

    if (!client) {
        const error = new Error(`Client with ID ${clientId} was not found.`);
        error.statusCode = 404;
        throw error;
    }

    await logActivity({
        clientId,
        agentId,
        action: 'agent_execution_started',
        status: 'started',
        details: {
            agent: SUPPORTED_AGENTS[agentId].name,
            stage: SUPPORTED_AGENTS[agentId].stage
        }
    });

    try {
        const result = await callAgent(agentId, client);

        const savedPayload = await appendAgentPayload(
            client,
            agentId,
            result
        );

        await logActivity({
            clientId,
            agentId,
            action: 'agent_execution_completed',
            status: 'success',
            details: {
                stage: SUPPORTED_AGENTS[agentId].stage,
                response_id: result.responseId,
                request_id: result.requestId,
                model: result.model
            }
        });

        const updatedClient = await getClientById(clientId);

        return {
            client: updatedClient,
            agent: savedPayload,
            output: result.output
        };
    } catch (error) {
        await logActivity({
            clientId,
            agentId,
            action: 'agent_execution_failed',
            status: 'failed',
            details: {
                message: error.message || 'Unknown error',
                status: error.status || null,
                code: error.code || null
            }
        });

        throw error;
    }
}

app.get('/api/health', async (req, res, next) => {
    try {
        const result = await dbGet('SELECT 1 AS database_ok');

        res.status(200).json({
            success: true,
            service: 'NEXORA Enterprise AI Backend',
            status: 'online',
            database: result?.database_ok === 1 ? 'connected' : 'unknown',
            model: OPENAI_MODEL,
            timestamp: nowISO()
        });
    } catch (error) {
        next(error);
    }
});

app.get('/api/pipeline', (req, res) => {
    res.status(200).json({
        success: true,
        pipeline: PIPELINE,
        active_ai_agents: Object.entries(SUPPORTED_AGENTS).map(
            ([id, agent]) => ({
                id,
                name: agent.name,
                stage: agent.stage
            })
        )
    });
});

app.get('/api/clients', async (req, res, next) => {
    try {
        const clients = await dbAll(`
            SELECT
                id,
                company_name,
                contact_name,
                email,
                phone,
                website_url,
                country,
                industry,
                project_type,
                budget,
                notes,
                current_stage,
                status,
                agent_payload,
                created_at,
                updated_at
            FROM clients
            ORDER BY updated_at DESC, id DESC
        `);

        res.status(200).json({
            success: true,
            count: clients.length,
            clients
        });
    } catch (error) {
        next(error);
    }
});

app.get('/api/clients/:id', async (req, res, next) => {
    try {
        const clientId = validateClientId(req.params.id);

        if (!clientId) {
            return res.status(400).json({
                success: false,
                error: 'Invalid client ID.'
            });
        }

        const client = await getClientById(clientId);

        if (!client) {
            return res.status(404).json({
                success: false,
                error: 'Client not found.'
            });
        }

        const activity = await dbAll(
            `
            SELECT *
            FROM activity_logs
            WHERE client_id = ?
            ORDER BY id DESC
            LIMIT 100
            `,
            [clientId]
        );

        res.status(200).json({
            success: true,
            client,
            activity
        });
    } catch (error) {
        next(error);
    }
});

app.post('/api/clients', async (req, res, next) => {
    try {
        const companyName = sanitizeText(req.body.company_name, 300);

        if (!companyName) {
            return res.status(400).json({
                success: false,
                error: 'company_name is required.'
            });
        }

        const values = {
            company_name: companyName,
            contact_name: sanitizeText(req.body.contact_name, 300),
            email: sanitizeText(req.body.email, 500),
            phone: sanitizeText(req.body.phone, 100),
            website_url: sanitizeText(req.body.website_url, 2000),
            country: sanitizeText(req.body.country, 200),
            industry: sanitizeText(req.body.industry, 300),
            project_type: sanitizeText(req.body.project_type, 1000),
            budget: sanitizeText(req.body.budget, 200),
            notes: sanitizeText(req.body.notes, 10000),
            current_stage: 0,
            status: 'new',
            agent_payload: '[]',
            created_at: nowISO(),
            updated_at: nowISO()
        };

        const insertResult = await dbRun(
            `
            INSERT INTO clients (
                company_name,
                contact_name,
                email,
                phone,
                website_url,
                country,
                industry,
                project_type,
                budget,
                notes,
                current_stage,
                status,
                agent_payload,
                created_at,
                updated_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                values.company_name,
                values.contact_name,
                values.email,
                values.phone,
                values.website_url,
                values.country,
                values.industry,
                values.project_type,
                values.budget,
                values.notes,
                values.current_stage,
                values.status,
                values.agent_payload,
                values.created_at,
                values.updated_at
            ]
        );

        const clientId = insertResult.lastID;
        const client = await getClientById(clientId);

        await logActivity({
            clientId,
            action: 'client_created',
            status: 'success',
            details: {
                company_name: companyName
            }
        });

        res.status(201).json({
            success: true,
            client
        });
    } catch (error) {
        next(error);
    }
});

app.post('/api/run-agent', async (req, res, next) => {
    try {
        const clientId = validateClientId(req.body.clientId);
        const agentId = normalizeAgentId(req.body.agentId);

        if (!clientId) {
            return res.status(400).json({
                success: false,
                error: 'A valid positive integer clientId is required.'
            });
        }

        if (!agentId) {
            return res.status(400).json({
                success: false,
                error:
                    'Unsupported agentId. Supported agents: lead-research, website-audit, design-agent, quote-generator.'
            });
        }

        const result = await executeAgentPipeline(clientId, agentId);

        res.status(200).json({
            success: true,
            message: `${SUPPORTED_AGENTS[agentId].name} completed successfully.`,
            clientId,
            agentId,
            currentStage: SUPPORTED_AGENTS[agentId].stage,
            output: result.output,
            agent: result.agent,
            client: result.client
        });
    } catch (error) {
        next(error);
    }
});

app.get('/api/clients/:id/activities', async (req, res, next) => {
    try {
        const clientId = validateClientId(req.params.id);

        if (!clientId) {
            return res.status(400).json({
                success: false,
                error: 'Invalid client ID.'
            });
        }

        const activities = await dbAll(
            `
            SELECT *
            FROM activity_logs
            WHERE client_id = ?
            ORDER BY id DESC
            `,
            [clientId]
        );

        res.status(200).json({
            success: true,
            clientId,
            count: activities.length,
            activities
        });
    } catch (error) {
        next(error);
    }
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'API endpoint not found.',
        path: req.originalUrl
    });
});

app.use(async (error, req, res, next) => {
    console.error('[NEXORA ERROR]', {
        message: error.message,
        status: error.status,
        code: error.code,
        type: error.type,
        stack:
            process.env.NODE_ENV === 'production'
                ? undefined
                : error.stack
    });

    let statusCode =
        Number(error.statusCode || error.status || 500);

    if (!Number.isInteger(statusCode) || statusCode < 400) {
        statusCode = 500;
    }

    if (statusCode > 599) {
        statusCode = 500;
    }

    let message = 'An internal server error occurred.';

    if (error instanceof SyntaxError && 'body' in error) {
        statusCode = 400;
        message = 'Invalid JSON request body.';
    } else if (statusCode >= 400 && statusCode < 500) {
        message = error.message || message;
    } else if (error.status === 401) {
        statusCode = 500;
        message =
            'OpenAI authentication failed. Check OPENAI_API_KEY.';
    } else if (error.status === 429) {
        statusCode = 429;
        message =
            'OpenAI rate limit or quota limit reached. Please retry later.';
    } else if (error.code === 'SQLITE_CONSTRAINT') {
        statusCode = 409;
        message = 'Database constraint error.';
    }

    res.status(statusCode).json({
        success: false,
        error: message,
        requestId: req.id || null
    });
});

async function startServer() {
    try {
        await initializeDatabase();

        const uploadsPath = path.join(__dirname, 'uploads');

        if (!fs.existsSync(uploadsPath)) {
            fs.mkdirSync(uploadsPath, {
                recursive: true
            });
        }

        const server = app.listen(PORT, () => {
            console.log('');
            console.log('==============================================');
            console.log(' NEXORA DIGITAL INTELLIGENCE');
            console.log(' Enterprise AI Backend is running');
            console.log(` Port: ${PORT}`);
            console.log(` Model: ${OPENAI_MODEL}`);
            console.log(` Database: ${DB_PATH}`);
            console.log('==============================================');
            console.log('');
        });

        const gracefulShutdown = async (signal) => {
            console.log(
                `[NEXORA] ${signal} received. Shutting down gracefully...`
            );

            server.close(async () => {
                db.close((error) => {
                    if (error) {
                        console.error(
                            '[NEXORA] Error closing SQLite database:',
                            error
                        );
                        process.exit(1);
                    }

                    console.log(
                        '[NEXORA] Server and database closed successfully.'
                    );

                    process.exit(0);
                });
            });
        };

        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    } catch (error) {
        console.error('[NEXORA FATAL STARTUP ERROR]', error);
        process.exit(1);
    }
}

startServer();
