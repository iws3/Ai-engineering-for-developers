import {google} from "@ai-sdk/google"
import { generateText } from "ai"
import "dotenv/config"


const model=google("gemini-2.5-flash");

async function parameterControl():Promise<void> {
console.log('\n' + "-".repeat(70));
console.log('EXAMPLE 5: Temperature and Parameters');

const prompt='Suggest a creative name for an Ai-powered code editor';

try{

    console.log("\n Low Temperature (0.3):");
    const conservative=await generateText({
        model:model,
        prompt:prompt,
        temperature:0.3
    })

    console.log(conservative.text);
    console.log("\n High Temperature (1.2)");

    const creative=await generateText({
        model:model,
        prompt:prompt,
        temperature:1.2
    })

    console.log(creative.text);

    console.log("\n With MAx token limit (50)");
    const limited=await generateText({
        model:model,
        prompt:"explain typescript in details",
        maxOutputTokens:50
    })

    console.log(limited.text);
    console.log(`(Used ${limited.usage.totalTokens}) tokens`)


}
catch(error){
    if(error instanceof Error){
        console.error('Error in example 5: ', error.message);

    }
    else{
        console.error("Unknown error: ", error)
    }

}
}

parameterControl()