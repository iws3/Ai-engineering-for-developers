# Part 1: Type System Fundamentals (Beginner Deep Dive)

## 🎯 What is a Type System?
A **type system** is a set of rules that defines what values variables can hold and what operations you can perform on them.

---

## 📝 Key Terms
- **Primitive Type:** Basic types like string, number, boolean
- **Type Annotation:** Explicitly declaring a variable's type
- **Type Inference:** TypeScript guessing the type from the value
- **Type Safety:** Having the compiler check your types
- **any Type:** A type that can be anything (avoid this!)

> **Beginner Note:** Types are your safety net. They prevent bugs by catching errors before you run your code!

---

## 🔤 Primitive Types

### String
```typescript
let name: string = "Alice";
let greeting: string = 'Hello';
let message: string = `Hello, ${name}!`;  // Template literal

name = 42;  // ❌ ERROR: Cannot assign number to string
```

### Number
```typescript
let age: number = 25;
let pi: number = 3.14;
let negative: number = -10;
let hex: number = 0xFF;  // Hexadecimal

age = "twenty-five";  // ❌ ERROR: Cannot assign string to number
```

### Boolean
```typescript
let isActive: boolean = true;
let hasError: boolean = false;

isActive = 1;  // ❌ ERROR: 1 is not a boolean (even though it's truthy)
```

### Null and Undefined
```typescript
let empty: null = null;
let nothing: undefined = undefined;

let maybe: string | null = null;  // Can be string OR null
```

---

## 🎯 Type Inference

TypeScript can automatically figure out your type:

```typescript
const name = "Alice";  // Inferred: string
const age = 25;        // Inferred: number
const active = true;   // Inferred: boolean

// No need to write: const name: string = "Alice";
```

---

## 🚫 The `any` Type

Sometimes you need maximum flexibility:

```typescript
let anything: any = 42;
anything = "hello";    // ✅ OK
anything = true;       // ✅ OK
anything.randomMethod();  // ✅ TypeScript allows it (but may crash at runtime!)
```

**⚠️ Beginner Warning:** Avoid `any`! It defeats the purpose of TypeScript's type safety.

---

## ✅ Type Checking in Action

```typescript
let score: number = 95;

// ✅ These are OK
console.log(score + 5);           // Adding numbers
console.log(score.toFixed(2));    // Using number methods

// ❌ These are errors
console.log(score.toUpperCase()); // Numbers don't have toUpperCase
console.log(score + " points");   // Can't add number + string directly
```

---

## 📐 Array Types

```typescript
let numbers: number[] = [1, 2, 3];
let strings: string[] = ["a", "b", "c"];
let mixed: (string | number)[] = [1, "two", 3];

numbers.push(4);      // ✅ OK
numbers.push("five"); // ❌ ERROR: string not in number[]
```

---

## 🏷️ Important Terms
- **Type Annotation**
- **Type Inference**
- **Primitive Types**
- **any (avoid!)**
- **Array Types**

---

## 📚 Resources
- [TypeScript Handbook: Basic Types](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [JavaScript Data Types (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

---

## 💡 Key Takeaway
Every value in TypeScript has a type. The type tells the compiler what the value is and what you can do with it!

