# 🚀 Agent Installation - Quick Reference

**Schnellanleitung für die Installation von Cloud Agents**

---

## 📍 Wo installiere ich Agents?

### 1. Claude Code Agents (Skills)

**Speicherort:**

```
.claude/commands/[agent-name].md
```

**Verwendung:**

- Spezialisierte Sub-Agents für Entwicklungsaufgaben
- Werden automatisch als Skills in Claude Code erkannt
- Keine Backend-Integration nötig

### 2. System Agents (Backend)

**Speicherort:**

```
src/agents/[AgentName].ts
```

**Verwendung:**

- Backend API Agents für Task-Execution
- Über REST API steuerbar
- Teil der Supervisor-Hierarchie

---

## ⚡ Quick Start: Claude Code Agent

### 1. Datei erstellen

```bash
touch .claude/commands/mein-agent.md
```

### 2. Minimal-Template

```markdown
---
description: Was macht der Agent
allowed-tools: Read, Write, Edit, Bash(npm:*)
---

# Agent Name

$ARGUMENTS

## Aufgabe

1. Schritt 1
2. Schritt 2

## Regeln

- **IMMER**: ...
- **NIEMALS**: ...
```

### 3. Testen

```
Nutze den mein-agent für [Aufgabe]
```

**Fertig!** 🎉

---

## ⚡ Quick Start: System Agent

### 1. Agent-Klasse erstellen

```typescript
// src/agents/MyAgent.ts
import { EventEmitter } from "events";

export class MyAgent extends EventEmitter {
  constructor(
    public id: string,
    public name: string,
  ) {
    super();
  }

  async execute(task: string): Promise<void> {
    // Deine Logik hier
    this.emit("task_completed", { task });
  }
}
```

### 2. Registrieren

```typescript
// src/index.ts
import { MyAgent } from "./agents/MyAgent";

const myAgent = new MyAgent("agent_my", "MY_AGENT");
agentManager.registerAgent(myAgent);
```

### 3. API Endpoint (optional)

```typescript
// src/api/agents.ts
router.post("/:agentId/execute", async (req, res) => {
  await agentManager.executeTask(req.params.agentId, req.body.task);
  res.json({ success: true });
});
```

### 4. Testen

```bash
curl -X POST http://localhost:3000/api/agents/agent_my/execute \
  -H "Content-Type: application/json" \
  -d '{"task":"Test"}'
```

**Fertig!** 🎉

---

## 📋 Checkliste

### Claude Code Agent

- [ ] `.claude/commands/[name].md` erstellt
- [ ] Front Matter mit `description` und `allowed-tools`
- [ ] Anweisungen geschrieben
- [ ] Getestet mit Claude Code

### System Agent

- [ ] `src/agents/[Name].ts` erstellt
- [ ] EventEmitter implementiert
- [ ] In AgentManager registriert
- [ ] API Endpoints erstellt (falls nötig)
- [ ] Tests geschrieben

---

## 🔧 Allowed Tools (Claude Code)

### Empfohlene Tools je nach Agent-Typ

**Code-Editor Agent:**

```yaml
allowed-tools: Read, Write, Edit, Grep, Glob
```

**Build/Test Agent:**

```yaml
allowed-tools: Read, Bash(npm:*), Bash(git:*)
```

**Database Agent:**

```yaml
allowed-tools: Read, Write, Bash(npm:*), Bash(sqlite3:*)
```

**Full Access (vorsichtig!):**

```yaml
allowed-tools: Read, Write, Edit, Grep, Glob, Bash(*), GitWrite
```

---

## 🎯 Beispiele

### Bestehende Claude Code Agents

Siehe als Referenz:

- `.claude/commands/implement.md` - Feature Implementation
- `.claude/commands/fix.md` - Bug Fixing
- `.claude/commands/test.md` - Test Writing
- `.claude/commands/review.md` - Code Review

### Bestehende System Agents

- `ENGINEERING_LEAD_SUPERVISOR` - Task Planning & Delegation
- `CLOUD_ASSISTANT` - Task Execution
- `META_SUPERVISOR` - Routing & Monitoring

---

## 🐛 Häufige Probleme

### Agent wird nicht erkannt

**Claude Code Agent:**

```bash
# Restart Claude Code
# Prüfe Front Matter Format (--- lines)
# Prüfe Dateiendung (.md)
```

**System Agent:**

```bash
# Prüfe Logs
npm run backend:dev

# Prüfe Registrierung
curl http://localhost:3000/api/agents
```

### Permissions Error

**Claude Code:**

```markdown
# Füge benötigte Tools hinzu:

allowed-tools: Read, Write, Bash(npm:\*)
```

**System:**

```typescript
// Prüfe Error Handling
try {
  await agent.execute(task);
} catch (error) {
  console.error("Agent error:", error);
}
```

---

## 📚 Vollständige Dokumentation

Für detaillierte Anleitungen siehe:

**[AGENT_INSTALLATION_GUIDE.md](./AGENT_INSTALLATION_GUIDE.md)**

---

**Version:** 1.0.0

🤖 Generated with Claude Code
