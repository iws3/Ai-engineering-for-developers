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

const userSchema=z.object({
name:z.string(),
age:z.number(),
email:z.string().optional(),
middleName:z.string().nullable(),
nickname:z.string().optional().nullable(),
})