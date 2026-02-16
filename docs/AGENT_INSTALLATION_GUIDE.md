# 🤖 Cloud Agent Installation Guide

**Vollständige Anleitung zur Installation und Konfiguration von Cloud Agents**

---

## 📋 Inhaltsverzeichnis

1. [Überblick](#überblick)
2. [Agent-Typen](#agent-typen)
3. [Installation von Claude Code Agents](#installation-von-claude-code-agents)
4. [Installation von System Agents](#installation-von-system-agents)
5. [Konfiguration und Testing](#konfiguration-und-testing)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Überblick

Dieses Repository unterstützt zwei verschiedene Arten von Cloud Agents:

1. **Claude Code Agents** (Skills/Custom Agents)
   - Spezialisierte Sub-Agents für spezifische Aufgaben
   - Definiert in `.claude/commands/*.md`
   - Werden über die Claude Code Skill API aufgerufen

2. **System Agents** (Backend API Agents)
   - Supervisor-Hierarchie für Task-Management
   - Definiert im Backend Code (`src/`)
   - Über REST API und WebSocket steuerbar

---

## 🔧 Agent-Typen

### Claude Code Agents (Skills)

**Zweck:** Spezialisierte Assistenten für spezifische Entwicklungsaufgaben

**Bestehende Agents:**

- `agent-status` - Status-Reporting aller Agents
- `design` - UI/UX Design Review
- `docs` - Dokumentation erstellen/aktualisieren
- `fix` - Fehleranalyse und -behebung
- `implement` - Feature-Implementierung
- `review` - Code Review mit STOP-Score
- `search` - Projekt-Durchsuchung
- `security` - Sicherheits-Audit
- `test` - Test-Erstellung und -Ausführung
- `workflow` - Workflow-Analyse

### System Agents (Backend)

**Zweck:** Supervisor-System für Task-Execution und Monitoring

**Agents in der Hierarchie:**

```
META_SUPERVISOR
    ↓
ENGINEERING_LEAD_SUPERVISOR
    ↓
CLOUD_ASSISTANT
```

---

## 📦 Installation von Claude Code Agents

### Voraussetzungen

- Repository ist geklont
- Claude Code ist installiert und konfiguriert
- Zugriff auf `.claude/commands/` Verzeichnis

### Schritt 1: Agent-Datei erstellen

Erstelle eine neue Markdown-Datei im `.claude/commands/` Verzeichnis:

```bash
cd /home/runner/work/code-cloud-agents/code-cloud-agents
touch .claude/commands/mein-neuer-agent.md
```

### Schritt 2: Agent-Definition schreiben

Öffne die Datei und definiere den Agent mit folgendem Format:

```markdown
---
description: Kurze Beschreibung des Agents (erscheint in der UI)
allowed-tools: Read, Write, Edit, Grep, Glob, Bash(npm:*), Bash(git:*)
---

# Agent Name

Deine Agent-Anweisung: $ARGUMENTS

## Vorgehen

### 1. Schritt 1 Name

- Beschreibung was zu tun ist
- Details zur Ausführung

### 2. Schritt 2 Name

- Weitere Schritte...

## Regeln

- **IMMER**: Was der Agent immer tun soll
- **NIEMALS**: Was der Agent niemals tun darf
- Weitere wichtige Regeln...

## Output Format
```

Erwartetes Output-Format definieren

```

```

### Schritt 3: Beispiel für einen neuen Agent

**Datei:** `.claude/commands/database.md`

```markdown
---
description: Datenbank-Operationen und Migrationen durchführen
allowed-tools: Read, Write, Edit, Bash(npm:*), Bash(sqlite3:*)
---

# Database Agent

Führe Datenbank-Operation aus: $ARGUMENTS

## Vorgehen

### 1. Analyse

- Verstehe die gewünschte Datenbank-Operation
- Prüfe bestehende Schema-Struktur
- Identifiziere Abhängigkeiten

### 2. Migration erstellen (falls nötig)

- Erstelle Migration-Datei mit Timestamp
- Definiere `up` und `down` Funktionen
- Berücksichtige bestehende Daten

### 3. Ausführung

- Backup erstellen (falls produktiv)
- Migration ausführen
- Verifiziere Ergebnis

### 4. Dokumentation

- Aktualisiere Schema-Dokumentation
- Füge JSDoc zu neuen Models hinzu
- Update README wenn nötig

## Regeln

- **IMMER** Backup vor Produktiv-Migrationen
- **NIEMALS** Daten ohne Bestätigung löschen
- **IMMER** `down` Migration implementieren
- Bei Unsicherheit: Erst nachfragen

## Output Format
```

## Migration: [Name]

### Änderungen

- Tabelle X: Spalte Y hinzugefügt
- Index auf Z erstellt

### Ausgeführt

✅ Migration erfolgreich
✅ Daten migriert: X Einträge
✅ Dokumentation aktualisiert

### Rollback

Migration kann mit `npm run db:rollback` rückgängig gemacht werden

```

```

### Schritt 4: Agent testen

1. **Restart Claude Code** (falls bereits offen)
2. **Agent aufrufen:**

   ```
   Nutze den database agent um eine neue Tabelle zu erstellen
   ```

3. **Verifizieren:**
   - Agent sollte in der Skill-Liste erscheinen
   - Agent sollte aufgerufen werden
   - Output sollte dem definierten Format entsprechen

### Schritt 5: Agent committen

```bash
git add .claude/commands/database.md
git commit -m "feat: add database agent for migrations"
git push origin feature/new-agent
```

---

## 🏗️ Installation von System Agents

### Architektur

System Agents sind Backend-Services die über die API gesteuert werden.

### Schritt 1: Agent-Klasse erstellen

**Datei:** `src/agents/MyCustomAgent.ts`

```typescript
import { EventEmitter } from "events";

export type AgentState = "idle" | "working" | "stopped" | "error";

export interface AgentMetrics {
  tasksCompleted: number;
  tasksInProgress: number;
  errorCount: number;
  startedAt: Date;
  lastActivity: Date;
}

/**
 * Custom Agent for specific task execution
 */
export class MyCustomAgent extends EventEmitter {
  public id: string;
  public name: string;
  private state: AgentState = "idle";
  private currentTask: string | null = null;
  private metrics: AgentMetrics;

  constructor(id: string, name: string) {
    super();
    this.id = id;
    this.name = name;
    this.metrics = {
      tasksCompleted: 0,
      tasksInProgress: 0,
      errorCount: 0,
      startedAt: new Date(),
      lastActivity: new Date(),
    };
  }

  /**
   * Execute a task
   * @param task - Task description
   */
  async execute(task: string): Promise<void> {
    try {
      this.setState("working");
      this.currentTask = task;
      this.metrics.tasksInProgress++;

      // Your agent logic here
      console.log(`${this.name} executing: ${task}`);

      // Simulate work
      await this.performTask(task);

      this.metrics.tasksCompleted++;
      this.metrics.tasksInProgress--;
      this.setState("idle");
      this.currentTask = null;

      this.emit("task_completed", { task, agentId: this.id });
    } catch (error) {
      this.metrics.errorCount++;
      this.setState("error");
      this.emit("task_failed", { task, error, agentId: this.id });
    } finally {
      this.metrics.lastActivity = new Date();
    }
  }

  /**
   * Perform the actual task logic
   */
  private async performTask(task: string): Promise<void> {
    // Implement your agent-specific logic here
    // Example: Call external API, process data, etc.
  }

  /**
   * Set agent state
   */
  private setState(newState: AgentState): void {
    const oldState = this.state;
    this.state = newState;
    this.emit("state_changed", {
      agentId: this.id,
      oldState,
      newState,
    });
  }

  /**
   * Get current agent state
   */
  public getState(): AgentState {
    return this.state;
  }

  /**
   * Get agent metrics
   */
  public getMetrics(): AgentMetrics {
    return { ...this.metrics };
  }

  /**
   * Stop agent
   */
  public stop(reason?: string): void {
    this.setState("stopped");
    this.emit("agent_stopped", { agentId: this.id, reason });
  }

  /**
   * Start/Resume agent
   */
  public start(): void {
    if (this.state === "stopped") {
      this.setState("idle");
      this.emit("agent_started", { agentId: this.id });
    }
  }
}
```

### Schritt 2: Agent Manager aktualisieren

**Datei:** `src/agents/AgentManager.ts`

```typescript
import { MyCustomAgent } from "./MyCustomAgent";

export class AgentManager {
  private agents: Map<string, MyCustomAgent> = new Map();

  /**
   * Register a new agent
   */
  registerAgent(agent: MyCustomAgent): void {
    this.agents.set(agent.id, agent);

    // Listen to agent events
    agent.on("state_changed", (event) => {
      console.log(
        `Agent ${event.agentId} state: ${event.oldState} → ${event.newState}`,
      );
    });

    agent.on("task_completed", (event) => {
      console.log(`Agent ${event.agentId} completed task: ${event.task}`);
    });

    agent.on("task_failed", (event) => {
      console.error(`Agent ${event.agentId} failed:`, event.error);
    });
  }

  /**
   * Get agent by ID
   */
  getAgent(agentId: string): MyCustomAgent | undefined {
    return this.agents.get(agentId);
  }

  /**
   * Get all agents
   */
  getAllAgents(): MyCustomAgent[] {
    return Array.from(this.agents.values());
  }

  /**
   * Execute task on specific agent
   */
  async executeTask(agentId: string, task: string): Promise<void> {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }

    await agent.execute(task);
  }
}
```

### Schritt 3: Agent registrieren

**Datei:** `src/index.ts` (oder Ihre Haupt-Backend-Datei)

```typescript
import { MyCustomAgent } from "./agents/MyCustomAgent";
import { AgentManager } from "./agents/AgentManager";

// Initialize Agent Manager
const agentManager = new AgentManager();

// Create and register your custom agent
const myAgent = new MyCustomAgent("agent_my_custom_agent", "MY_CUSTOM_AGENT");

agentManager.registerAgent(myAgent);

// Export for use in API routes
export { agentManager };
```

### Schritt 4: API Endpoints hinzufügen

**Datei:** `src/api/agents.ts`

```typescript
import express from "express";
import { agentManager } from "../index";

const router = express.Router();

/**
 * GET /api/agents
 * List all agents
 */
router.get("/", (req, res) => {
  const agents = agentManager.getAllAgents();
  res.json({
    success: true,
    agents: agents.map((agent) => ({
      id: agent.id,
      name: agent.name,
      state: agent.getState(),
      metrics: agent.getMetrics(),
    })),
    count: agents.length,
  });
});

/**
 * POST /api/agents/:agentId/execute
 * Execute task on agent
 */
router.post("/:agentId/execute", async (req, res) => {
  try {
    const { agentId } = req.params;
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({
        success: false,
        error: "Task description required",
      });
    }

    await agentManager.executeTask(agentId, task);

    res.json({
      success: true,
      message: "Task submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
```

### Schritt 5: Testen

```bash
# Backend starten
npm run backend:dev

# Agent auflisten
curl http://localhost:3000/api/agents

# Task ausführen
curl -X POST http://localhost:3000/api/agents/agent_my_custom_agent/execute \
  -H "Content-Type: application/json" \
  -d '{"task":"Process data"}'
```

---

## ⚙️ Konfiguration und Testing

### Environment Variables

Füge notwendige Konfiguration zu `.env` hinzu:

```bash
# Agent-spezifische Konfiguration
MY_AGENT_ENABLED=true
MY_AGENT_API_KEY=your_api_key_here
MY_AGENT_TIMEOUT=30000
```

### Testing mit Jest

**Datei:** `tests/agents/MyCustomAgent.test.ts`

```typescript
import { MyCustomAgent } from "../../src/agents/MyCustomAgent";

describe("MyCustomAgent", () => {
  let agent: MyCustomAgent;

  beforeEach(() => {
    agent = new MyCustomAgent("test_agent", "TEST_AGENT");
  });

  it("should initialize with idle state", () => {
    expect(agent.getState()).toBe("idle");
  });

  it("should execute task successfully", async () => {
    const taskPromise = agent.execute("Test task");

    expect(agent.getState()).toBe("working");

    await taskPromise;

    expect(agent.getState()).toBe("idle");
    const metrics = agent.getMetrics();
    expect(metrics.tasksCompleted).toBe(1);
  });

  it("should emit task_completed event", async () => {
    const eventPromise = new Promise((resolve) => {
      agent.on("task_completed", resolve);
    });

    await agent.execute("Test task");

    const event = await eventPromise;
    expect(event).toMatchObject({
      task: "Test task",
      agentId: "test_agent",
    });
  });

  it("should stop and start agent", () => {
    agent.stop("Maintenance");
    expect(agent.getState()).toBe("stopped");

    agent.start();
    expect(agent.getState()).toBe("idle");
  });
});
```

### Tests ausführen

```bash
npm test -- MyCustomAgent.test.ts
```

---

## 🔍 Troubleshooting

### Claude Code Agent wird nicht erkannt

**Problem:** Agent erscheint nicht in der Skill-Liste

**Lösung:**

1. Stelle sicher, dass die Datei im `.claude/commands/` Verzeichnis liegt
2. Prüfe, dass der Front Matter (---) korrekt formatiert ist
3. Restart Claude Code
4. Prüfe, ob `description` im Front Matter vorhanden ist

### System Agent startet nicht

**Problem:** Agent kann nicht initialisiert werden

**Lösung:**

1. Prüfe Logs: `npm run backend:dev`
2. Stelle sicher, dass alle Dependencies installiert sind: `npm install`
3. Prüfe Environment Variables in `.env`
4. Verifiziere, dass Agent in `AgentManager` registriert ist

### Agent führt Tasks nicht aus

**Problem:** Task wird submitted aber nicht ausgeführt

**Lösung:**

1. Prüfe Agent State: `curl http://localhost:3000/api/agents/agent_id`
2. Prüfe Agent Logs: `curl http://localhost:3000/api/agents/agent_id/logs`
3. Stelle sicher, dass Agent nicht `stopped` ist
4. Prüfe Error Count in Metrics

### Permission Errors

**Problem:** Agent hat keine Berechtigung für bestimmte Operations

**Lösung:**

1. **Claude Code Agent:** Prüfe `allowed-tools` im Front Matter
2. **System Agent:** Prüfe Authentication/Authorization im Backend
3. Prüfe Dateisystem-Berechtigungen bei File Operations

---

## 📚 Weitere Ressourcen

### Dokumentation

- **[AGENT_SETUP.md](./AGENT_SETUP.md)** - CRM-spezifische Agent-Konfiguration
- **[AGENT_CONTROL.md](./AGENT_CONTROL.md)** - API Dokumentation für Agent Control
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System-Architektur
- **[DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)** - Entwickler-Handbuch

### Beispiele

Siehe bestehende Agents für Referenz:

- `.claude/commands/implement.md` - Gut dokumentierter Claude Code Agent
- `src/agents/` - System Agent Implementierungen

---

## 📝 Checkliste für neue Agents

### Claude Code Agent

- [ ] Datei in `.claude/commands/` erstellt
- [ ] Front Matter mit `description` und `allowed-tools` definiert
- [ ] Klare Anweisungen und Vorgehen beschrieben
- [ ] Regeln definiert (IMMER/NIEMALS)
- [ ] Output Format spezifiziert
- [ ] Agent getestet
- [ ] Dokumentation aktualisiert

### System Agent

- [ ] Agent-Klasse erstellt (extends EventEmitter)
- [ ] State Management implementiert
- [ ] Metrics Tracking implementiert
- [ ] Event Emitter für state_changed, task_completed, task_failed
- [ ] In AgentManager registriert
- [ ] API Endpoints erstellt
- [ ] Tests geschrieben
- [ ] Environment Variables dokumentiert
- [ ] Error Handling implementiert

---

## 🚀 Quick Start Templates

### Minimal Claude Code Agent

```markdown
---
description: Agent-Beschreibung
allowed-tools: Read, Write
---

# Agent Name

$ARGUMENTS

## Aufgabe

- Was zu tun ist

## Regeln

- **IMMER**: ...
- **NIEMALS**: ...
```

### Minimal System Agent

```typescript
import { EventEmitter } from "events";

export class MinimalAgent extends EventEmitter {
  public id: string;
  public name: string;
  private state: "idle" | "working" = "idle";

  constructor(id: string, name: string) {
    super();
    this.id = id;
    this.name = name;
  }

  async execute(task: string): Promise<void> {
    this.state = "working";
    // Your logic here
    this.state = "idle";
    this.emit("task_completed", { task });
  }

  getState() {
    return this.state;
  }
}
```

---

**Version:** 1.0.0
**Letzte Aktualisierung:** 2026-02-03

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
