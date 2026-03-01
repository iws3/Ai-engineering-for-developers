// Multi-step tool calling example with AI SDK v5+
import { generateText, tool, stepCountIs } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import "dotenv/config";

const model = google("gemini-2.5-flash");

const getUserInfo = tool({
  description: "Get information about a user by their ID",
  inputSchema: z.object({
    userId: z.string().describe("The ID of the user to look up"),
  }),
  execute: async ({ userId }) => {
    // Simulate database call
    console.log(`   🔧 Tool: getUserInfo(userId="${userId}")`);
    return {
      userId: userId,
      name: "Fonyuy GITA",
      email: "fonyuyjudegita@gmail.com",
      location: "Douala, Cameroon",
      interests: ["Hiking", "photography", "cooking"],
    };
  },
});

const searchEvents = tool({
  description: "Search for events in a location matching interests",
  inputSchema: z.object({
    location: z.string().describe("The city to search in"),
    interests: z.array(z.string()).describe("List of interests to match"),
  }),
  execute: async ({ location, interests }) => {
    // Simulate event search
    console.log(`   🔧 Tool: searchEvents(location="${location}", interests=[${interests.join(', ')}])`);
    return [
      { 
        name: "Photography Workshop", 
        location: location, 
        date: "2024-03-15",
        description: "Learn advanced photography techniques"
      },
      { 
        name: "Hiking Meetup", 
        location: location, 
        date: "2024-03-16",
        description: "Group hiking in Cameroon's beautiful trails"
      },
      { 
        name: "Cooking Class", 
        location: location, 
        date: "2024-03-17",
        description: "Traditional Cameroonian cuisine workshop"
      },
    ];
  },
});

async function recommendEvents() {
  console.log("\n🤖 Starting multi-step tool execution...\n");
  
  const result = await generateText({
    model: model,
    tools: {
      getUserInfo,
      searchEvents,
    },
    // ✅ AI SDK v5+ uses stopWhen instead of maxSteps
    stopWhen: stepCountIs(5), // Allow up to 5 steps
    prompt: "What events would be good for user-123 based on their interests?",
  });

  console.log("\n📋 FINAL AI RESPONSE:");
  console.log("=".repeat(70));
  console.log(result.text); // The final generated text
  console.log("=".repeat(70));

  // Show execution details
  console.log("\n📊 EXECUTION SUMMARY:");
  console.log(`   Steps taken: ${result.steps?.length || 1}`);
  console.log(`   Tool calls: ${result.toolCalls?.length || 0}`);
  
  if (result.toolCalls && result.toolCalls.length > 0) {
    console.log("\n🔧 TOOLS USED:");
    result.toolCalls.forEach((call, i) => {
      console.log(`   ${i + 1}. ${call.toolName}`);
    });
  }
}

recommendEvents().catch(console.error);