import {generateText, Output} from "ai"
import {google} from "@ai-sdk/google";
import {z} from "zod"
import "dotenv/config";


const model=google("gemini-2.5-flash");


async function extractRecipe(){

    const recipeSchema=z.object({
        name:z.string().describe("The name of the recipe"),
        cuisine:z.string().describe("The type of cuisine (eg., italian, Mexican"),
        difficulty:z.enum(['easy', 'medium', 'hard']).describe("How difficult this recipe is to make"),
        ingredients: z.array(
            z.object({
                name:z.string().describe("Ingredient name"),
                amount:z.string().describe("Amount with units"),
                options:z.boolean().describe("Whether this ingredient is Optional")
            })
        ).describe("All ingredients needed"),

        instructions: z.array(
            z.string().describe("One instruction step")
        ).describe("Step by step instructions"),
nutrition: z.object({
    calories:z.number().describe("Calories per servings"),
    protein:z.number().describe("Proteins in grams"),
    carbs:z.number().describe("Carbohydrates in grams")
}).describe("Nutritional information per serving")
        
    });

    // initialize model results here:
    const result=await generateText({
        model:model,
        output:Output.object({
            schema:recipeSchema
        }),
        prompt:"Generate a recipe for chocolate chip cookies"
    });

    console.log("Recipe:", result.output.name);
    console.log("Cuisine:", result.output.cuisine);
    console.log("Difficulty:", result.output.difficulty);
    console.log("\nIngredients:");
    result.output.ingredients.forEach((ing, i)=>{
        console.log(`${i+1}, ${ing.amount} ${ing.name} ${ing.options ? '(options' : '' }`)
    });

    console.log("\nInstructions:");
    result.output.instructions.forEach((step, i)=>{
        console.log(`${i+1}, ${step}`);
    });

    console.log("\n Nutritions");

    console.log('\nNutrition');
    console.log(`Calories: ${result.output.nutrition.calories}`);
    console.log(`Protons: ${result.output.nutrition.protein}g`);
    console.log(`Carbs: ${result.output.nutrition.carbs}g`);
}


extractRecipe()