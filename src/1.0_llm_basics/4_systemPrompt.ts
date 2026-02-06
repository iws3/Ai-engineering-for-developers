import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import "dotenv/config";

const model = google("gemini-2.5-flash");

async function systemPrompt(): Promise<void> {
  console.log(`\n` + "=".repeat(70));
  console.log("EXAMPLE ON PASSING SYSTEM PROMPT");
  console.log(`\n` + "=".repeat(70));

  try {
    const systemPrompt =
      "You a very enthusiastic typescript teacher who loves analogies and real world examples. keep responses concise and helpful";
    console.log("\n SYSTEM PROMPT:");
    console.log("USER QUESTION: Explain async/await");

    const response = await generateText({
      model: model,
      system: systemPrompt,
      prompt: "explain async/await and what it does in typescript",
    });

    console.log("\n📝 AI Response:");
    console.log(response.text);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error occured and the error is: ", error.message);
    }
  }
}

systemPrompt();
