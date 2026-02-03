# 📝 Example: Data Processing Agent

Dieses Beispiel zeigt, wie man einen vollständigen Agent erstellt, der Datenverarbeitung durchführt.

---

## Claude Code Agent Version

**Datei:** `.claude/commands/data-processor.md`

```markdown
---
description: Verarbeitet und validiert strukturierte Daten
allowed-tools: Read, Write, Edit, Bash(npm:*)
---

# Data Processing Agent

Verarbeite Daten: $ARGUMENTS

## Vorgehen

### 1. Daten einlesen
- Identifiziere Input-Format (JSON, CSV, XML)
- Lese Datei mit entsprechendem Parser
- Validiere Basis-Struktur

### 2. Daten validieren
- Prüfe Pflichtfelder
- Validiere Datentypen
- Prüfe auf Duplikate
- Validiere Referenzen

### 3. Daten transformieren
- Bereinige Werte (Trim, Lowercase, etc.)
- Konvertiere Formate
- Berechne abgeleitete Felder
- Sortiere/Gruppiere falls nötig

### 4. Daten speichern
- Schreibe Output-Datei
- Erstelle Validierungs-Report
- Logge Statistiken

## Regeln

- **IMMER** Input-Daten validieren vor Verarbeitung
- **IMMER** Backup erstellen bei Überschreibung
- **NIEMALS** Daten ohne Validierung löschen
- **NIEMALS** Fehler stillschweigend ignorieren
- Bei Unsicherheit über Datenformat: Nachfragen

## Output Format

```
{
  "status": "success",
  "inputFile": "data.csv",
  "outputFile": "processed_data.json",
  "statistics": {
    "total": 1000,
    "valid": 950,
    "invalid": 50,
    "duplicates": 25
  }
}
```

## Beispiel-Nutzung

Nutze den data-processor Agent um die CSV-Datei "users.csv" 
zu validieren und in JSON zu konvertieren
```

Siehe vollständiges Beispiel in der Datei für System Agent Implementation.

---

**Version:** 1.0.0

🤖 Generated with Claude Code
