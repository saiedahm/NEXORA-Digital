
"use strict";

/*
  NEXORA Digital AI Backend

  Install:
  npm install express cors helmet dotenv better-sqlite3 openai

  Start:
  node server.js

  Required .env:
  OPENAI_API_KEY=your_openai_api_key
  PORT=3000
*/

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const Database = require("better-sqlite3");
const OpenAI = require("openai");

const app = express();

const PORT =
  Number(process.env.PORT || 3000);

const ROOT =
  __dirname;

const PUBLIC_DIR =
  path.join(ROOT,"public");

const DB_FILE =
  path.join(ROOT,"nexora_enterprise.db");

const db =
  new Database(DB_FILE);

db.pragma("journal_mode = WAL");

app.use(
  helmet({
    contentSecurityPolicy:false
  })
);

app.use(cors());

app.use(
  express.json({
    limit:"2mb"
  })
);

app.use(
  express.urlencoded({
    extended:true,
    limit:"2mb"
  })
);


/* =========================
   OPENAI
========================= */

const openai =
  process.env.OPENAI_API_KEY
    ? new OpenAI({
        apiKey:process.env.OPENAI_API_KEY,
        timeout:120000,
        maxRetries:2
      })
    : null;


/* =========================
   LANGUAGES
========================= */

const LANGUAGES = {

  de:"German",
  en:"English",
  ar:"Arabic",
  fr:"French",
  es:"Spanish",
  it:"Italian",
  nl:"Dutch",
  pl:"Polish",
  tr:"Turkish",
  pt:"Portuguese",
  ru:"Russian",
  uk:"Ukrainian",
  zh:"Chinese",
  ja:"Japanese",
  ko:"Korean",
  hi:"Hindi",
  sv:"Swedish",
  da:"Danish",
  no:"Norwegian",
  fi:"Finnish"

};


/* =========================
   9 AI MEMBERS
========================= */

const AI_TEAM = {

  manager:{
    id:"manager",
    name:"AI GENERAL MANAGER",
    role:"AI General Manager",
    description:
      "Coordinates the entire NEXORA AI workforce."
  },

  lead:{
    id:"lead",
    name:"LEAD RESEARCH",
    role:"Lead Research Agent",
    description:
      "Researches company profiles, opportunities and requirements."
  },

  audit:{
    id:"audit",
    name:"WEBSITE AUDIT",
    role:"Website Audit Agent",
    description:
      "Analyzes website structure, SEO and technical signals."
  },

  design:{
    id:"design",
    name:"DESIGN AGENT",
    role:"UI/UX Design Agent",
    description:
      "Creates design concepts, UX plans and creative direction."
  },

  quote:{
    id:"quote",
    name:"QUOTE GENERATOR",
    role:"Proposal and Pricing Agent",
    description:
      "Creates proposals, estimates and pricing breakdowns."
  },

  advertising:{
    id:"advertising",
    name:"ADVERTISING AGENT",
    role:"AI Advertising Agent",
    description:
      "Creates advertising campaigns and platform-ready campaign structures."
  },

  development:{
    id:"development",
    name:"DEVELOPMENT AGENT",
    role:"Development Agent",
    description:
      "Plans and executes development tasks."
  },

  qa:{
    id:"qa",
    name:"QA AGENT",
    role:"Quality Assurance Agent",
    description:
      "Checks implementation quality and identifies defects."
  },

  launch:{
    id:"launch",
    name:"LAUNCH AGENT",
    role:"Launch Agent",
    description:
      "Prepares deployment and launch procedures."
  }

};


/* =========================
   14 STAGES
========================= */

const PIPELINE = [

  {
    id:1,
    name:"Lead Intake"
  },

  {
    id:2,
    name:"Lead Research"
  },

  {
    id:3,
    name:"Website Audit"
  },

  {
    id:4,
    name:"Opportunity Analysis"
  },

  {
    id:5,
    name:"Design Brief"
  },

  {
    id:6,
    name:"Client Portal"
  },

  {
    id:7,
    name:"Design Approval"
  },

  {
    id:8,
    name:"Quote"
  },

  {
    id:9,
    name:"Contract / Terms"
  },

  {
    id:10,
    name:"Invoice"
  },

  {
    id:11,
    name:"Payment Confirmation"
  },

  {
    id:12,
    name:"Development"
  },

  {
    id:13,
    name:"QA"
  },

  {
    id:14,
    name:"Launch"
  }

];


/* =========================
   DATABASE
========================= */

db.exec(`
  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    service TEXT,
    message TEXT,
    language TEXT DEFAULT 'de',
    stage INTEGER DEFAULT 1,
    agent_payload TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS agent_activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER,
    agent_id TEXT NOT NULL,
    stage INTEGER,
    input TEXT,
    output TEXT,
    language TEXT,
    status TEXT DEFAULT 'completed',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER,
    company TEXT,
    product TEXT,
    goal TEXT,
    brief TEXT,
    platforms TEXT,
    language TEXT,
    ai_output TEXT,
    status TEXT DEFAULT 'draft',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS system_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event TEXT NOT NULL,
    payload TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);


/* =========================
   HELPERS
========================= */

function normalizeLanguage(language){

  if (
    typeof language !== "string" ||
    !LANGUAGES[language]
  ){
    return "de";
  }

  return language;
}


function getLanguageName(language){

  return LANGUAGES[
    normalizeLanguage(language)
  ];
}


function safeJSON(value){

  try{
    return JSON.parse(value);
  }catch{
    return null;
  }

}


function logSystem(event,payload={}){

  db.prepare(`
    INSERT INTO system_logs
    (event,payload)
    VALUES (?,?)
  `).run(
    event,
    JSON.stringify(payload)
  );

}


function getClient(clientId){

  return db.prepare(`
    SELECT *
    FROM clients
    WHERE id = ?
  `).get(clientId);

}


function updateClientStage(clientId,stage){

  db.prepare(`
    UPDATE clients
    SET stage = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    stage,
    clientId
  );

}


function saveAgentActivity({
  clientId,
  agentId,
  stage,
  input,
  output,
  language,
  status="completed"
}){

  db.prepare(`
    INSERT INTO agent_activity
    (
      client_id,
      agent_id,
      stage,
      input,
      output,
      language,
      status
    )
    VALUES (?,?,?,?,?,?,?)
  `).run(
    clientId || null,
    agentId,
    stage || null,
    input || "",
    output || "",
    language,
    status
  );

}


/* =========================
   AI CALL
========================= */

async function runOpenAI({
  agent,
  language,
  task,
  context=""
}){

  if (!openai){

    throw new Error(
      "OPENAI_API_KEY is not configured on the server."
    );

  }

  const languageName =
    getLanguageName(language);

  const agentInfo =
    AI_TEAM[agent] ||
    AI_TEAM.manager;

  const instructions = `
You are ${agentInfo.name}, part of the NEXORA Digital AI workforce.

Your role:
${agentInfo.description}

You operate under the NEXORA AI GENERAL MANAGER.

IMPORTANT RULES:
1. Respond professionally.
2. Respond entirely in ${languageName}.
3. Never invent verified company facts.
4. Clearly distinguish assumptions from known information.
5. Do not claim that an external action has happened unless the backend actually performed it.
6. For prices, use the server-provided pricing data.
7. Produce practical, structured business output.
8. When a human approval is required, clearly mark it as HUMAN APPROVAL REQUIRED.
`;

  const response =
    await openai.responses.create({

      model:
        process.env.OPENAI_MODEL ||
        "gpt-5.5",

      instructions,

      input:`
NEXORA TASK

${task}

CONTEXT

${context}

Return a professional result suitable for the NEXORA Command Center.
`

    });

  return (
    response.output_text ||
    "No AI output was returned."
  );

}


/* =========================
   MANAGER ROUTING
========================= */

function detectAgent(command){

  const text =
    String(command || "")
      .toLowerCase();

  if (
    /advert|werbung|anzeige|kampagne|social|ad\b|إعلان|اعلان/.test(text)
  ){
    return "advertising";
  }

  if (
    /website.*audit|audit|seo|prüfung|prüfen|check|analyse.*website/.test(text)
  ){
    return "audit";
  }

  if (
    /design|ui|ux|layout|wireframe|branding/.test(text)
  ){
    return "design";
  }

  if (
    /preis|quote|angebot|cost|kosten|estimate|budget/.test(text)
  ){
    return "quote";
  }

  if (
    /entwick|development|code|programm|automation|automatis/.test(text)
  ){
    return "development";
  }

  if (
    /qa|test|quality|qualität|bug|fehler/.test(text)
  ){
    return "qa";
  }

  if (
    /launch|deploy|deployment|live|veröffentlichen/.test(text)
  ){
    return "launch";
  }

  if (
    /lead|kunde|unternehmen|firma|research|recherche/.test(text)
  ){
    return "lead";
  }

  return "manager";

}


/* =========================
   PRICING
========================= */

const PRICING = {

  "New Website Design":{
    base:1490,
    description:
      "Modern responsive business website"
  },

  "Website Modernization":{
    base:990,
    description:
      "Modernization of an existing website"
  },

  "AI Integration":{
    base:1290,
    description:
      "AI functionality integration"
  },

  "AI Advertising":{
    base:490,
    description:
      "AI advertising campaign package"
  }

};


function calculateQuote(service){

  const selected =
    PRICING[service] ||
    PRICING["New Website Design"];

  const setup =
    selected.base;

  const contingency =
    Math.round(
      setup * 0.10
    );

  const total =
    setup + contingency;

  return {
    service,
    basePrice:setup,
    contingency,
    estimatedTotal:total,
    currency:"EUR",
    description:selected.description
  };

}


/* =========================
   HEALTH
========================= */

app.get(
  "/api/health",
  (req,res) => {

    const totalClients =
      db.prepare(`
        SELECT COUNT(*) AS count
        FROM clients
      `).get().count;

    res.json({

      status:"online",

      aiConfigured:
        Boolean(openai),

      teamSize:
        Object.keys(AI_TEAM).length,

      pipelineStages:
        PIPELINE.length,

      supportedLanguages:
        Object.keys(LANGUAGES).length,

      clients:
        totalClients,

      pipeline:{
        currentStage:1
      }

    });

  }
);


/* =========================
   LANGUAGE
========================= */

app.post(
  "/api/language",
  (req,res) => {

    const language =
      normalizeLanguage(
        req.body.language
      );

    res.json({
      success:true,
      language,
      languageName:
        getLanguageName(language)
    });

  }
);


/* =========================
   CLIENT CREATE
========================= */

app.post(
  "/api/clients",
  async (req,res) => {

    try{

      const {
        name,
        email,
        service="",
        message="",
        language="de"
      } = req.body;

      const normalizedLanguage =
        normalizeLanguage(language);

      if (!name || !email){

        return res.status(400).json({
          error:
            "Name and email are required."
        });

      }

      const result =
        db.prepare(`
          INSERT INTO clients
          (
            name,
            email,
            service,
            message,
            language,
            stage
          )
          VALUES (?,?,?,?,?,1)
        `).run(
          String(name).trim(),
          String(email).trim(),
          String(service).trim(),
          String(message).trim(),
          normalizedLanguage
        );

      const clientId =
        Number(result.lastInsertRowid);

      const client =
        getClient(clientId);

      logSystem(
        "CLIENT_CREATED",
        {
          clientId,
          language:normalizedLanguage,
          service
        }
      );

      /*
        Automatically start the AI Manager workflow.
        Financial approval/payment are intentionally
        not auto-confirmed by AI.
      */

      let managerOutput = null;

      if (openai){

        try{

          managerOutput =
            await runOpenAI({

              agent:"manager",

              language:normalizedLanguage,

              task:`
A new client request has arrived.

Determine:
1. Which AI agent should handle it first.
2. Which pipeline stage should be active.
3. What information is missing.
4. What the recommended next action is.

Client:
${name}

Service:
${service}

Message:
${message}

Return a concise operational routing decision.
`

            });

          saveAgentActivity({

            clientId,

            agentId:"manager",

            stage:1,

            input:message,

            output:managerOutput,

            language:normalizedLanguage

          });

        }catch(error){

          saveAgentActivity({

            clientId,

            agentId:"manager",

            stage:1,

            input:message,

            output:error.message,

            language:normalizedLanguage,

            status:"error"

          });

        }

      }

      return res.status(201).json({

        success:true,

        client,

        manager:
          managerOutput,

        pipeline:
          PIPELINE

      });

    }catch(error){

      console.error(error);

      return res.status(500).json({
        error:
          "Unable to create client."
      });

    }

  }
);


/* =========================
   AI COMMAND CENTER
========================= */

app.post(
  "/api/command",
  async (req,res) => {

    try{

      const {
        command,
        language="de",
        clientId=null
      } = req.body;

      const normalizedLanguage =
        normalizeLanguage(language);

      if (!command){

        return res.status(400).json({
          error:
            "Command is required."
        });

      }

      const agent =
        detectAgent(command);

      const agentInfo =
        AI_TEAM[agent];

      const client =
        clientId
          ? getClient(clientId)
          : null;

      const result =
        await runOpenAI({

          agent,

          language:normalizedLanguage,

          task:`
The AI Manager received this command:

${command}

Route this task to:

${agentInfo.name}

Agent role:
${agentInfo.description}

Provide the actual professional work requested.
`,

          context:
            client
              ? JSON.stringify(client,null,2)
              : "No specific client attached."

        });

      saveAgentActivity({

        clientId,

        agentId:agent,

        stage:
          client?.stage || 1,

        input:command,

        output:result,

        language:normalizedLanguage

      });

      logSystem(
        "AI_COMMAND",
        {
          agent,
          language:normalizedLanguage
        }
      );

      res.json({

        success:true,

        agent:{
          id:agent,
          name:agentInfo.name,
          role:agentInfo.role
        },

        language:normalizedLanguage,

        result

      });

    }catch(error){

      console.error(error);

      res.status(500).json({
        error:
          error.message ||
          "AI Manager error."
      });

    }

  }
);


/* =========================
   WEBSITE AUDIT
========================= */

app.post(
  "/api/audit",
  async (req,res) => {

    try{

      const {
        url,
        language="de",
        clientId=null
      } = req.body;

      if (!url){

        return res.status(400).json({
          error:
            "Website URL is required."
        });

      }

      let parsedUrl;

      try{

        parsedUrl =
          new URL(url);

        if (
          !["http:","https:"]
            .includes(parsedUrl.protocol)
        ){
          throw new Error(
            "Only HTTP and HTTPS URLs are supported."
          );
        }

      }catch{

        return res.status(400).json({
          error:
            "Invalid website URL."
        });

      }

      const response =
        await fetch(
          parsedUrl.toString(),
          {
            method:"GET",
            headers:{
              "User-Agent":
                "NEXORA-Digital-Audit/1.0"
            },
            redirect:"follow",
            signal:
              AbortSignal.timeout(20000)
          }
        );

      const html =
        await response.text();

      const limitedHTML =
        html.slice(0,120000);

      const title =
        (
          html.match(
            /<title[^>]*>([\s\S]*?)<\/title>/i
          ) || []
        )[1] || "";

      const description =
        (
          html.match(
            /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
          ) || []
        )[1] || "";

      const h1Count =
        (
          html.match(
            /<h1\b/gi
          ) || []
        ).length;

      const viewport =
        /name=["']viewport["']/i.test(html);

      const canonical =
        /rel=["']canonical["']/i.test(html);

      const langAttribute =
        (
          html.match(
            /<html[^>]+lang=["']([^"']+)["']/i
          ) || []
        )[1] || "";

      const auditData = {

        url:
          parsedUrl.toString(),

        status:
          response.status,

        title,

        metaDescription:
          description,

        h1Count,

        viewport,

        canonical,

        htmlLanguage:
          langAttribute,

        htmlSize:
          html.length,

        https:
          parsedUrl.protocol === "https:"

      };

      const aiResult =
        await runOpenAI({

          agent:"audit",

          language,

          task:`
Analyze the following website audit data.

Return:

1. Executive summary
2. Technical findings
3. SEO findings
4. UX findings
5. Security/basic best-practice observations
6. Priority fixes
7. Recommended next steps

Do not claim that performance, Core Web Vitals, accessibility scores,
backlinks or server configuration were measured unless the supplied
data proves it.

AUDIT DATA:
${JSON.stringify(auditData,null,2)}
`,

          context:
            `Selected HTML sample:\n${limitedHTML}`

        });

      saveAgentActivity({

        clientId,

        agentId:"audit",

        stage:3,

        input:url,

        output:aiResult,

        language

      });

      res.json({

        success:true,

        audit:auditData,

        result:aiResult

      });

    }catch(error){

      console.error(error);

      res.status(500).json({
        error:
          error.message ||
          "Website audit failed."
      });

    }

  }
);


/* =========================
   AI ADVERTISING
========================= */

app.post(
  "/api/advertising",
  async (req,res) => {

    try{

      const {
        clientId=null,
        company,
        product,
        goal="brand",
        brief,
        platforms=[],
        language="de"
      } = req.body;

      const normalizedLanguage =
        normalizeLanguage(language);

      if (
        !company ||
        !product ||
        !brief
      ){

        return res.status(400).json({
          error:
            "Company, product and advertising brief are required."
        });

      }

      const selectedPlatforms =
        Array.isArray(platforms)
          ? platforms.slice(0,10)
          : [];

      const campaign =
        await runOpenAI({

          agent:"advertising",

          language:normalizedLanguage,

          task:`
Create a professional AI advertising campaign.

Company:
${company}

Product/service:
${product}

Goal:
${goal}

Brief:
${brief}

Requested platforms:
${selectedPlatforms.join(", ") || "Not specified"}

Return:

1. Campaign concept
2. Core message
3. Target audience
4. Creative direction
5. Primary ad copy
6. Short headline variations
7. Call to action
8. Platform adaptation notes
9. Suggested campaign structure
10. HUMAN APPROVAL REQUIRED before publishing
`,

          context:
            "The campaign is being prepared by NEXORA Advertising Agent."

        });

      const insert =
        db.prepare(`
          INSERT INTO campaigns
          (
            client_id,
            company,
            product,
            goal,
            brief,
            platforms,
            language,
            ai_output,
            status
          )
          VALUES (?,?,?,?,?,?,?,?,?)
        `).run(
          clientId || null,
          company,
          product,
          goal,
          brief,
          JSON.stringify(
            selectedPlatforms
          ),
          normalizedLanguage,
          campaign,
          "draft"
        );

      saveAgentActivity({

        clientId,

        agentId:"advertising",

        stage:
          clientId
            ? 5
            : 1,

        input:
          brief,

        output:
          campaign,

        language:
          normalizedLanguage

      });

      logSystem(
        "AI_CAMPAIGN_CREATED",
        {
          campaignId:
            insert.lastInsertRowid,
          clientId,
          platforms:selectedPlatforms
        }
      );

      res.json({

        success:true,

        campaignId:
          Number(
            insert.lastInsertRowid
          ),

        status:"draft",

        platforms:
          selectedPlatforms,

        result:
          campaign

      });

    }catch(error){

      console.error(error);

      res.status(500).json({
        error:
          error.message ||
          "Advertising campaign generation failed."
      });

    }

  }
);


/* =========================
   QUOTE GENERATOR
========================= */

app.post(
  "/api/quote",
  async (req,res) => {

    try{

      const {
        service,
        requirements="",
        language="de",
        clientId=null
      } = req.body;

      const normalizedLanguage =
        normalizeLanguage(language);

      const quote =
        calculateQuote(service);

      const proposal =
        await runOpenAI({

          agent:"quote",

          language:normalizedLanguage,

          task:`
Create a formal professional proposal using the following
server-calculated pricing.

Service:
${quote.service}

Base price:
€${quote.basePrice}

Contingency:
€${quote.contingency}

Estimated total:
€${quote.estimatedTotal}

Description:
${quote.description}

Client requirements:
${requirements}

The AI must NOT alter the numerical prices.
Explain that final pricing depends on confirmed scope.

Include:
- Scope
- Deliverables
- Price
- Estimated timeline
- Assumptions
- Next step
- HUMAN APPROVAL REQUIRED
`

        });

      saveAgentActivity({

        clientId,

        agentId:"quote",

        stage:8,

        input:
          requirements,

        output:
          proposal,

        language:
          normalizedLanguage

      });

      res.json({

        success:true,

        pricing:
          quote,

        result:
          proposal

      });

    }catch(error){

      console.error(error);

      res.status(500).json({
        error:
          error.message
      });

    }

  }
);


/* =========================
   RUN AGENT
========================= */

app.post(
  "/api/run-agent",
  async (req,res) => {

    try{

      const {
        clientId,
        agentId,
        language
      } = req.body;

      const client =
        getClient(clientId);

      if (!client){

        return res.status(404).json({
          error:
            "Client not found."
        });

      }

      if (!AI_TEAM[agentId]){

        return res.status(400).json({
          error:
            "Unknown AI agent."
        });

      }

      const normalizedLanguage =
        normalizeLanguage(
          language || client.language
        );

      const agent =
        AI_TEAM[agentId];

      const task =
        `
Client:
${client.name}

Service:
${client.service}

Email:
${client.email}

Request:
${client.message}

Current pipeline stage:
${client.stage}

Execute your assigned role as ${agent.name}.

Return the practical next output required for this client.
`;

      const output =
        await runOpenAI({

          agent:agentId,

          language:normalizedLanguage,

          task

        });

      const nextStage =
        Math.min(
          14,
          Math.max(
            client.stage + 1,
            client.stage
          )
        );

      db.prepare(`
        UPDATE clients
        SET
          agent_payload = ?,
          stage = ?,
          language = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(
        JSON.stringify({
          agent:agentId,
          output,
          language:normalizedLanguage
        }),
        nextStage,
        normalizedLanguage,
        clientId
      );

      saveAgentActivity({

        clientId,

        agentId,

        stage:
          client.stage,

        input:
          client.message,

        output,

        language:
          normalizedLanguage

      });

      res.json({

        success:true,

        client:
          getClient(clientId),

        agent:{
          id:agentId,
          name:agent.name
        },

        result:
          output,

        nextStage

      });

    }catch(error){

      console.error(error);

      res.status(500).json({
        error:
          error.message ||
          "Agent execution failed."
      });

    }

  }
);


/* =========================
   CLIENTS
========================= */

app.get(
  "/api/clients",
  (req,res) => {

    const clients =
      db.prepare(`
        SELECT
          id,
          name,
          email,
          service,
          language,
          stage,
          created_at,
          updated_at
        FROM clients
        ORDER BY id DESC
        LIMIT 100
      `).all();

    res.json({
      clients
    });

  }
);


/* =========================
   CLIENT DETAILS
========================= */

app.get(
  "/api/clients/:id",
  (req,res) => {

    const client =
      getClient(
        Number(req.params.id)
      );

    if (!client){

      return res.status(404).json({
        error:
          "Client not found."
      });

    }

    const activities =
      db.prepare(`
        SELECT *
        FROM agent_activity
        WHERE client_id = ?
        ORDER BY id DESC
      `).all(client.id);

    res.json({

      client,

      activities,

      pipeline:
        PIPELINE

    });

  }
);


/* =========================
   PIPELINE UPDATE
========================= */

app.post(
  "/api/clients/:id/stage",
  (req,res) => {

    const clientId =
      Number(req.params.id);

    const stage =
      Number(req.body.stage);

    if (
      !Number.isInteger(stage) ||
      stage < 1 ||
      stage > 14
    ){

      return res.status(400).json({
        error:
          "Stage must be between 1 and 14."
      });

    }

    const client =
      getClient(clientId);

    if (!client){

      return res.status(404).json({
        error:
          "Client not found."
      });

    }

    /*
      Important:
      Stages involving payment, contracts and approvals
      should be confirmed by the responsible human,
      payment webhook or trusted business integration.
    */

    updateClientStage(
      clientId,
      stage
    );

    logSystem(
      "PIPELINE_STAGE_UPDATED",
      {
        clientId,
        stage,
        stageName:
          PIPELINE[stage - 1].name
      }
    );

    res.json({

      success:true,

      client:
        getClient(clientId),

      stage:
        PIPELINE[stage - 1]

    });

  }
);


/* =========================
   TEAM
========================= */

app.get(
  "/api/ai-team",
  (req,res) => {

    res.json({

      manager:
        AI_TEAM.manager,

      agents:
        Object.values(AI_TEAM)
          .filter(
            agent =>
              agent.id !== "manager"
          )

    });

  }
);


/* =========================
   PIPELINE
========================= */

app.get(
  "/api/pipeline",
  (req,res) => {

    res.json({
      pipeline:PIPELINE
    });

  }
);


/* =========================
   STATIC WEBSITE
========================= */

app.use(
  express.static(
    PUBLIC_DIR
  )
);


/* =========================
   SPA FALLBACK
========================= */

app.get(
  "*",
  (req,res) => {

    res.sendFile(
      path.join(
        PUBLIC_DIR,
        "index.html"
      )
    );

  }
);


/* =========================
   ERROR HANDLER
========================= */

app.use(
  (error,req,res,next) => {

    console.error(error);

    if (res.headersSent){
      return next(error);
    }

    res.status(500).json({
      error:
        "Internal NEXORA server error."
    });

  }
);


/* =========================
   START
========================= */

app.listen(
  PORT,
  () => {

    console.log(
      `NEXORA Digital running on http://localhost:${PORT}`
    );

    console.log(
      `AI Manager: ${openai ? "CONFIGURED" : "NOT CONFIGURED"}`
    );

    console.log(
      `AI Team: ${Object.keys(AI_TEAM).length} members`
    );

    console.log(
      `Pipeline: ${PIPELINE.length} stages`
    );

    console.log(
      `Languages: ${Object.keys(LANGUAGES).length}`
    );

  }
);
