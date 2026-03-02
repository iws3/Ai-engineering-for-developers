// import { generateText, tool } from "ai";
// import { google } from "@ai-sdk/google";
// import { groq } from "@ai-sdk/groq";
// import { z } from "zod";

// const model = groq("qwen/qwen3-32b");

// const riskyTool = tool({
//   description: "A tool that  might fail",
//   inputSchema: z.object({
//     value: z.number().describe("A number to process"),
//   }),

//   execute: async ({ value }) => {
//     if (value < 0) {
//       throw new Error("Cannot process negative values");
//     }

//     if (value > 100) {
//       throw new Error("Value too large");
//     }

//     return { result: value * 2 };
//   },
// });

// async function useRiskyTool() {
//   try {
//     const result = await generateText({
//       model: model,
//       tools: { riskyTool },
//       prompt: "Process the number -5 with the risky tool",
//     });

//     console.log(result.text);

//     // Check for tool errors in the result
//     if(result.toolResults) {
//         result.toolResults.map(tr=>{
//             if(tr.error){
//                 console.log(`Tool ${tr.toolName} failed`, tr.error)
//             }
//         })
//     }
//   } catch (error) {
//     console.error("Error during generation or tool execution:", error);
//   }
// }
