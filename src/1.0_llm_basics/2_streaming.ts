import 'dotenv/config';
import {streamText} from 'ai';
import {google} from "@ai-sdk/google";

const model=google("gemini-2.5-flash")
async function streamingExample() {
console.log("Streaming response............:\n");
const result=streamText({
    model:model,
    prompt:'write a short poem about Typescript and Ai working together.'
});

for await (const  chunk of result.textStream) {

// Process each chunk immediately as it arrives
    // process.stdout.write prints without a newline, creating a smooth flow
    process.stdout.write(chunk);
    // add a newline at the end
    console.log('\n\n---Streaming complete---')
}
}


// # Create a new script in package.json for this file
// # Add to your "scripts" section:
// "stream": "tsc && node dist/streaming.js"
// # Then run:
// npm run stream

streamingExample()

