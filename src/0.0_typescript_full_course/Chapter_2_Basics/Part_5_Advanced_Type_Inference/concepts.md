# Part 5: Advanced Type Inference (Beginner Deep Dive)

## 🎯 What is Type Inference?
**Type inference** is when TypeScript automatically determines a variable's type without you explicitly declaring it.

---

## 📝 Key Terms
- **Inference:** TypeScript guesses your type from the value
- **Explicit Annotation:** You manually declare the type
- **Type Widening:** Inferring a broader type than you intended
- **Type Narrowing:** Refining a type to be more specific
- **Literal Type:** The exact value (not just the type)

---

## 🔮 Basic Inference

```typescript
// No annotation needed - TypeScript knows!
const name = "Alice";        // Inferred: string
const age = 30;              // Inferred: number
const active = true;         // Inferred: boolean
const items = [1, 2, 3];     // Inferred: number[]
```

**Why it works:** TypeScript sees the value and knows the type.

---

## 🎯 Inference from Functions

```typescript
function add(a: number, b: number) {
  return a + b;
}

// Type is INFERRED as: (a: number, b: number) => number

const result = add(5, 3);  // result: number (inferred!)
```

Even without explicit return type, TypeScript infers it!

---

## ⚠️ When Inference Fails

```typescript
// Problem: What type is this?
const mixed = [1, "hello", true];  // Inferred: (number | string | boolean)[]

// Unclear intent
const config = {
  port: 3000,
  debug: true
};  // What if you want to add 'host' later?

// Better: Be explicit when the intent is unclear
interface ServerConfig {
  port: number;
  debug: boolean;
  host?: string;
}

const config: ServerConfig = {};  // Now it's clear!
```

---

## 🎯 Type Widening

TypeScript makes educated guesses:

```typescript
// Inference: "hello" →  string (not the literal "hello")
let message = "hello";
message = "world";  // ✅ OK

// Inference: 1 → number (not the literal 1)
let count = 1;
count = 2;          // ✅ OK

// Inference: true → boolean (not the literal true)
let active = true;
active = false;     // ✅ OK
```

---

## 🔒 `const` Narrows to Literal

```typescript
const MESSAGE = "Hello";    // Type: literal "Hello"
MESSAGE = "World";          // ❌ ERROR

let message = "Hello";      // Type: string
message = "World";          // ✅ OK
```

---

## 🔍 Type Narrowing with Conditionals

```typescript
function process(value: string | number) {
  if (typeof value === "string") {
    // In this block, value is narrowed to: string
    console.log(value.toUpperCase());  // ✅ OK
  } else {
    // In this block, value is narrowed to: number
    console.log(value.toFixed(2));    // ✅ OK
  }
}
```

---

## 📦 Real-World Inference

```typescript
// API response type is inferred
async function fetchUser(id: number) {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  // data: unknown (TypeScript can't know the structure)
  return data;
}

// Better: Explicitly type the response
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

---

## 🏷️ Important Terms
- **Type Inference**
- **Explicit Annotation**
- **Type Widening**
- **Type Narrowing**
- **Literal Type**

---

## 📚 Resources
- [TypeScript Type Inference](https://www.typescriptlang.org/docs/handbook/type-narrowing.html)
- [Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

---

## ✅ Best Practice Checklist
- [ ] Let TypeScript infer simple types
- [ ] Annotate function parameters always
- [ ] Annotate function returns
- [ ] Annotate when intent is unclear
- [ ] Use type narrowing in conditionals

