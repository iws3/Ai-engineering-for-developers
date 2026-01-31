import {z} from 'zod';

// string schemas
const nameSchema=z.string();
// number schema
const ageSchema=z.number();

// Boolean schema
const isActiveSchema=z.boolean();

// Object schema
// const userSchema=z.object({
//     name:z.string(),
//     age:z.number(),
//     email:z.string(),
// })

// typescript automatically infer this types

type User={
    name:string;
    age:number;
    email:string;
}

// Array schema
const tagsSchema=z.array(z.string());
// array of objects
const ingredientSchema=z.object({
    name:z.string(),
    amount:z.string()
});

const ingredientsSchema=z.array(ingredientSchema);

// this would validate:
// [
//     {name:"flour", amount:"2 cups"},
//     {nmae:"sugar", amount:"1 cup"}
// ]


// OPtional and nullable fields

// const userSchema=z.object({
// name:z.string(),
// age:z.number(),
// email:z.string().optional(),
// // midllename might be null
// middleName:z.string().nullable(),
// // nickname night  null or absent 
// nickname:z.string().optional().nullable(),
// })



// // TYpescript inferS
// type User {
//     name:string;
//     age:number;
//     email?:string;
//     middleName:string | null;
//     naickname?:string | null;
// }


// Understanding the distinction between optional and nullable is important. An optional field can be completely absent from the object. A nullable field must be present, but its value can be null. You can combine both when a field might be absent or explicitly set to null.


// DEFAULT VALUES
// You can provide default values for fields that might be missing

const configSchema=z.object({
    host:z.string().default("localhost"),
    port:z.number().default(300),
    debug:z.boolean().default(false)
})



// When a field with a default value is missing from the input data, Zod fills in the default. This is useful for configuration objects where many settings have sensible defaults.



// Refinements and Transformations
// Zod lets you add custom validation logic and transform data:

// const emailSchema=z.string().email();
// // build in email validation
// const positiveNumberSchema=z.number().positive();
// // must be > 0

// const ageSchema=z.number().min(0).max(150);

// const customValidation=z.string().refine(
// (val)=>val.length >=8,
// {message:"Password must be at least 8 characters"}    
// )


// Describing Schemas for AI Understanding
// When using Zod schemas with the AI SDK, descriptions are crucial. They tell the AI what each field means and how to populate it:
