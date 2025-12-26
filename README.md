# 🤖 Code Cloud Agents

**Supervised AI System with Engineering Lead Supervisor and Cloud Assistant**

Ein intelligentes Supervisor-System, das AI-Agenten überwacht, Risiken bewertet und bei kritischen Entscheidungen automatisch eingreift.

---

## 📋 Inhaltsverzeichnis

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Architektur](#-architektur)
- [Dokumentation](#-dokumentation)
- [API Endpoints](#-api-endpoints)
- [Entwicklung](#-entwicklung)
- [Deployment](#-deployment)
- [Lizenz](#-lizenz)

---

## ✨ Features

### Core Features
- **🎯 STOP-Score System**: Automatische Risikobewertung (0-100) basierend auf verschiedenen Faktoren
- **🛡️ Enforcement Gate**: HARD STOP bei kritischen Entscheidungen (Score ≥ 70)
- **👨‍💼 Engineering Lead Supervisor**: Meta-Supervisor für Planung, Delegation und Verifikation
- **☁️ Cloud Assistant**: Ausführender Agent mit Evidence-Based Reporting
- **📊 Task Management**: Vollständiges Task-Tracking mit Status, Logs und Audit-Trail
- **🔍 Audit Log**: Lückenlose Dokumentation aller Agent-Aktionen
- **📈 Dashboard**: React-basierte UI für Monitoring und Management

### Integrations
- **Demo Invite System**: User-Onboarding mit Invite-Codes und Usage-Limits
- **SQLite Database**: Leichtgewichtige, lokale Datenpersistenz
- **Queue System**: Redis (production) oder In-Memory (development)
- **REST API**: Vollständige HTTP API für alle Operationen

---

## 🚀 Quick Start

### Voraussetzungen

- **Node.js**: ≥20.0.0
- **npm**: ≥10.0.0
- **Git**: Für Versionskontrolle

### Installation

```bash
# Repository klonen
git clone <REPOSITORY_URL>
cd Optimizecodecloudagents

# Dependencies installieren
npm install

# Environment-Variablen konfigurieren
cp .env.example .env
# .env editieren und Werte anpassen

# Data-Verzeichnis erstellen
mkdir -p data
```

### Development

```bash
# Backend starten (Development Mode)
npm run backend:dev

# Frontend starten (Development Mode - separates Terminal)
npm run dev

# Tests ausführen
npm test
```

### Production Build

```bash
# Frontend build
npm run build

# Backend build
npm run backend:build

# Backend starten
npm run backend:start
```

Server läuft auf: **http://localhost:3000**

---

## 🏗️ Architektur

### System-Komponenten

```
┌──────────────────────────────────────────────────────────┐
│          ENGINEERING_LEAD_SUPERVISOR                     │
│  (Planung, Delegation, Review, STOP-Decision)            │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ├──→ Plan erstellen
                 ├──→ Tasks an Cloud Assistant delegieren
                 ├──→ Evidence verifizieren
                 └──→ STOP-Score bewerten

┌──────────────────────────────────────────────────────────┐
│             CLOUD_ASSISTANT                              │
│     (Task-Execution, Evidence-Collection)                │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ├──→ Tasks ausführen
                 ├──→ Logs sammeln
                 └──→ Evidence bereitstellen

┌──────────────────────────────────────────────────────────┐
│             ENFORCEMENT_GATE                             │
│  (HARD STOP bei STOP_SCORE ≥ 70)                        │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ├──→ Score berechnen
                 ├──→ STOP erzwingen
                 └──→ Human Review anfordern
```

### Tech Stack

**Backend:**
- Node.js v20+
- TypeScript
- Express.js
- SQLite (better-sqlite3)
- Redis (optional)

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components

---

## 📚 Dokumentation

Vollständige Dokumentation in `docs/`:

- **[Developer Guide](docs/DEVELOPER_GUIDE.md)**: Setup, Entwicklung, Testing
- **[Architecture](docs/ARCHITECTURE.md)**: System-Design, Datenmodelle, Flows
- **[Contributing](docs/CONTRIBUTING.md)**: Contribution-Guidelines, Code-Standards

---

## 🔌 API Endpoints

### Health & Info

```bash
GET  /api           # API Info
GET  /health        # Health Check
```

### Tasks

```bash
POST /api/tasks     # Create Task
GET  /api/tasks     # List Tasks
GET  /api/tasks/:id # Get Task Details
```

### Audit Log

```bash
GET  /api/audit     # List Audit Entries
GET  /api/audit/:id # Get Audit Entry Details
```

### Enforcement

```bash
GET  /api/enforcement/blocked  # List Blocked Tasks (STOP-Score ≥ 70)
POST /api/enforcement/approve  # Human Approval
POST /api/enforcement/reject   # Human Rejection
```

### Demo System

```bash
POST /api/demo/invites        # Create Invite (Admin)
POST /api/demo/redeem         # Redeem Invite
GET  /api/demo/stats          # Demo Statistics
GET  /api/demo/users/:id      # User Usage Stats
```

Detaillierte API-Dokumentation: **[API Docs](docs/API.md)** (coming soon)

---

## 💻 Entwicklung

### Project Structure

```
Optimizecodecloudagents/
├── src/
│   ├── index.ts              # Backend Entry Point
│   ├── api/                  # REST API Routes
│   │   ├── health.ts
│   │   ├── tasks.ts
│   │   ├── audit.ts
│   │   ├── enforcement.ts
│   │   └── demo.ts
│   ├── audit/                # Audit & Enforcement
│   │   ├── enforcementGate.ts
│   │   └── stopScorer.ts
│   ├── db/                   # Database Layer
│   │   └── database.ts
│   ├── queue/                # Queue System
│   │   └── queue.ts
│   ├── demo/                 # Demo Invite System
│   │   ├── inviteManager.ts
│   │   └── types.ts
│   ├── components/           # React Components
│   ├── App.tsx               # Frontend Entry Point
│   └── main.tsx              # Vite Entry
├── data/                     # SQLite Database
├── logs/                     # PM2 Logs
├── docs/                     # Documentation
├── package.json
├── tsconfig.json
├── vite.config.ts
└── ecosystem.config.cjs      # PM2 Config
```

### Environment Variables

Siehe `.env.example` für vollständige Konfiguration:

```bash
# Server
PORT=3000
NODE_ENV=development

# Database
SQLITE_PATH=./data/app.sqlite

# Queue
REDIS_URL=redis://localhost:6379
QUEUE_ENABLED=false

# Supervisor
STOP_SCORE_THRESHOLD=70
MAX_PARALLEL_AGENTS=4
```

### Coding Standards

- **TypeScript Strict Mode**: Keine `any` Types
- **JSDoc**: Alle Funktionen dokumentieren
- **Namenskonventionen**:
  - camelCase: Variablen
  - PascalCase: Komponenten/Klassen
  - SCREAMING_SNAKE_CASE: Konstanten
- **Error Handling**: try/catch für alle async Operationen
- **Testing**: Jest-basierte Tests für alle Features

Details: **[Contributing Guide](docs/CONTRIBUTING.md)**

---

## 🚀 Deployment

### Production Server

**Server:** 178.156.178.70
**User:** root
**Path:** /root/cloud-agents
**Process Manager:** PM2

### Deployment Steps

```bash
# 1. SSH to server
ssh root@178.156.178.70

# 2. Navigate to project
cd /root/cloud-agents

# 3. Pull latest changes
git pull origin main

# 4. Install dependencies
npm ci

# 5. Build
npm run backend:build

# 6. Restart PM2
pm2 restart cloud-agents-backend

# 7. Check logs
pm2 logs cloud-agents-backend

# 8. Health check
curl http://localhost:3000/health
```

Detaillierte Deployment-Docs: **[GIT_UND_DEPLOYMENT_ANWEISUNGEN.md](docs/DEPLOYMENT.md)**

---

## 🧪 Testing

```bash
# All tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

---

## 🔐 Security

- **Input Validation**: Zod-Schema-Validierung auf allen Endpoints
- **Rate Limiting**: Express-Rate-Limiter auf kritischen Endpoints
- **STOP-Score**: Automatisches Blocking bei kritischen Operationen
- **Audit Log**: Lückenlose Dokumentation aller Aktionen
- **Environment Variables**: Keine Secrets im Code

Siehe auch: **[Security Guide](docs/SECURITY.md)** (coming soon)

---

## 📦 Dependencies

### Production
- `express`: Web Framework
- `better-sqlite3`: SQLite Database
- `zod`: Schema Validation
- `react`: Frontend Framework
- `@radix-ui/*`: UI Components

### Development
- `typescript`: Type Safety
- `vite`: Build Tool
- `tsx`: TypeScript Runtime
- `tailwindcss`: Styling

Vollständige Liste: `package.json`

---

## 🤝 Contributing

Contributions sind willkommen! Bitte lies zuerst den **[Contributing Guide](docs/CONTRIBUTING.md)**.

### Quick Contribution Flow

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m "feat: add amazing feature"`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📄 Lizenz

**Proprietär - Step2Job GmbH**

---

## 📞 Support

- **Issues**: GitHub Issues
- **Docs**: `docs/` Verzeichnis
- **Email**: [support@step2job.de](mailto:support@step2job.de)

---

## 🎯 Roadmap

- [ ] OpenAPI/Swagger Documentation
- [ ] Postman Collection
- [ ] WebSocket Real-time Updates
- [ ] Integration APIs (GitHub, Slack, Linear)
- [ ] Multi-Provider AI Support
- [ ] Memory System
- [ ] Authentication & User Management

---

**Erstellt:** 2025-12-26
**Version:** 0.1.0

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
