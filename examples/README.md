# 📚 Agent Examples

Praktische Beispiele für die Implementierung von Cloud Agents.

---

## 📁 Struktur

```
examples/
├── agents/
│   ├── DataProcessorAgent.example.md    # Datenverarbeitung
│   └── README.md                          # Diese Datei
└── README.md
```

---

## 🎯 Verfügbare Beispiele

### 1. Data Processor Agent

**Datei:** `agents/DataProcessorAgent.example.md`

**Features:**
- CSV/JSON Parsing
- Datenvalidierung
- Duplikat-Erkennung
- Format-Transformation
- Error Reporting

**Use Cases:**
- Import von User-Daten
- Validierung von API-Responses
- ETL-Prozesse
- Data Cleaning

---

## 🚀 Wie nutze ich die Beispiele?

### Option 1: Copy & Paste

1. Öffne das Beispiel
2. Kopiere den Code
3. Passe ihn an deine Bedürfnisse an
4. Folge den Installations-Schritten

### Option 2: Als Template

```bash
# Kopiere das Beispiel
cp examples/agents/DataProcessorAgent.example.md .claude/commands/my-agent.md

# Bearbeite die Datei
vim .claude/commands/my-agent.md

# Teste den Agent
# (in Claude Code)
```

---

## 📝 Weitere Beispiele (geplant)

- [ ] **Email Agent** - Automatische E-Mail-Verarbeitung
- [ ] **API Integration Agent** - REST/GraphQL API Calls
- [ ] **File Watcher Agent** - Dateiänderungen überwachen
- [ ] **Database Migration Agent** - Schema-Migrationen
- [ ] **Report Generator Agent** - Automatische Reports
- [ ] **Notification Agent** - Multi-Channel Benachrichtigungen

---

## 💡 Eigene Beispiele beitragen

Möchtest du ein Beispiel hinzufügen?

1. Erstelle eine neue `.md` Datei in `examples/agents/`
2. Folge dem Format der bestehenden Beispiele
3. Dokumentiere Use Cases und Features
4. Erstelle einen Pull Request

**Template-Struktur:**
```markdown
# Example: [Agent Name]

## Claude Code Version
[Minimal Example]

## System Agent Version
[Full Implementation]

## Usage
[How to use]

## Extensions
[Possible enhancements]
```

---

## 🔗 Weitere Ressourcen

- **[AGENT_INSTALLATION_GUIDE.md](../docs/AGENT_INSTALLATION_GUIDE.md)** - Vollständige Installations-Anleitung
- **[AGENT_QUICK_REFERENCE.md](../docs/AGENT_QUICK_REFERENCE.md)** - Quick Reference
- **[AGENT_SETUP.md](../docs/AGENT_SETUP.md)** - CRM Agent Setup
- **[AGENT_CONTROL.md](../docs/AGENT_CONTROL.md)** - API Dokumentation

---

**Version:** 1.0.0

🤖 Generated with Claude Code
