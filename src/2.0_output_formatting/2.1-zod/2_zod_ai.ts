import {z} from 'zod';

// .
// Describing Schemas for AI Understanding
// When using Zod schemas with the AI SDK, descriptions are crucial. They tell the AI what each field means and how to populate it:

const rescipeSchema=z.object({
    name:z.string().describe("The name of the recipe"),

    servings:z.number().describe("How many people this recipe serves"),
    ingredients:z.array(
        z.array(
            z.object({
                name:z.string().describe("The name of the ingredients"),
                amount:z.string().describe("The amount needed, with  units (eg., '2 CUPS', '1 tbsp' )"),

            }) ).describe("List of ingredients needed"),
        ),

        steps:z.array(
            z.string().describe('hello , inside here'),
        ).describe('Step-by-step cooking instructions'),

        prepTime:z.number().describe('Preparation time in minute'),
        cookTime:z.number().describe('Cooking time in minute'),

})