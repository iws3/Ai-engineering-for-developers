
// Form Auto-Fill from Natural Language
// Imagine a user can describe what they want in natural language, and your app automatically fills in a structured form:


import { generateText, Output } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

const model=google("gemini-2.5-flash");

async function parseAppointment(userInput:string) {
    const appointmentSchema=z.object({
        title:z.string().describe("Brief title for the appointment"),
        data:z.string().describe("Data in YYYY-MM-DD format"),
        startTime:z.string().describe("Start time in HH:MM 24-hour fformat"),
        endTime:z.string().describe("End time in HH:MM 24-hour format"),

        location:z.string().optional().describe("Where the appointment takes place, if mentioned"),
        attendees:z.array(z.string()).optional().describe('Names of other people attending, if mentioned'),

        notes:z.string().optional().describe("Any additional notes or details"),

    });

    const result=await generateText({
        model:model,
        output:Output.object({
            schema:appointmentSchema,
        }),
        system:"Yoou are extracting structured appointment information from natural language . Fot dates, use YYYY-MM-DD format. For times, use 24-hour, if informaton is not provided, make reasonable assumptions",
        prompt:`Extract appointment details from: "${userInput}"`
    })

    return result.output;
}

// Example usage
const appointment1 = await parseAppointment(
  "Lunch with Sarah tomorrow at noon at Cafe Central"
);

const appointment2 = await parseAppointment(
  "Team meeting next Tuesday from 2pm to 3:30pm in Conference Room B with John and Alice"
);

console.log('Appointment 1:', appointment1);
console.log('Appointment 2:', appointment2);