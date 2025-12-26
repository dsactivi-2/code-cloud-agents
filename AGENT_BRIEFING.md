# 🎯 MULTI-AGENT BRIEFING - Optimizecodecloudagents

**Datum:** 2025-12-26
**Projekt:** Code Cloud Agents (Supervised AI System)
**Mission:** Parallele Implementierung von Features und Integrationen

---

## 📍 PROJEKT-INFORMATIONEN

### System
```
Server: Lokaler Mac (macOS Darwin 24.6.0)
Hauptverzeichnis: ~/activi-dev-repos/Optimizecodecloudagents/
Git Remote: https://github.com/dsactivi-2/Optimizecodecloudagents.git
Branch: main (derzeit clean)
Node Version: >=20.0.0
```

### Tech Stack
```
Frontend: React + Vite + TypeScript + shadcn/ui + Tailwind
Backend: Node.js + Express + TypeScript
Database: SQLite (data/app.sqlite)
Tests: Node Test Runner
Package Manager: npm
```

### Architektur
```
META_SUPERVISOR (Routing + Monitoring)
    ↓
ENGINEERING_LEAD_SUPERVISOR (Plan + Verify + STOP)
    ↓
CLOUD_ASSISTANT (Execute + Evidence)
```

---

## 🚨 KRITISCHE REGELN (ALLE AGENTEN)

### ⚠️ VERBOTEN
1. **NIEMALS** direkt auf `main` committen ohne Absprache
2. **NIEMALS** fremde Agent-Dateien ändern (siehe Datei-Zuordnung unten)
3. **NIEMALS** `.env` committen (ist in .gitignore)
4. **NIEMALS** Secrets im Code hardcoden
5. **NIEMALS** npm packages installieren ohne Absprache

### ✅ PFLICHT
1. **IMMER** Feature Branch verwenden (agent-aX-*)
2. **IMMER** vor Start: `git pull origin main`
3. **IMMER** nach Task: commit mit klarer Message
4. **IMMER** Tests laufen lassen vor Push
5. **IMMER** Status in Todo-Liste updaten

### 📋 Coding Standards
```
- TypeScript strict mode (keine any)
- JSDoc für alle Funktionen
- Namenskonventionen: camelCase (vars), PascalCase (components), SCREAMING_SNAKE_CASE (constants)
- DRY-Prinzip, Single Responsibility
- Error-Handling für alle async Operations
- Input-Validierung Frontend + Backend
```

---

## 🤖 AGENT A1 - Dokumentation & Standards

### Branch
```bash
git checkout -b agent-a1-docs
```

### Tasks
- [1] Token-Spar-Auditor Prompt in .cursorrules integrieren
- [2] Token-Spar-Auditor Prompt in CLAUDE.md integrieren

### Dateien (NUR diese anfassen!)
```
✅ ERLAUBT:
- .cursorrules
- CLAUDE.md
- docs/*.md (neue Dateien)

❌ VERBOTEN:
- src/* (Code)
- package.json
- .env
```

### Deliverables
1. `.cursorrules` mit Token-Spar-Auditor Sektion (am Ende anfügen)
2. `CLAUDE.md` mit Token-Spar-Auditor Sektion (am Ende anfügen)
3. Commit: "docs: add token-optimization auditor prompt"

### Zeitaufwand
~15 Minuten

---

## 🤖 AGENT A2 - Setup & Infrastructure

### Branch
```bash
git checkout -b agent-a2-setup
```

### Tasks
- [3] .env aus .env.example erstellen (PRIO 1)
- [4] data/ Ordner für SQLite DB erstellen (PRIO 1)
- [5] API Keys in .env setzen (PRIO 1)
- [10] Tests ausführen npm test (PRIO 2)
- [11] Backend testen npm run backend:dev (PRIO 2)
- [12] Frontend testen npm run dev (PRIO 2)

### Dateien (NUR diese anfassen!)
```
✅ ERLAUBT:
- .env (erstellen, NICHT committen!)
- data/ (Ordner erstellen)
- tests/* (nur lesen/ausführen)

❌ VERBOTEN:
- src/* (Code-Änderungen)
- .cursorrules, CLAUDE.md
- package.json
```

### Schritt-für-Schritt Anleitung

#### 1. .env erstellen
```bash
cd ~/activi-dev-repos/Optimizecodecloudagents
cp .env.example .env
```

Fülle aus:
```bash
# Server
PORT=3000
NODE_ENV=development

# Database
SQLITE_PATH=./data/app.sqlite

# Queue
REDIS_URL=redis://localhost:6379
QUEUE_ENABLED=false

# Integrations (alle auf false lassen!)
WHATSAPP_ENABLED=false
VOICE_ENABLED=false
GOOGLE_ENABLED=false
ICLOUD_ENABLED=false
PINECONE_ENABLED=false

# Supervisor
STOP_SCORE_THRESHOLD=40
MAX_PARALLEL_AGENTS=4
```

#### 2. data/ Ordner erstellen
```bash
mkdir -p data
touch data/.gitkeep
```

#### 3. Tests ausführen
```bash
npm test 2>&1 | tee test-results.log
```

#### 4. Backend testen
```bash
# Terminal 1
npm run backend:dev 2>&1 | tee backend-test.log
# Warte bis "Server running on port 3000"
# CTRL+C nach Verifikation
```

#### 5. Frontend testen
```bash
# Terminal 2
npm run dev 2>&1 | tee frontend-test.log
# Öffne Browser: http://localhost:5173
# Prüfe ob UI lädt
# CTRL+C nach Verifikation
```

### Deliverables
1. `.env` Datei (lokal, NICHT in Git!)
2. `data/` Ordner (mit .gitkeep im Git)
3. `test-results.log` (Beweis dass Tests laufen)
4. `backend-test.log` (Beweis dass Backend startet)
5. `frontend-test.log` (Beweis dass Frontend lädt)
6. Commit: "setup: initialize .env and data directory"

### Zeitaufwand
~30 Minuten

### ⚠️ Hinweis für A2
Falls Tests/Backend/Frontend FEHLER werfen:
- Dokumentiere Fehler genau (Error Message, Stack Trace)
- Erstelle `SETUP_ISSUES.md` mit Fehlerliste
- Committe das auch
- STOPPE und warte auf Koordination

---

## 🤖 AGENT A3 - External Integrations

### Branch
```bash
git checkout -b agent-a3-integrations
```

### Tasks
- [6] Slack/GitHub/Linear Integration (PRIO 1)
- [7] WhatsApp Integration implementieren (PRIO 2)
- [8] Voice Integration implementieren (PRIO 2)
- [9] Google Integration implementieren (PRIO 2)
- [13] iCloud Integration implementieren (PRIO 3)

### Dateien (NUR diese anfassen!)
```
✅ ERLAUBT:
- src/integrations/slack/ (erstellen)
- src/integrations/github/ (erstellen)
- src/integrations/linear/ (erstellen)
- src/integrations/whatsapp/client.ts (anpassen)
- src/integrations/voice/client.ts (anpassen)
- src/integrations/google/client.ts (anpassen)
- src/integrations/icloud/client.ts (anpassen)
- src/api/* (neue API Routes für Integrationen)
- .env.example (ENV-Variablen ergänzen)

❌ VERBOTEN:
- src/supervisor/* (Supervisor-Code)
- src/meta/* (Meta-Code)
- src/assistant/* (Assistant-Code)
- docs/* (Doku)
- .cursorrules, CLAUDE.md
```

### Schritt-für-Schritt Anleitung

#### Phase 1: Slack/GitHub/Linear (PRIO 1)

**1. Struktur erstellen**
```bash
mkdir -p src/integrations/slack
mkdir -p src/integrations/github
mkdir -p src/integrations/linear
```

**2. Slack Client**
Erstelle `src/integrations/slack/client.ts`:
```typescript
/**
 * Slack Integration Client
 */

export interface SlackConfig {
  token: string;
  webhookUrl?: string;
}

export interface SlackMessage {
  channel: string;
  text: string;
  attachments?: unknown[];
}

export interface SlackClient {
  isEnabled(): boolean;
  sendMessage(message: SlackMessage): Promise<{ success: boolean; error?: string }>;
  getStatus(): Promise<{ connected: boolean; error?: string }>;
}

export function createSlackClient(config?: SlackConfig): SlackClient {
  const enabled = process.env.SLACK_ENABLED === "true";

  return {
    isEnabled(): boolean {
      return enabled;
    },

    async sendMessage(_message: SlackMessage): Promise<{ success: boolean; error?: string }> {
      if (!enabled) {
        return { success: false, error: "Slack integration disabled" };
      }

      // TODO: Implement actual Slack API call
      console.warn("Slack sendMessage not yet implemented");
      return { success: false, error: "Not implemented" };
    },

    async getStatus(): Promise<{ connected: boolean; error?: string }> {
      if (!enabled) {
        return { connected: false, error: "Slack integration disabled" };
      }
      return { connected: false, error: "Not implemented" };
    }
  };
}
```

**3. GitHub Client**
Erstelle `src/integrations/github/client.ts` (ähnliche Struktur wie Slack)

**4. Linear Client**
Erstelle `src/integrations/linear/client.ts` (ähnliche Struktur wie Slack)

**5. Exports aktualisieren**
In `src/integrations/index.ts` ergänzen:
```typescript
export { createSlackClient, type SlackClient, type SlackMessage } from "./slack/client.js";
export { createGitHubClient, type GitHubClient } from "./github/client.js";
export { createLinearClient, type LinearClient } from "./linear/client.js";
```

**6. .env.example ergänzen**
```bash
# Slack
SLACK_ENABLED=false
SLACK_TOKEN=
SLACK_WEBHOOK_URL=

# GitHub
GITHUB_ENABLED=false
GITHUB_TOKEN=
GITHUB_ORG=

# Linear
LINEAR_ENABLED=false
LINEAR_API_KEY=
LINEAR_TEAM_ID=
```

#### Phase 2: Bestehende Stubs verbessern (PRIO 2)

**WhatsApp, Voice, Google, iCloud:**
- Aktuellen Stub-Code durchlesen
- Strukturell verbessern (aber STUB bleiben lassen)
- JSDoc ergänzen
- Error-Handling verbessern

### Deliverables
1. Neue Integration Clients (Slack, GitHub, Linear)
2. Verbesserte bestehende Stubs (WhatsApp, Voice, Google, iCloud)
3. Aktualisierte `.env.example`
4. Aktualisierte `src/integrations/index.ts`
5. Commits:
   - "feat: add slack/github/linear integration stubs"
   - "refactor: improve whatsapp/voice integration structure"
   - "refactor: improve google/icloud integration structure"

### Zeitaufwand
~2-3 Stunden

### ⚠️ Wichtig für A3
- Implementiere NUR Stubs (keine echte API-Anbindung)
- Alle Integrationen bleiben ENABLED=false
- Struktur und Interfaces sind wichtig, nicht Funktionalität

---

## 🤖 AGENT A4 - Advanced Features & Documentation

### Branch
```bash
git checkout -b agent-a4-advanced
```

### Tasks
- [14] MCP Server Integration (PRIO 3)
- [15] API Endpoints dokumentieren (PRIO 4)
- [16] Deployment Guide erstellen (PRIO 4)

### Dateien (NUR diese anfassen!)
```
✅ ERLAUBT:
- docs/api/ (erstellen)
- docs/deployment/ (erstellen)
- docs/mcp/ (erstellen)
- .mcp/ (MCP Config erstellen)
- README.md (API-Doku-Links ergänzen)

❌ VERBOTEN:
- src/* (Code)
- .cursorrules, CLAUDE.md (das macht A1)
- .env
```

### Schritt-für-Schritt Anleitung

#### 1. API Endpoints dokumentieren

Erstelle `docs/api/README.md`:
```markdown
# API Documentation

## Health Endpoints

### GET /health
Returns system health status.

**Response:**
\`\`\`json
{
  "status": "healthy",
  "database": { "connected": true },
  "queue": { "connected": true, "mode": "memory" }
}
\`\`\`

## Task Endpoints

### POST /api/tasks
Submit a new task for execution.

... (alle Endpoints aus src/api/ dokumentieren)
```

#### 2. Deployment Guide

Erstelle `docs/deployment/GUIDE.md`:
```markdown
# Deployment Guide

## Prerequisites
- Node.js >= 20.0.0
- npm >= 9.0.0
- Git

## Local Development
1. Clone repository
2. Create .env from .env.example
3. Run `npm install`
4. Run `npm run dev`

## Production Deployment
... (detaillierte Schritte)
```

#### 3. MCP Server Integration

Recherchiere MCP (Model Context Protocol) und erstelle:
- `docs/mcp/OVERVIEW.md` (Was ist MCP?)
- `.mcp/config.json` (MCP Config Template)

### Deliverables
1. Komplette API-Dokumentation
2. Deployment Guide
3. MCP Integration Plan
4. Commit: "docs: add api documentation and deployment guide"

### Zeitaufwand
~1-2 Stunden

---

## 🔄 KOORDINATIONS-WORKFLOW

### Start (Alle Agenten parallel)
```bash
# Alle: Aktuellsten Stand holen
cd ~/activi-dev-repos/Optimizecodecloudagents
git checkout main
git pull origin main

# Jeder Agent: Eigenen Branch erstellen
git checkout -b agent-aX-NAME
```

### Während der Arbeit
- Jeder Agent arbeitet UNABHÄNGIG
- KEINE gemeinsamen Dateien ändern (siehe Datei-Zuordnung oben)
- Bei Problemen: Dokumentieren in `AGENT_AX_ISSUES.md`

### Nach Task-Abschluss
```bash
# Jeder Agent: Eigene Änderungen committen
git add .
git commit -m "TYPE: description"
git push -u origin agent-aX-NAME
```

### Merge-Reihenfolge (WICHTIG!)
```
1. A2 (Setup) → main mergen
2. A1 (Docs) → main mergen
3. A3 (Integrations) → main mergen
4. A4 (Advanced) → main mergen
```

**Grund:** Setup muss zuerst, damit andere Agents .env haben.

---

## 📊 STATUS-REPORTING

### Jeder Agent erstellt am Ende:
`AGENT_AX_REPORT.md`:
```markdown
# Agent AX Report

**Agent:** AX
**Datum:** 2025-12-26
**Branch:** agent-aX-NAME

## Erledigte Tasks
- [x] Task 1
- [x] Task 2

## Probleme
- Problem 1: Beschreibung
- Problem 2: Beschreibung

## Dateien geändert
- Datei1
- Datei2

## Test-Ergebnisse
- Tests: [PASS/FAIL]
- Logs: Siehe `test-results.log`

## Nächste Schritte
- [ ] Merge Request erstellen
- [ ] Code Review anfordern
```

---

## 🆘 NOTFALL-KONTAKT

Falls kritische Probleme:
1. STOPPE sofort
2. Erstelle `BLOCKER_AX.md` mit Problem-Beschreibung
3. Committe das
4. Warte auf Koordination

**Kritische Probleme:**
- Git-Konflikte
- Fehlende Dependencies
- Build/Test-Fehler die du nicht lösen kannst
- Unklare Requirements

---

## ✅ FINAL CHECKLIST (Jeder Agent vor Push)

- [ ] Code kompiliert (TypeScript)
- [ ] Tests laufen (falls relevant)
- [ ] Keine Secrets im Code
- [ ] .env NICHT committed
- [ ] JSDoc vorhanden
- [ ] Commit Message klar
- [ ] Branch gepusht
- [ ] Report erstellt

---

**VIEL ERFOLG, TEAM! 🚀**
