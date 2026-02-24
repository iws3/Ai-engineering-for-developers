# Day 6: Type System Fundamentals

## 🎯 Today's Learning Objectives

- ✅ Understand primitive types: `string`, `number`, `boolean`
- ✅ Learn about `any` and `unknown` types
- ✅ Understand type inference
- ✅ Know when to explicitly annotate types
- ✅ Master type coercion vs type safety

**Time to complete:** 60 minutes  
**Difficulty:** Beginner  
**Prerequisites:** Days 1-5

---

## 📚 The Foundation: Primitive Types

TypeScript's type system is built on a few core types. Let's master them:

### String Type

```typescript
// String literal
const name: string = "Alice";
const greeting: string = `Hello, ${name}!`;

// String operations
const uppercase: string = name.toUpperCase();
console.log(uppercase);  // "ALICE"

// ❌ These are errors:
const bad1: string = 42;              // Can't assign number
const bad2: string = true;            // Can't assign boolean
const bad3: string = null;            // Can't assign null

// BUT with union types (learn later):
const maybe: string | null = null;   // This is OK
```

### Number Type

```typescript
// Integers and floats (both are 'number')
const age: number = 30;
const price: number = 19.99;
const negative: number = -5;
const zero: number = 0;

// Special values (still type 'number')
const infinity: number = Infinity;
const notANumber: number = NaN;

// Operations
const sum: number = 10 + 20;
const product: number = 5 * 3;

// ❌ Type errors:
const bad1: number = "42";            // String, not number
const bad2: number = true;            // Boolean, not number

// ⚠️ Type coercion (in plain JS):
const result = "5" + 3;  // "53" (string concat, not addition!)
```

### Boolean Type

```typescript
// Boolean values
const isAdmin: boolean = true;
const isActive: boolean = false;

// Boolean expressions
const hasAccess: boolean = isAdmin && isActive;
const shouldNotify: boolean = !isActive;

// ❌ Type errors:
const bad1: boolean = 1;              // Numbers aren't booleans
const bad2: boolean = "true";         // Strings aren't booleans
const bad3: boolean = null;           // null isn't boolean
```

---

## 🔬 Understanding `any` vs `unknown`

### The `any` Type (Escape Hatch)

```typescript
// ANY type bypasses all checks
let value: any = "string";
console.log(value.toUpperCase());      // ✅ OK (happens to work)

value = 42;
console.log(value.toUpperCase());      // ❌ Runtime error! (42 has no toUpperCase)

// ANY means "I don't know and I'm not telling TypeScript"
// AVOID THIS!
```

### The `unknown` Type (Safe Alternative)

```typescript
// UNKNOWN type is safe - requires checking
let value: unknown = "string";

// ❌ Can't use unknown directly
console.log(value.toUpperCase());      // ERROR: Object is of type 'unknown'

// ✅ Must check first (type guard)
if (typeof value === "string") {
  console.log(value.toUpperCase());    // Now it's OK!
}
```

### Key Difference

```
any:     "I don't care about types" → Defeats TypeScript's purpose
unknown: "I don't know the type yet" → Safe, requires checking
```

---

## 💡 Type Inference: TypeScript's Superpower  

### Automatic Type Detection

```typescript
// TypeScript INFERS the type
const name = "Alice";        // type is 'string' (inferred)
const age = 30;              // type is 'number' (inferred)
const isAdmin = true;        // type is 'boolean' (inferred)

// This is equivalent to:
const name: string = "Alice";
const age: number = 30;
const isAdmin: boolean = true;

// But the first is cleaner!
```

### When Inference Works Well

```typescript
// ✅ Clear from context
const numbers = [1, 2, 3];           // Type: number[]
const mixed = [1, "two", true];      // Type: (number | string | boolean)[]
const config = { debug: true };      // Type: { debug: boolean }

// Return type inferred
function add(a: number, b: number) {
  return a + b;                       // Return type is number
}

// ✅ BUT be explicit for clarity
function processData(items: unknown[]) {
  const count = items.length;         // Type is number (clear from length)
  return count;                        // Return type: number
}
```

### When to Explicitly Annotate

```typescript
// ❌ Bad: unclear
const value = null;           // Type is 'null' (not useful)

// ✅ Good: explicit
const value: string | null = null;   // Clear intent

// ❌ Bad: returned value unclear
function getUserById(id: number) {
  // ... implementation
  return { id: 1, name: "Alice" };
}

// ✅ Good: explicit return type
function getUserById(id: number): { id: number; name: string } {
  return { id: 1, name: "Alice" };
}
```

---

## ✨ Best Practices

### ✅ DO:
1. Let inference work for obvious types
2. Explicitly type function parameters
3. Explicitly type function returns
4. Use `unknown` instead of `any`
5. Make types CLEAR

### ❌ DON'T:
1. Use `any` type
2. Let types get too complex without naming
3. Forget type annotations on functions
4. Assume types when they're unclear

---

## 🧠 Real-World Application

### For AI Engineering

```typescript
// ✅ Type-safe LLM interaction
interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

async function sendToLLM(messages: Message[]): Promise<string> {
  // TypeScript ensures:
  // - messages is definitely an array
  // - Each message has correct structure
  // - Return is definitely a string
}

// ❌ Without proper types:
async function sendToLLM(messages: any): any {
  // Runtime error! What type is messages?
  // What does this return?
}
```

### For Frontend Development

```typescript
// ✅ React props with clear types
interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

function Button(props: ButtonProps) {
  // IDE knows exactly what props contains
  // onClick handler has correct signature
  // optional disabled is clearly marked
}

// ❌ Without clear types:
function Button(props: any) {
  // What properties does props have?
  // What type is onClick?
  // Is disabled required?
}
```

---

## 🎯 Practice Exercises

### Exercise 1: Type Inference (Beginner)
Look at these values. What type does TypeScript infer?

```typescript
const a = "hello";                  // Type?
const b = 42;                       // Type?
const c = true;                     // Type?
const d = [1, 2, 3];               // Type?
const e = { name: "Alice" };        // Type?
const f = null;                     // Type?
const g = undefined;                // Type?
```

### Exercise 2: Explicit vs Inferred (Intermediate)

Decide: explicit annotation or let TypeScript infer?

```typescript
// Should this be explicit?
const config = { timeout: 5000, retries: 3 };

// Should this be explicit?
function calculatePrice(basePrice: number) {
  return basePrice * 1.1;
}

// Should this be explicit?
const users = [];
```

### Exercise 3: Fix Type Problems (Intermediate)

These code snippets have type issues. Fix them:

```typescript
// Problem 1: Unclear intent
const value = null;

// Problem 2: Using 'any'
function processData(data: any) {
  console.log(data.length);
}

// Problem 3: Type mismatch
const count: string = 42;
```

---

## ✅ Solutions

**Exercise 1: Inferred Types**
- `a`: `string`
- `b`: `number`
- `c`: `boolean`
- `d`: `number[]`
- `e`: `{ name: string }`
- `f`: `null`
- `g`: `undefined`

**Exercise 2: Annotation Decisions**
- `config`: Infer (obvious what it is)
- `calculatePrice`: Infer return (from operation)
- `users`: **Explicit!** (`Array<User>` or similar)

**Exercise 3: Fixes**
```typescript
// Problem 1 fixed
const value: string | null = null;

// Problem 2 fixed
function processData(data: unknown[]) {
  console.log(data.length);
}

// Problem 3 fixed
const count: number = 42;
```

---

## 📖 Additional Resources

- [TypeScript Handbook: Basic Types](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [TypeScript vs JavaScript](https://www.typescriptlang.org/docs/handbook/2/types-from-extraction.html)

---

## 📝 Key Takeaways

1. **Primitives:** `string`, `number`, `boolean` are the foundation
2. **Inference:** TypeScript guesses types from context
3. **Explicit Annotations:** Use when intent isn't clear
4. **Avoid `any`:** Use `unknown` instead
5. **Type Safety:** Benefits compound with your codebase size

---

## 🎯 Next: [Day 7: Variables and Constants](./Day_7_Variables_and_Constants.md)

Understand how to declare and manage data properly!
