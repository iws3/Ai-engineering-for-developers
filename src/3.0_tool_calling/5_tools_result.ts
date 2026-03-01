import  {generateText, tool} from "ai";
import {google} from "@ai-sdk/google";
import {z} from "zod";
import "dotenv/config";

const model=google("gemini-2.5-flash");

const getWeather=tool({
    description:"Get the current weather for a given location",
    inputSchema:z.object({
        location:z.string().describe('The city and country, eg. "Paris, France"')
    }),
    execute:async ({location}: {location: string})=>{
        // in a real implementation, you would call a weather API here. For this example, we'll return dummy data.  
        return{
            location,
            temperature:"20C",
            condition:"Sunny",
        }
    }
})

async function askAboutWeather(){
    const result=await generateText({
        model:model,
        tools: {
            getWeather
        },
        prompt: 'what is the weather in Douala-Cameroon right now?'
    })
    console.log("hello")
    console.log(result.text)
}

askAboutWeather().catch(console.error)