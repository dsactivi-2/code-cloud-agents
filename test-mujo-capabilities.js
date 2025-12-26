/**
 * Test Mujo's Capabilities Response
 * Tests the "What can you do?" / "What are you good for?" feature
 */

import { generateResponse } from "./src/integrations/slack/bot-responses.js";

console.log("💪 Testing Mujo's Capabilities Response\n");
console.log("=".repeat(60) + "\n");

const testMessages = [
  // German
  "mujo was kannst du alles?",
  "mujo wozu bist du gut?",
  "@mujo was kannst du?",

  // English
  "mujo what can you do?",
  "@mujo what are you good for?",

  // Bosnian
  "mujo šta možeš?",
  "mujo sta mozes?",
  "@mujo čemu služiš?",
];

for (const message of testMessages) {
  console.log(`📩 User: "${message}"`);
  const response = generateResponse(message);
  console.log(`🤖 Mujo (${response.language}):`);
  console.log(`   ${response.text.split("\n").join("\n   ")}`);
  console.log("");
  console.log("─".repeat(60));
  console.log("");
}

console.log("=".repeat(60));
console.log("\n✅ Capabilities Test Complete!\n");

console.log("📋 Expected sections in response:");
console.log("   • 🧠 Supervisor-Gehirn (system status, STOP scores, alerts)");
console.log("   • 💬 Interactive Bot (mentions, commands, languages, jokes)");
console.log("   • 📢 Notifications (alerts, monitoring, task completions)");
console.log("   • 🔧 Integrationen (GitHub, Linear, team notifications)");
