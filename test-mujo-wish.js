import { generateResponse } from "./src/integrations/slack/bot-responses.js";

console.log("🧪 Testing Mujo's Greatest Wish\n");

const testMessages = [
  "mujo sta je tvoja najveca zelja?",
  "mujo šta je tvoja najveća želja?",
  "mujo was ist dein größter wunsch?",
  "@mujo what is your greatest wish?",
];

for (const message of testMessages) {
  console.log(`📩 User: "${message}"`);
  const response = generateResponse(message);
  console.log(`🤖 Mujo (${response.language}): ${response.text}\n`);
}
