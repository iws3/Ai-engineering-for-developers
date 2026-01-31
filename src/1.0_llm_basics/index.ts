import 'dotenv/config';
import { generateText } from 'ai';
import {google} from "@ai-sdk/google";


const model=google("gemini-2.5-flash");
// function_signature: google("model:string")

async function main() {
    const result=await generateText({
        model:model,
        prompt:'Hello AAi'
    });

    // Correct property access
    console.log(result.text)
    console.log(`Uses ${result.usage.totalTokens} tokens`);
    console.log(`Finished because: ${result.finishReason}`)
}

main().catch(console.error)