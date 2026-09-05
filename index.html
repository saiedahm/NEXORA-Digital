/*
=============================================================
 NEXORA DIGITAL
 PHASE 2 — COMMAND CENTER
 Single File Full-Stack Prototype

 Run:
 node server.js

 Open:
 http://localhost:3000

 Database file is created automatically:
 nexora-db.json
=============================================================
*/

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.PORT || 3000;

const DB_FILE = path.join(__dirname, "nexora-db.json");


/* ============================================================
   DATABASE
============================================================ */

function createDefaultDatabase() {
  return {
    settings: {
      company: "NEXORA Digital",
      language: "en"
    },

    stats: {
      commands: 0
    },

    agents: [
      {
        id: "manager",
        name: "NEXORA AI Manager",
        icon: "🧠",
        role: "Central intelligence and workflow management",
        status: "ONLINE",
        enabled: true
      },
      {
        id: "leads",
        name: "Lead Research Agent",
        icon: "🔍",
        role: "Find and organize potential business opportunities",
        status: "READY",
        enabled: true
      },
      {
        id: "audit",
        name: "Website Audit Agent",
        icon: "🌐",
        role: "Analyze website modernization opportunities",
        status: "READY",
        enabled: true
      },
      {
        id: "design",
        name: "Design Agent",
        icon: "🎨",
        role: "Prepare design concepts and project direction",
        status: "READY",
        enabled: true
      },
      {
        id: "communication",
        name: "Client Communication Agent",
        icon: "💬",
        role: "Manage approved communication workflows",
        status: "READY",
        enabled: true
      },
      {
        id: "planner",
        name: "Project Planner Agent",
        icon: "📋",
        role: "Create project plans and milestones",
        status: "READY",
        enabled: true
      },
      {
        id: "development",
        name: "Development Agent",
        icon: "💻",
        role: "Support website and application development",
        status: "READY",
        enabled: true
      },
      {
        id: "qa",
        name: "Quality Assurance Agent",
        icon: "🛡️",
        role: "Review quality before final delivery",
        status: "READY",
        enabled: true
      }
    ],

    clients: [],

    projects: [],

    activities: [
      {
        id: crypto.randomUUID(),
        time: new Date().toISOString(),
        type: "system",
        message: "NEXORA Command Center initialized."
      }
    ],

    commands: []
  };
}


function loadDatabase() {
  try {

    if (!fs.existsSync(DB_FILE)) {
      const db = createDefaultDatabase();
      saveDatabase(db);
      return db;
    }

    const content = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(content);

  } catch (error) {

    console.error("Database error:", error);

    const db = createDefaultDatabase();
    saveDatabase(db);

    return db;
  }
}


function saveDatabase(database) {

  fs.writeFileSync(
    DB_FILE,
    JSON.stringify(database, null, 2),
    "utf8"
  );

}


let db = loadDatabase();


/* ============================================================
   HELPERS
============================================================ */

function sendJSON(response, statusCode, data) {

  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });

  response.end(JSON.stringify(data));

}


function sendHTML(response, html) {

  response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8"
  });

  response.end(html);

}


function readBody(request) {

  return new Promise((resolve, reject) => {

    let body = "";

    request.on("data", chunk => {

      body += chunk.toString();

      if (body.length > 1000000) {
        request.destroy();
      }

    });


    request.on("end", () => {

      try {

        resolve(
          body ? JSON.parse(body) : {}
        );

      } catch (error) {

        reject(error);

      }

    });

  });

}


function addActivity(type, message) {

  db.activities.unshift({
    id: crypto.randomUUID(),
    time: new Date().toISOString(),
    type,
    message
  });

  db.activities = db.activities.slice(0, 100);

  saveDatabase(db);

}


function getDashboardData() {

  const totalClients =
    db.clients.length;

  const totalProjects =
    db.projects.length;

  const activeProjects =
    db.projects.filter(
      project =>
        project.status === "IN_PROGRESS"
    ).length;

  const completedProjects =
    db.projects.filter(
      project =>
        project.status === "COMPLETED"
    ).length;

  const onlineAgents =
    db.agents.filter(
      agent => agent.enabled
    ).length;


  return {

    company: db.settings.company,

    totalClients,

    totalProjects,

    activeProjects,

    completedProjects,

    onlineAgents,

    commands: db.stats.commands,

    clients: db.clients,

    projects: db.projects,

    agents: db.agents,

    activities: db.activities.slice(0, 15),

    commandsHistory:
      db.commands.slice(0, 20)

  };

}


/* ============================================================
   API ROUTER
============================================================ */

async function handleAPI(
  request,
  response,
  pathname
) {

  /* ----------------------------------------------------------
     DASHBOARD
  ---------------------------------------------------------- */

  if (
    request.method === "GET" &&
    pathname === "/api/dashboard"
  ) {

    return sendJSON(
      response,
      200,
      getDashboardData()
    );

  }


  /* ----------------------------------------------------------
     CLIENTS
  ---------------------------------------------------------- */

  if (
    request.method === "GET" &&
    pathname === "/api/clients"
  ) {

    return sendJSON(
      response,
      200,
      db.clients
    );

  }


  if (
    request.method === "POST" &&
    pathname === "/api/clients"
  ) {

    try {

      const body =
        await readBody(request);


      const client = {

        id: crypto.randomUUID(),

        name:
          body.name || "Unnamed Client",

        company:
          body.company || "",

        email:
          body.email || "",

        phone:
          body.phone || "",

        website:
          body.website || "",

        country:
          body.country || "Germany",

        industry:
          body.industry || "",

        opportunity:
          body.opportunity || "",

        score:
          Number(body.score || 0),

        status:
          body.status || "NEW",

        notes:
          body.notes || "",

        createdAt:
          new Date().toISOString()

      };


      db.clients.unshift(client);


      addActivity(
        "client",
        `New client added: ${client.company || client.name}`
      );


      saveDatabase(db);


      return sendJSON(
        response,
        201,
        client
      );

    } catch (error) {

      return sendJSON(
        response,
        400,
        {
          error:
            "Invalid client data."
        }
      );

    }

  }


  /* ----------------------------------------------------------
     DELETE CLIENT
  ---------------------------------------------------------- */

  if (
    request.method === "DELETE" &&
    pathname.startsWith("/api/clients/")
  ) {

    const id =
      pathname.split("/").pop();


    const client =
      db.clients.find(
        item => item.id === id
      );


    db.clients =
      db.clients.filter(
        item => item.id !== id
      );


    if (client) {

      addActivity(
        "client",
        `Client removed: ${client.company || client.name}`
      );

    }


    saveDatabase(db);


    return sendJSON(
      response,
      200,
      {
        success: true
      }
    );

  }


  /* ----------------------------------------------------------
     CREATE PROJECT
  ---------------------------------------------------------- */

  if (
    request.method === "POST" &&
    pathname === "/api/projects"
  ) {

    try {

      const body =
        await readBody(request);


      const project = {

        id: crypto.randomUUID(),

        title:
          body.title ||
          "New NEXORA Project",

        clientId:
          body.clientId || "",

        client:
          body.client || "",

        service:
          body.service ||
          "Website Development",

        budget:
          body.budget || "",

        status:
          body.status || "PLANNING",

        priority:
          body.priority || "NORMAL",

        description:
          body.description || "",

        createdAt:
          new Date().toISOString(),

        updatedAt:
          new Date().toISOString(),

        workflow: [
          {
            name: "Requirements",
            status: "PENDING"
          },
          {
            name: "Design",
            status: "PENDING"
          },
          {
            name: "Client Approval",
            status: "PENDING"
          },
          {
            name: "Development",
            status: "PENDING"
          },
          {
            name: "Quality Assurance",
            status: "PENDING"
          },
          {
            name: "Launch",
            status: "PENDING"
          }
        ]

      };


      db.projects.unshift(project);


      addActivity(
        "project",
        `New project created: ${project.title}`
      );


      saveDatabase(db);


      return sendJSON(
        response,
        201,
        project
      );

    } catch (error) {

      return sendJSON(
        response,
        400,
        {
          error:
            "Invalid project data."
        }
      );

    }

  }


  /* ----------------------------------------------------------
     UPDATE PROJECT
  ---------------------------------------------------------- */

  if (
    request.method === "PUT" &&
    pathname.startsWith("/api/projects/")
  ) {

    try {

      const id =
        pathname.split("/").pop();


      const body =
        await readBody(request);


      const project =
        db.projects.find(
          item => item.id === id
        );


      if (!project) {

        return sendJSON(
          response,
          404,
          {
            error:
              "Project not found."
          }
        );

      }


      const allowedFields = [

        "title",
        "service",
        "budget",
        "status",
        "priority",
        "description",
        "workflow"

      ];


      allowedFields.forEach(field => {

        if (
          body[field] !== undefined
        ) {

          project[field] =
            body[field];

        }

      });


      project.updatedAt =
        new Date().toISOString();


      addActivity(
        "project",
        `Project updated: ${project.title}`
      );


      saveDatabase(db);


      return sendJSON(
        response,
        200,
        project
      );

    } catch (error) {

      return sendJSON(
        response,
        400,
        {
          error:
            "Project update failed."
        }
      );

    }

  }


  /* ----------------------------------------------------------
     DELETE PROJECT
  ---------------------------------------------------------- */

  if (
    request.method === "DELETE" &&
    pathname.startsWith("/api/projects/")
  ) {

    const id =
      pathname.split("/").pop();


    const project =
      db.projects.find(
        item => item.id === id
      );


    db.projects =
      db.projects.filter(
        item => item.id !== id
      );


    if (project) {

      addActivity(
        "project",
        `Project deleted: ${project.title}`
      );

    }


    saveDatabase(db);


    return sendJSON(
      response,
      200,
      {
        success: true
      }
    );

  }


  /* ----------------------------------------------------------
     AI AGENTS
  ---------------------------------------------------------- */

  if (
    request.method === "POST" &&
    pathname.startsWith("/api/agents/")
  ) {

    try {

      const parts =
        pathname.split("/");


      const id =
        parts[3];


      const action =
        parts[4];


      const agent =
        db.agents.find(
          item => item.id === id
        );


      if (!agent) {

        return sendJSON(
          response,
          404,
          {
            error:
              "Agent not found."
          }
        );

      }


      if (action === "toggle") {

        agent.enabled =
          !agent.enabled;


        agent.status =
          agent.enabled
            ? "READY"
            : "OFFLINE";


        addActivity(
          "agent",
          `${agent.name} is now ${agent.status}`
        );


        saveDatabase(db);


        return sendJSON(
          response,
          200,
          agent
        );

      }


      return sendJSON(
        response,
        400,
        {
          error:
            "Unknown agent action."
        }
      );

    } catch (error) {

      return sendJSON(
        response,
        400,
        {
          error:
            "Agent action failed."
        }
      );

    }

  }


  /* ----------------------------------------------------------
     AI COMMAND CENTER
  ---------------------------------------------------------- */

  if (
    request.method === "POST" &&
    pathname === "/api/command"
  ) {

    try {

      const body =
        await readBody(request);


      const command =
        String(
          body.command || ""
        ).trim();


      if (!command) {

        return sendJSON(
          response,
          400,
          {
            error:
              "Command is empty."
          }
        );

      }


      const lower =
        command.toLowerCase();


      let result = [];

      let agent =
        "NEXORA AI Manager";


      /*
      ----------------------------------------------
      LEAD SEARCH WORKFLOW
      ----------------------------------------------
      */

      if (
        lower.includes("lead") ||
        lower.includes("company") ||
        lower.includes("unternehmen") ||
        lower.includes("kunden") ||
        lower.includes("client")
      ) {

        agent =
          "Lead Research Agent";


        result = [

          "Research workflow prepared.",

          "Target market detected.",

          "Business categories can be organized into leads.",

          "Phase 3 can connect approved data sources and research services.",

          "No automated outreach has been sent."

        ];

      }


      /*
      ----------------------------------------------
      WEBSITE AUDIT
      ----------------------------------------------
      */

      else if (
        lower.includes("audit") ||
        lower.includes("website") ||
        lower.includes("webseite") ||
        lower.includes("analyse")
      ) {

        agent =
          "Website Audit Agent";


        result = [

          "Website audit workflow selected.",

          "Performance analysis can be connected.",

          "Mobile usability can be checked.",

          "SEO and accessibility can be evaluated.",

          "AI readiness report can be generated."

        ];

      }


      /*
      ----------------------------------------------
      DESIGN
      ----------------------------------------------
      */

      else if (
        lower.includes("design") ||
        lower.includes("redesign") ||
        lower.includes("ui") ||
        lower.includes("ux")
      ) {

        agent =
          "Design Agent";


        result = [

          "Design workflow activated.",

          "Project requirements should be collected.",

          "A visual concept can be prepared.",

          "Client approval is required before final implementation."

        ];

      }


      /*
      ----------------------------------------------
      PROJECT
      ----------------------------------------------
      */

      else if (
        lower.includes("project") ||
        lower.includes("projekt") ||
        lower.includes("plan")
      ) {

        agent =
          "Project Planner Agent";


        result = [

          "Project planning workflow activated.",

          "Requirements → Design → Approval → Development → QA → Launch.",

          "Project can be tracked from the dashboard."

        ];

      }


      /*
      ----------------------------------------------
      DEFAULT
      ----------------------------------------------
      */

      else {

        result = [

          "Command received by NEXORA AI Manager.",

          "Task has been classified.",

          "Appropriate workflow has been prepared.",

          "Human approval remains required for sensitive actions."

        ];

      }


      const commandRecord = {

        id: crypto.randomUUID(),

        command,

        agent,

        result,

        createdAt:
          new Date().toISOString()

      };


      db.commands.unshift(
        commandRecord
      );


      db.stats.commands++;


      addActivity(
        "command",
        `${agent} processed a new command.`
      );


      saveDatabase(db);


      return sendJSON(
        response,
        200,
        commandRecord
      );

    } catch (error) {

      return sendJSON(
        response,
        400,
        {
          error:
            "Command processing failed."
        }
      );

    }

  }


  /* ----------------------------------------------------------
     404
  ---------------------------------------------------------- */

  return sendJSON(
    response,
    404,
    {
      error:
        "API endpoint not found."
    }
  );

}


/* ============================================================
   FRONTEND
============================================================ */

const HTML = String.raw`
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width, initial-scale=1.0">

<title>NEXORA Command Center</title>


<style>

/* ============================================================
   ROOT
============================================================ */

:root {

--bg:
#050a12;

--bg2:
#081422;

--panel:
#0c1828;

--panel2:
#101f33;

--text:
#f4f8ff;

--muted:
#91a4bd;

--cyan:
#55e6ff;

--blue:
#6b8cff;

--purple:
#916cff;

--green:
#53e5a4;

--yellow:
#ffd166;

--red:
#ff6b7a;

--border:
rgba(160,190,255,.13);

--radius:
20px;

}


/* ============================================================
   RESET
============================================================ */

* {

box-sizing:
border-box;

margin:0;

padding:0;

}


html {

scroll-behavior:
smooth;

}


body {

font-family:

Inter,
Arial,
sans-serif;

background:

radial-gradient(
circle at top left,
rgba(83,105,255,.16),
transparent 30%
),

radial-gradient(
circle at bottom right,
rgba(85,230,255,.08),
transparent 35%
),

var(--bg);

color:
var(--text);

min-height:
100vh;

}


button,
input,
textarea,
select {

font:
inherit;

}


button {

cursor:
pointer;

}


/* ============================================================
   APP
============================================================ */

.app {

display:
grid;

grid-template-columns:
270px 1fr;

min-height:
100vh;

}


/* ============================================================
   SIDEBAR
============================================================ */

.sidebar {

position:
fixed;

left:0;

top:0;

bottom:0;

width:
270px;

padding:
24px 16px;

background:
rgba(7,15,26,.94);

border-right:
1px solid var(--border);

backdrop-filter:
blur(20px);

display:
flex;

flex-direction:
column;

z-index:
100;

}


.brand {

display:
flex;

align-items:
center;

gap:
13px;

padding:
10px;

margin-bottom:
32px;

}


.logo {

width:
48px;

height:
48px;

border-radius:
16px;

display:
flex;

align-items:
center;

justify-content:
center;

font-size:
24px;

font-weight:
900;

background:

linear-gradient(
135deg,
var(--blue),
var(--purple)
);

box-shadow:
0 15px 40px
rgba(100,100,255,.28);

}


.brand h1 {

font-size:
17px;

letter-spacing:
2px;

}


.brand span {

display:
block;

font-size:
9px;

letter-spacing:
3px;

color:
var(--cyan);

margin-top:
3px;

}


.nav {

display:
grid;

gap:
7px;

}


.nav button {

border:
0;

background:
transparent;

color:
var(--muted);

text-align:
left;

padding:
13px 15px;

border-radius:
13px;

font-size:
14px;

transition:
.2s;

}


.nav button:hover {

background:
rgba(255,255,255,.05);

color:
white;

}


.nav button.active {

background:

linear-gradient(
90deg,
rgba(85,230,255,.13),
rgba(110,140,255,.08)
);

color:
var(--cyan);

border:
1px solid
rgba(85,230,255,.10);

}


.system {

margin-top:
auto;

padding:
16px;

border:
1px solid var(--border);

border-radius:
16px;

background:
rgba(255,255,255,.025);

}


.system small {

display:
block;

color:
var(--muted);

margin-bottom:
8px;

}


.online {

color:
var(--green);

font-size:
12px;

}


/* ============================================================
   MAIN
============================================================ */

.main {

grid-column:
2;

padding:
28px;

max-width:
1800px;

width:
100%;

}


.topbar {

display:
flex;

justify-content:
space-between;

align-items:
center;

gap:
20px;

margin-bottom:
32px;

}


.page-title h2 {

font-size:
30px;

letter-spacing:
-1px;

}


.page-title p {

color:
var(--muted);

margin-top:
7px;

font-size:
14px;

}


.top-actions {

display:
flex;

gap:
10px;

align-items:
center;

}


.language {

border:
1px solid var(--border);

background:
rgba(255,255,255,.04);

color:
white;

padding:
11px 14px;

border-radius:
12px;

}


.primary {

border:
0;

padding:
12px 17px;

border-radius:
12px;

font-weight:
800;

background:

linear-gradient(
135deg,
var(--cyan),
var(--blue)
);

color:
#06101a;

}


/* ============================================================
   PAGES
============================================================ */

.page {

display:
none;

animation:
fade .25s ease;

}


.page.active {

display:
block;

}


@keyframes fade {

from {

opacity:0;

transform:
translateY(5px);

}

to {

opacity:1;

transform:
translateY(0);

}

}


/* ============================================================
   STAT GRID
============================================================ */

.stats {

display:
grid;

grid-template-columns:
repeat(6,1fr);

gap:
14px;

margin-bottom:
24px;

}


.stat {

padding:
20px;

border:
1px solid var(--border);

border-radius:
18px;

background:

linear-gradient(
145deg,
rgba(255,255,255,.055),
rgba(255,255,255,.015)
);

}


.stat span {

display:
block;

font-size:
11px;

color:
var(--muted);

margin-bottom:
11px;

}


.stat strong {

font-size:
28px;

}


/* ============================================================
   GRID
============================================================ */

.grid2 {

display:
grid;

grid-template-columns:
1.2fr .8fr;

gap:
20px;

}


.grid3 {

display:
grid;

grid-template-columns:
repeat(3,1fr);

gap:
16px;

}


/* ============================================================
   CARD
============================================================ */

.card {

padding:
23px;

border:
1px solid var(--border);

border-radius:
var(--radius);

background:
rgba(255,255,255,.025);

}


.card h3 {

margin-bottom:
18px;

font-size:
17px;

}


.card-head {

display:
flex;

justify-content:
space-between;

align-items:
center;

gap:
15px;

margin-bottom:
16px;

}


/* ============================================================
   ACTIVITY
============================================================ */

.activity {

display:
grid;

gap:
10px;

}


.activity-item {

padding:
13px;

border-radius:
13px;

background:
rgba(255,255,255,.025);

border:
1px solid
rgba(255,255,255,.04);

}


.activity-item strong {

font-size:
13px;

display:
block;

margin-bottom:
5px;

}


.activity-item span {

font-size:
11px;

color:
var(--muted);

}


/* ============================================================
   AGENTS
============================================================ */

.agents {

display:
grid;

grid-template-columns:
repeat(2,1fr);

gap:
15px;

}


.agent {

padding:
20px;

border:
1px solid var(--border);

border-radius:
18px;

background:
rgba(255,255,255,.025);

}


.agent-top {

display:
flex;

align-items:
center;

justify-content:
space-between;

gap:
10px;

}


.agent-icon {

font-size:
26px;

}


.agent h3 {

font-size:
15px;

margin-top:
12px;

}


.agent p {

font-size:
12px;

color:
var(--muted);

line-height:
1.6;

margin:
8px 0 15px;

}


.status {

font-size:
10px;

font-weight:
800;

padding:
6px 9px;

border-radius:
999px;

}


.status.online {

background:
rgba(83,229,164,.09);

border:
1px solid
rgba(83,229,164,.18);

color:
var(--green);

}


.status.offline {

background:
rgba(255,107,122,.08);

color:
var(--red);

}


.agent button {

width:
100%;

padding:
10px;

border-radius:
10px;

border:
1px solid var(--border);

background:
rgba(255,255,255,.04);

color:
white;

}


/* ============================================================
   TABLE
============================================================ */

.table-wrap {

overflow-x:
auto;

}


table {

width:
100%;

border-collapse:
collapse;

min-width:
700px;

}


th {

font-size:
10px;

letter-spacing:
1px;

color:
var(--muted);

text-align:
left;

padding:
13px;

border-bottom:
1px solid var(--border);

}


td {

padding:
15px 13px;

font-size:
13px;

border-bottom:
1px solid
rgba(255,255,255,.05);

}


td small {

display:
block;

color:
var(--muted);

margin-top:
4px;

}


.badge {

font-size:
10px;

padding:
6px 9px;

border-radius:
999px;

background:
rgba(110,140,255,.12);

color:
var(--cyan);

display:
inline-block;

}


.badge.green {

color:
var(--green);

background:
rgba(83,229,164,.08);

}


.badge.yellow {

color:
var(--yellow);

background:
rgba(255,209,102,.08);

}


.badge.red {

color:
var(--red);

background:
rgba(255,107,122,.08);

}


.icon-btn {

border:
1px solid var(--border);

background:
rgba(255,255,255,.04);

color:
white;

padding:
8px 10px;

border-radius:
9px;

}


/* ============================================================
   FORM
============================================================ */

.form {

display:
grid;

gap:
13px;

}


.form-row {

display:
grid;

grid-template-columns:
1fr 1fr;

gap:
13px;

}


input,
textarea,
select {

width:
100%;

padding:
13px 14px;

border-radius:
11px;

border:
1px solid var(--border);

background:
rgba(0,0,0,.18);

color:
white;

outline:
none;

}


textarea {

min-height:
120px;

resize:
vertical;

}


input:focus,
textarea:focus,
select:focus {

border-color:
var(--cyan);

}


/* ============================================================
   COMMAND CENTER
============================================================ */

.command-box {

padding:
25px;

border-radius:
22px;

border:
1px solid
rgba(85,230,255,.18);

background:

linear-gradient(
135deg,
rgba(85,230,255,.06),
rgba(110,140,255,.04)
);

}


.command-output {

margin-top:
18px;

display:
grid;

gap:
8px;

}


.command-result {

padding:
17px;

border-radius:
14px;

background:
rgba(0,0,0,.22);

border:
1px solid var(--border);

line-height:
1.7;

font-size:
13px;

}


/* ============================================================
   PROJECTS
============================================================ */

.project-card {

padding:
20px;

border-radius:
18px;

border:
1px solid var(--border);

background:
rgba(255,255,255,.025);

}


.project-card h3 {

margin-bottom:
8px;

}


.project-meta {

font-size:
12px;

color:
var(--muted);

line-height:
1.7;

}


.project-actions {

display:
flex;

gap:
8px;

margin-top:
16px;

flex-wrap:
wrap;

}


/* ============================================================
   MODAL
============================================================ */

.modal {

display:
none;

position:
fixed;

inset:0;

background:
rgba(0,0,0,.7);

backdrop-filter:
blur(8px);

align-items:
center;

justify-content:
center;

padding:
20px;

z-index:
1000;

}


.modal.active {

display:
flex;

}


.modal-box {

width:
min(700px,100%);

max-height:
90vh;

overflow:
auto;

padding:
25px;

border-radius:
22px;

background:
#0b1726;

border:
1px solid var(--border);

}


.modal-top {

display:
flex;

justify-content:
space-between;

align-items:
center;

margin-bottom:
20px;

}


.close {

border:
0;

width:
40px;

height:
40px;

border-radius:
10px;

background:
rgba(255,255,255,.07);

color:
white;

font-size:
20px;

}


/* ============================================================
   EMPTY
============================================================ */

.empty {

text-align:
center;

padding:
50px 20px;

color:
var(--muted);

}


/* ============================================================
   TOAST
============================================================ */

.toast {

position:
fixed;

right:
25px;

bottom:
25px;

padding:
14px 18px;

border-radius:
13px;

background:
#10253a;

border:
1px solid var(--border);

box-shadow:
0 20px 60px
rgba(0,0,0,.35);

transform:
translateY(100px);

opacity:0;

transition:
.25s;

z-index:
3000;

}


.toast.show {

transform:
translateY(0);

opacity:1;

}


/* ============================================================
   MOBILE
============================================================ */

@media(max-width:1200px) {

.stats {

grid-template-columns:
repeat(3,1fr);

}

.grid2 {

grid-template-columns:
1fr;

}

}


@media(max-width:850px) {

.app {

grid-template-columns:
1fr;

}

.sidebar {

position:
static;

width:
100%;

min-height:
auto;

}

.nav {

grid-template-columns:
repeat(2,1fr);

}

.system {

display:none;

}

.main {

grid-column:
1;

padding:
18px;

}

.topbar {

align-items:
flex-start;

flex-direction:
column;

}

.agents {

grid-template-columns:
1fr;

}

.grid3 {

grid-template-columns:
1fr;

}

}


@media(max-width:550px) {

.stats {

grid-template-columns:
1fr 1fr;

}

.form-row {

grid-template-columns:
1fr;

}

.nav {

grid-template-columns:
1fr;

}

}

</style>

</head>


<body>


<div class="app">


<!-- ==========================================================
SIDEBAR
========================================================== -->

<aside class="sidebar">

<div class="brand">

<div class="logo">
N
</div>

<div>

<h1>NEXORA</h1>

<span>DIGITAL INTELLIGENCE</span>

</div>

</div>


<div class="nav">

<button
class="active"
onclick="showPage('dashboard',this)">

◈ Dashboard

</button>


<button
onclick="showPage('command',this)">

🧠 AI Command Center

</button>


<button
onclick="showPage('clients',this)">

👥 Clients

</button>


<button
onclick="showPage('projects',this)">

📋 Projects

</button>


<button
onclick="showPage('agents',this)">

🤖 AI Agents

</button>


<button
onclick="showPage('activity',this)">

⚡ Activity

</button>


<button
onclick="showPage('settings',this)">

⚙ Settings

</button>

</div>


<div class="system">

<small>
NEXORA SYSTEM
</small>

<div class="online">

● COMMAND CENTER ONLINE

</div>

</div>

</aside>


<!-- ==========================================================
MAIN
========================================================== -->

<main class="main">


<div class="topbar">

<div class="page-title">

<h2 id="pageTitle">

Command Center

</h2>

<p>

Manage clients, projects and AI workflows.

</p>

</div>


<div class="top-actions">

<button
class="language"
onclick="toggleLanguage()"
id="languageButton">

DE

</button>


<button
class="primary"
onclick="openClientModal()">

+ New Client

</button>

</div>

</div>



<!-- ==========================================================
DASHBOARD
========================================================== -->

<section
id="dashboard"
class="page active">


<div class="stats">

<div class="stat">

<span>
TOTAL CLIENTS
</span>

<strong
id="totalClients">

0

</strong>

</div>


<div class="stat">

<span>
TOTAL PROJECTS
</span>

<strong
id="totalProjects">

0

</strong>

</div>


<div class="stat">

<span>
ACTIVE PROJECTS
</span>

<strong
id="activeProjects">

0

</strong>

</div>


<div class="stat">

<span>
COMPLETED
</span>

<strong
id="completedProjects">

0

</strong>

</div>


<div class="stat">

<span>
AI AGENTS
</span>

<strong
id="onlineAgents">

0

</strong>

</div>


<div class="stat">

<span>
COMMANDS
</span>

<strong
id="commandCount">

0

</strong>

</div>

</div>


<div class="grid2">


<div class="card">

<div class="card-head">

<h3>
Recent Activity
</h3>

<span class="badge">
LIVE
</span>

</div>


<div
id="dashboardActivity"
class="activity">

</div>

</div>


<div class="card">

<div class="card-head">

<h3>
NEXORA Status
</h3>

<span
class="badge green">

ONLINE

</span>

</div>


<div class="activity">

<div class="activity-item">

<strong>
🧠 AI Manager
</strong>

<span>
Central workflow coordination active.

</span>

</div>


<div class="activity-item">

<strong>
🔐 Human Approval
</strong>

<span>
Sensitive actions remain under human control.

</span>

</div>


<div class="activity-item">

<strong>
💾 Local Database
</strong>

<span>
Client and project data are persisted locally.

</span>

</div>

</div>

</div>

</div>

</section>



<!-- ==========================================================
COMMAND CENTER
========================================================== -->

<section
id="command"
class="page">


<div class="command-box">

<h3>
🧠 NEXORA AI Command Center
</h3>

<p
style="
color:var(--muted);
font-size:13px;
margin:10px 0 18px;
">

Write an instruction for the NEXORA AI workflow.

</p>


<textarea
id="commandInput"
placeholder="Example: Analyze website modernization opportunities for companies in Germany..."></textarea>


<br><br>


<button
class="primary"
onclick="runCommand()">

Run AI Command

</button>


<div
id="commandOutput"
class="command-output">

</div>

</div>


<br>


<div class="card">

<h3>
Command History
</h3>

<div
id="commandHistory"
class="activity">

</div>

</div>

</section>



<!-- ==========================================================
CLIENTS
========================================================== -->

<section
id="clients"
class="page">


<div class="card">


<div class="card-head">

<h3>
Clients & Leads
</h3>


<button
class="primary"
onclick="openClientModal()">

+ Add Client

</button>

</div>


<div class="table-wrap">

<table>

<thead>

<tr>

<th>
CLIENT
</th>

<th>
COMPANY
</th>

<th>
COUNTRY
</th>

<th>
WEBSITE
</th>

<th>
SCORE
</th>

<th>
STATUS
</th>

<th>
ACTION
</th>

</tr>

</thead>


<tbody
id="clientsTable">

</tbody>

</table>

</div>

</div>

</section>



<!-- ==========================================================
PROJECTS
========================================================== -->

<section
id="projects"
class="page">


<div class="card-head">

<h3>
Projects
</h3>


<button
class="primary"
onclick="openProjectModal()">

+ New Project

</button>

</div>


<div
id="projectsGrid"
class="grid3">

</div>

</section>



<!-- ==========================================================
AI AGENTS
========================================================== -->

<section
id="agents"
class="page">

<div
id="agentsGrid"
class="agents">

</div>

</section>



<!-- ==========================================================
ACTIVITY
========================================================== -->

<section
id="activity"
class="page">

<div class="card">

<h3>
System Activity
</h3>

<div
id="fullActivity"
class="activity">

</div>

</div>

</section>



<!-- ==========================================================
SETTINGS
========================================================== -->

<section
id="settings"
class="page">


<div class="card">

<h3>
NEXORA Digital Settings
</h3>


<div class="form">

<div>

<label>
Company Name
</label>

<br><br>

<input
value="NEXORA Digital"
readonly>

</div>


<div>

<label>
Database
</label>

<br><br>

<input
value="nexora-db.json — Local Persistent Database"
readonly>

</div>


<div>

<label>
Phase
</label>

<br><br>

<input
value="Phase 2 — Command Center"
readonly>

</div>

</div>

</div>

</section>


</main>

</div>



<!-- ==========================================================
CLIENT MODAL
========================================================== -->

<div
id="clientModal"
class="modal">


<div class="modal-box">


<div class="modal-top">

<h2>
Add Client / Lead
</h2>


<button
class="close"
onclick="closeModal('clientModal')">

×

</button>

</div>


<form
class="form"
onsubmit="saveClient(event)">


<div class="form-row">

<input
id="clientName"
required
placeholder="Contact Name">


<input
id="clientCompany"
placeholder="Company Name">

</div>


<div class="form-row">

<input
id="clientEmail"
type="email"
placeholder="Email">


<input
id="clientPhone"
placeholder="Phone">

</div>


<div class="form-row">

<input
id="clientWebsite"
placeholder="Website">


<input
id="clientCountry"
value="Germany"
placeholder="Country">

</div>


<div class="form-row">

<input
id="clientIndustry"
placeholder="Industry">


<input
id="clientScore"
type="number"
min="0"
max="100"
value="50"
placeholder="Opportunity Score">

</div>


<select
id="clientStatus">

<option value="NEW">
NEW LEAD
</option>

<option value="CONTACTED">
CONTACTED
</option>

<option value="INTERESTED">
INTERESTED
</option>

<option value="CLIENT">
CLIENT
</option>

</select>


<textarea
id="clientOpportunity"
placeholder="Opportunity / Notes"></textarea>


<button
class="primary"
type="submit">

Save Client

</button>

</form>

</div>

</div>



<!-- ==========================================================
PROJECT MODAL
========================================================== -->

<div
id="projectModal"
class="modal">


<div class="modal-box">


<div class="modal-top">

<h2>
Create Project
</h2>


<button
class="close"
onclick="closeModal('projectModal')">

×

</button>

</div>


<form
class="form"
onsubmit="saveProject(event)">


<input
id="projectTitle"
required
placeholder="Project Title">


<input
id="projectClient"
placeholder="Client / Company">


<div class="form-row">

<select
id="projectService">

<option>
New Website
</option>

<option>
Website Redesign
</option>

<option>
AI Integration
</option>

<option>
Digital Automation
</option>

<option>
E-Commerce
</option>

</select>


<select
id="projectPriority">

<option>
NORMAL
</option>

<option>
HIGH
</option>

<option>
URGENT
</option>

</select>

</div>


<input
id="projectBudget"
placeholder="Budget / Quote">


<select
id="projectStatus">

<option value="PLANNING">
PLANNING
</option>

<option value="DESIGN">
DESIGN
</option>

<option value="WAITING_APPROVAL">
WAITING APPROVAL
</option>

<option value="IN_PROGRESS">
IN PROGRESS
</option>

<option value="QA">
QUALITY ASSURANCE
</option>

<option value="COMPLETED">
COMPLETED
</option>

</select>


<textarea
id="projectDescription"
placeholder="Project Description"></textarea>


<button
class="primary"
type="submit">

Create Project

</button>

</form>

</div>

</div>



<div
id="toast"
class="toast">

Saved successfully.

</div>



<script>

/* ============================================================
STATE
============================================================ */

let dashboardData = {};

let currentLanguage = "en";


/* ============================================================
API
============================================================ */

async function api(
url,
options = {}
) {

const response =
await fetch(
url,
{
headers: {
"Content-Type":
"application/json"
},
...options
}
);


const data =
await response.json();


if (!response.ok) {

throw new Error(
data.error ||
"Request failed."
);

}


return data;

}


/* ============================================================
LOAD DASHBOARD
============================================================ */

async function loadDashboard() {

try {

dashboardData =
await api(
"/api/dashboard"
);


document
.getElementById("totalClients")
.textContent =
dashboardData.totalClients;


document
.getElementById("totalProjects")
.textContent =
dashboardData.totalProjects;


document
.getElementById("activeProjects")
.textContent =
dashboardData.activeProjects;


document
.getElementById("completedProjects")
.textContent =
dashboardData.completedProjects;


document
.getElementById("onlineAgents")
.textContent =
dashboardData.onlineAgents;


document
.getElementById("commandCount")
.textContent =
dashboardData.commands;


renderActivity();

renderClients();

renderProjects();

renderAgents();

renderCommandHistory();

} catch(error) {

console.error(error);

toast(
"Could not load dashboard."
);

}

}


/* ============================================================
ACTIVITY
============================================================ */

function formatTime(time) {

const date =
new Date(time);


return date.toLocaleString();

}


function renderActivity() {

const dashboard =
document
.getElementById(
"dashboardActivity"
);


const full =
document
.getElementById(
"fullActivity"
);


const html =
dashboardData.activities
.length

? dashboardData.activities
.map(
activity => \`

<div class="activity-item">

<strong>
\${escapeHTML(
activity.message
)}
</strong>

<span>
\${formatTime(
activity.time
)}
</span>

</div>

\`
)
.join("")

:

\`

<div class="empty">

No activity yet.

</div>

\`;


dashboard.innerHTML =
html;


full.innerHTML =
html;

}


/* ============================================================
CLIENTS
============================================================ */

function getStatusClass(status) {

if (
status === "CLIENT" ||
status === "COMPLETED"
) {
return "green";
}


if (
status === "NEW" ||
status === "PLANNING"
) {
return "yellow";
}


if (
status === "URGENT"
) {
return "red";
}


return "";

}


function renderClients() {

const table =
document
.getElementById(
"clientsTable"
);


if (
!dashboardData.clients ||
dashboardData.clients.length === 0
) {

table.innerHTML =

\`

<tr>

<td
colspan="7"
class="empty">

No clients yet.
Add your first lead.

</td>

</tr>

\`;

return;

}


table.innerHTML =
dashboardData.clients
.map(
client => \`

<tr>

<td>

<strong>
\${escapeHTML(
client.name
)}
</strong>

<small>
\${escapeHTML(
client.email || ""
)}
</small>

</td>


<td>

\${escapeHTML(
client.company || "-"
)}

</td>


<td>

\${escapeHTML(
client.country || "-"
)}

</td>


<td>

\${escapeHTML(
client.website || "-"
)}

</td>


<td>

\${escapeHTML(
String(client.score || 0)
)}/100

</td>


<td>

<span
class="badge
\${getStatusClass(
client.status
)}">

\${escapeHTML(
client.status
)}

</span>

</td>


<td>

<button
class="icon-btn"
onclick="createProjectFromClient('\${client.id}')">

Create Project

</button>


<button
class="icon-btn"
onclick="deleteClient('\${client.id}')">

Delete

</button>

</td>

</tr>

\`
)
.join("");

}


/* ============================================================
SAVE CLIENT
============================================================ */

async function saveClient(event) {

event.preventDefault();


const client = {

name:
document
.getElementById("clientName")
.value,

company:
document
.getElementById("clientCompany")
.value,

email:
document
.getElementById("clientEmail")
.value,

phone:
document
.getElementById("clientPhone")
.value,

website:
document
.getElementById("clientWebsite")
.value,

country:
document
.getElementById("clientCountry")
.value,

industry:
document
.getElementById("clientIndustry")
.value,

score:
document
.getElementById("clientScore")
.value,

status:
document
.getElementById("clientStatus")
.value,

opportunity:
document
.getElementById("clientOpportunity")
.value

};


try {

await api(
"/api/clients",
{
method:"POST",
body:
JSON.stringify(client)
}
);


closeModal(
"clientModal"
);


event.target.reset();


toast(
"Client saved successfully."
);


loadDashboard();

} catch(error) {

toast(
error.message
);

}

}


/* ============================================================
DELETE CLIENT
============================================================ */

async function deleteClient(id) {

if (
!confirm(
"Delete this client?"
)
) {
return;
}


await api(
"/api/clients/" + id,
{
method:"DELETE"
}
);


toast(
"Client deleted."
);


loadDashboard();

}


/* ============================================================
PROJECTS
============================================================ */

function renderProjects() {

const container =
document
.getElementById(
"projectsGrid"
);


if (
!dashboardData.projects ||
dashboardData.projects.length === 0
) {

container.innerHTML =

\`

<div class="card empty">

No projects yet.

</div>

\`;

return;

}


container.innerHTML =
dashboardData.projects
.map(
project => \`

<div class="project-card">

<span
class="badge
\${getStatusClass(
project.status
)}">

\${escapeHTML(
project.status
)}

</span>


<h3
style="margin-top:12px;">

\${escapeHTML(
project.title
)}

</h3>


<div class="project-meta">

<strong>
Client:
</strong>

\${escapeHTML(
project.client || "-"
)}

<br>

<strong>
Service:
</strong>

\${escapeHTML(
project.service
)}

<br>

<strong>
Budget:
</strong>

\${escapeHTML(
project.budget || "-"
)}

<br>

<strong>
Priority:
</strong>

\${escapeHTML(
project.priority
)}

</div>


<div class="project-actions">

<select
onchange="updateProjectStatus('\${project.id}',this.value)">

<option value="PLANNING"
\${project.status==="PLANNING"?"selected":""}>

PLANNING

</option>


<option value="DESIGN"
\${project.status==="DESIGN"?"selected":""}>

DESIGN

</option>


<option value="WAITING_APPROVAL"
\${project.status==="WAITING_APPROVAL"?"selected":""}>

WAITING APPROVAL

</option>


<option value="IN_PROGRESS"
\${project.status==="IN_PROGRESS"?"selected":""}>

IN PROGRESS

</option>


<option value="QA"
\${project.status==="QA"?"selected":""}>

QA

</option>


<option value="COMPLETED"
\${project.status==="COMPLETED"?"selected":""}>

COMPLETED

</option>

</select>


<button
class="icon-btn"
onclick="deleteProject('\${project.id}')">

Delete

</button>

</div>

</div>

\`
)
.join("");

}


async function saveProject(event) {

event.preventDefault();


const project = {

title:
document
.getElementById("projectTitle")
.value,

client:
document
.getElementById("projectClient")
.value,

service:
document
.getElementById("projectService")
.value,

priority:
document
.getElementById("projectPriority")
.value,

budget:
document
.getElementById("projectBudget")
.value,

status:
document
.getElementById("projectStatus")
.value,

description:
document
.getElementById("projectDescription")
.value

};


try {

await api(
"/api/projects",
{
method:"POST",
body:
JSON.stringify(project)
}
);


closeModal(
"projectModal"
);


event.target.reset();


toast(
"Project created successfully."
);


loadDashboard();

} catch(error) {

toast(
error.message
);

}

}


async function updateProjectStatus(
id,
status
) {

await api(
"/api/projects/" + id,
{
method:"PUT",
body:
JSON.stringify({
status
})
}
);


toast(
"Project status updated."
);


loadDashboard();

}


async function deleteProject(id) {

if (
!confirm(
"Delete this project?"
)
) {
return;
}


await api(
"/api/projects/" + id,
{
method:"DELETE"
}
);


toast(
"Project deleted."
);


loadDashboard();

}


/* ============================================================
CREATE PROJECT FROM CLIENT
============================================================ */

function createProjectFromClient(id) {

const client =
dashboardData.clients.find(
item => item.id === id
);


if (!client) {
return;
}


openProjectModal();


document
.getElementById("projectClient")
.value =
client.company ||
client.name;


document
.getElementById("projectTitle")
.value =
"Digital Project — " +
(
client.company ||
client.name
);

}


/* ============================================================
AI AGENTS
============================================================ */

function renderAgents() {

const container =
document
.getElementById(
"agentsGrid"
);


container.innerHTML =
dashboardData.agents
.map(
agent => \`

<div class="agent">

<div class="agent-top">

<div class="agent-icon">

\${agent.icon}

</div>


<span
class="status
\${agent.enabled
? "online"
: "offline"}">

\${agent.status}

</span>

</div>


<h3>

\${escapeHTML(
agent.name
)}

</h3>


<p>

\${escapeHTML(
agent.role
)}

</p>


<button
onclick="toggleAgent('\${agent.id}')">

\${agent.enabled
? "Disable Agent"
: "Enable Agent"}

</button>

</div>

\`
)
.join("");

}


async function toggleAgent(id) {

await api(
"/api/agents/" +
id +
"/toggle",
{
method:"POST"
}
);


toast(
"Agent status updated."
);


loadDashboard();

}


/* ============================================================
AI COMMAND
============================================================ */

async function runCommand() {

const input =
document
.getElementById(
"commandInput"
);


const command =
input.value.trim();


if (!command) {

toast(
"Write a command first."
);

return;

}


const output =
document
.getElementById(
"commandOutput"
);


output.innerHTML =

\`

<div class="command-result">

🧠 NEXORA AI Manager is processing...

</div>

\`;


try {

const result =
await api(
"/api/command",
{
method:"POST",
body:
JSON.stringify({
command
})
}
);


output.innerHTML =

\`

<div class="command-result">

<strong>

Agent:
\${escapeHTML(
result.agent
)}

</strong>

<br><br>

\${result.result
.map(
item =>
"✓ " +
escapeHTML(item)
)
.join("<br>")}

</div>

\`;


input.value = "";


loadDashboard();


} catch(error) {

output.innerHTML =

\`

<div class="command-result">

Error:
\${escapeHTML(
error.message
)}

</div>

\`;

}

}


/* ============================================================
COMMAND HISTORY
============================================================ */

function renderCommandHistory() {

const container =
document
.getElementById(
"commandHistory"
);


if (
!dashboardData.commandsHistory ||
dashboardData.commandsHistory.length === 0
) {

container.innerHTML =

\`

<div class="empty">

No commands yet.

</div>

\`;

return;

}


container.innerHTML =
dashboardData.commandsHistory
.map(
command => \`

<div class="activity-item">

<strong>

🧠
\${escapeHTML(
command.command
)}

</strong>

<span>

\${escapeHTML(
command.agent
)}

•

\${formatTime(
command.createdAt
)}

</span>

</div>

\`
)
.join("");

}


/* ============================================================
NAVIGATION
============================================================ */

function showPage(
id,
button
) {

document
.querySelectorAll(".page")
.forEach(
page =>
page.classList.remove("active")
);


document
.getElementById(id)
.classList.add("active");


document
.querySelectorAll(".nav button")
.forEach(
btn =>
btn.classList.remove("active")
);


if (button) {

button.classList.add("active");

}


const titles = {

dashboard:
"Command Center",

command:
"AI Command Center",

clients:
"Clients & Leads",

projects:
"Projects",

agents:
"AI Agents",

activity:
"System Activity",

settings:
"Settings"

};


document
.getElementById("pageTitle")
.textContent =
titles[id] ||
"NEXORA";

}


/* ============================================================
MODALS
============================================================ */

function openClientModal() {

document
.getElementById(
"clientModal"
)
.classList.add(
"active"
);

}


function openProjectModal() {

document
.getElementById(
"projectModal"
)
.classList.add(
"active"
);

}


function closeModal(id) {

document
.getElementById(id)
.classList.remove(
"active"
);

}


/* ============================================================
LANGUAGE BUTTON
Basic EN / DE interface toggle
============================================================ */

function toggleLanguage() {

currentLanguage =
currentLanguage === "en"
? "de"
: "en";


document
.getElementById(
"languageButton"
)
.textContent =
currentLanguage === "en"
? "DE"
: "EN";


toast(
currentLanguage === "de"
? "Deutsche Sprache aktiviert."
: "English language activated."
);

}


/* ============================================================
TOAST
============================================================ */

function toast(message) {

const element =
document
.getElementById(
"toast"
);


element.textContent =
message;


element.classList.add(
"show"
);


setTimeout(
() => {

element.classList.remove(
"show"
);

},
3000
);

}


/* ============================================================
SECURITY
============================================================ */

function escapeHTML(value) {

return String(value)
.replace(
/&/g,
"&amp;"
)
.replace(
/</g,
"&lt;"
)
.replace(
/>/g,
"&gt;"
)
.replace(
/"/g,
"&quot;"
)
.replace(
/'/g,
"&#039;"
);

}


/* ============================================================
START
============================================================ */

loadDashboard();


setInterval(
loadDashboard,
30000
);

</script>


</body>

</html>
`;


/* ============================================================
   SERVER
============================================================ */

const server =
http.createServer(
async (
request,
response
) => {

const url =
new URL(
request.url,
`http://${request.headers.host}`
);


const pathname =
url.pathname;


if (
pathname.startsWith("/api/")
) {

return handleAPI(
request,
response,
pathname
);

}


if (
request.method === "GET" &&
pathname === "/"
) {

return sendHTML(
response,
HTML
);

}


response.writeHead(
404,
{
"Content-Type":
"text/plain"
}
);


response.end(
"404 — Page not found."
);

}
);


/* ============================================================
   START SERVER
============================================================ */

server.listen(
PORT,
() => {

console.log("");

console.log(
"=========================================="
);

console.log(
"NEXORA DIGITAL — COMMAND CENTER"
);

console.log(
"=========================================="
);

console.log(
"Server running:"
);

console.log(
"http://localhost:" +
PORT
);

console.log("");

console.log(
"Database:"
);

console.log(
DB_FILE
);

console.log("");

}
); 
