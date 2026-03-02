
import { generateText, stepCountIs, tool } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { groq } from '@ai-sdk/groq';
import "dotenv/config";

const model = groq("qwen/qwen3-32b");
// Tool 1: Search flights
const searchFlights = tool({
  description: 'Search for available flights between two cities',
  inputSchema: z.object({
    from: z.string().describe('Departure city'),
    to: z.string().describe('Destination city'),
    date: z.string().describe('Departure date in YYYY-MM-DD format'),
  }),
  execute: async ({ from, to, date }) => {
    // Simulate flight search API
    return [
      {
        airline: 'Air France',
        departure: '10:00',
        arrival: '14:30',
        price: 450,
        stops: 0,
      },
      {
        airline: 'British Airways',
        departure: '14:15',
        arrival: '19:00',
        price: 380,
        stops: 1,
      },
    ];
  },
});

// Tool 2: Search hotels
const searchHotels = tool({
  description: 'Search for hotels in a city',
  inputSchema: z.object({
    city: z.string().describe('The city to search in'),
    checkIn: z.string().describe('Check-in date in YYYY-MM-DD format'),
    checkOut: z.string().describe('Check-out date in YYYY-MM-DD format'),
    priceRange: z.enum(['budget', 'moderate', 'luxury']).describe('Price range preference'),
  }),
  execute: async ({ city, checkIn, checkOut, priceRange }) => {
    // Simulate hotel search
    return [
      {
        name: 'Grand Hotel',
        rating: 4.5,
        pricePerNight: 200,
        amenities: ['wifi', 'pool', 'gym'],
      },
      {
        name: 'City Inn',
        rating: 4.0,
        pricePerNight: 120,
        amenities: ['wifi', 'breakfast'],
      },
    ];
  },
});

// Tool 3: Get city information
const getCityInfo = tool({
  description: 'Get general information and recommendations for a city',
  inputSchema: z.object({
    city: z.string().describe('The city name'),
  }),
  execute: async ({ city }) => {
    // Simulate city info API
    return {
      city: city,
      popularAttractions: ['Eiffel Tower', 'Louvre Museum', 'Notre Dame'],
      bestTimeToVisit: 'Spring and Fall',
      averageTemperature: '15-20°C',
      localCurrency: 'EUR',
    };
  },
});

// Tool 4: Calculate budget
const calculateBudget = tool({
  description: 'Calculate estimated trip budget based on components',
  inputSchema: z.object({
    flightCost: z.number().describe('Cost of flights'),
    hotelCostPerNight: z.number().describe('Hotel cost per night'),
    nights: z.number().describe('Number of nights staying'),
    dailyExpenses: z.number().describe('Estimated daily expenses for food and activities'),
  }),
  execute: async ({ flightCost, hotelCostPerNight, nights, dailyExpenses }) => {
    const hotelTotal = hotelCostPerNight * nights;
    const expensesTotal = dailyExpenses * nights;
    const total = flightCost + hotelTotal + expensesTotal;
    
    return {
      flightCost,
      hotelCost: hotelTotal,
      expenses: expensesTotal,
      total,
      breakdown: {
        transportation: `${flightCost} (${((flightCost / total) * 100).toFixed(1)}%)`,
        accommodation: `${hotelTotal} (${((hotelTotal / total) * 100).toFixed(1)}%)`,
        other: `${expensesTotal} (${((expensesTotal / total) * 100).toFixed(1)}%)`,
      },
    };
  },
});

async function planTrip() {
  const result = await generateText({
    model: model,
    tools: {
      searchFlights,
      searchHotels,
      getCityInfo,
      calculateBudget,
    },
    stopWhen: stepCountIs(3), 
    system: `You are a helpful travel planning assistant. When planning trips:
    1. First get information about the destination
    2. Search for flights and hotels
    3. Calculate the budget
    4. Provide practical recommendations
    Be specific with dates and details. Always show the budget breakdown.`,
    prompt: 'I want to visit Paris for 5 nights in June. I prefer moderate hotels. Can you help me plan this trip and estimate the cost?',
  });

  console.log(result.text);
  console.log(result)
  
  console.log('\n--- Agent Activity ---');
  console.log(`Total steps taken: ${result.steps?.length || 1}`);
  console.log(`Tools used: ${result.toolCalls?.length || 0}`);
  
  if (result.toolCalls) {
    const toolNames = result.toolCalls.map(tc => tc.toolName);
    const uniqueTools = [...new Set(toolNames)];
    console.log(`Unique tools: ${uniqueTools.join(', ')}`);
  }
}

planTrip();
// ```

// This travel agent demonstrates a complete agentic workflow. The AI orchestrates multiple tools to gather information, make calculations, and provide comprehensive advice. It doesn't just return raw data; it synthesizes information from multiple sources into helpful recommendations.

// The system prompt guides the AI's behavior, telling it what order to do things and what kind of output to provide. This is important for shaping how agents work. Without guidance, the AI might randomly call tools without a coherent strategy. With good system prompts, agents follow logical workflows that make sense for the task.

// Understanding tool calling opens up entire new categories of applications you can build with AI. The next step is exploring how to stream tool calls in real-time, handle tool approvals for sensitive operations, and build even more sophisticated agent systems. Tool calling transforms AI from a chat interface into an active problem-solving system that can interact with your entire application ecosystem.