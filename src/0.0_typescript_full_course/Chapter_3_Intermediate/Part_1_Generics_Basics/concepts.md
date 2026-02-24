# Part 1: Generics Basics (Intermediate)

## ÌæØ Learning Objectives
- Understand what generics are and why they matter
- Write generic functions and generic types
- Use type variables (<T>) to create reusable code
- Apply generics to real-world AI and frontend scenarios
- Distinguish between generics and the `any` type

---

## Ìø∑Ô∏è Key Terms to Remember

- **Generic**: A way to write reusable code that works with multiple types
- **Type Variable** (or **Type Parameter**): A placeholder for a type (usually T, U, K)
- **Constraint**: A limitation on what types a generic can accept (using extends)
- **Concrete Type**: The actual type used when calling a generic function
- **Polymorphism**: The ability to work with multiple types

> **Beginner Note**: Generics let you write "templates" for code that work with any type, while still maintaining full type safety. Think of them like function parameters, but for types instead of values!

---

## Ì≥ñ Understanding Generics

### What Problem Do Generics Solve?

Imagine you're building an AI chat application and need functions that work with **any data type**. Without generics:

\`\`\`typescript
// ‚ùå Bad approach - lots of duplication
function identifyString(value: string): string { return value; }
function identifyNumber(value: number): number { return value; }
function identifyBoolean(value: boolean): boolean { return value; }
\`\`\`

With generics:

\`\`\`typescript
// ‚úÖ Good approach - one reusable function
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello");  // Works with string
identity<number>(42);       // Works with number
identity<boolean>(true);    // Works with boolean
\`\`\`

### How Generics Work

A **generic function** uses a **type variable** (usually T) which acts like a placeholder:

\`\`\`typescript
// <T> = "accept any type"
function processData<T>(data: T): T {
  console.log(data);
  return data;
}

// TypeScript infers T as string
const result = processData("AI");
// result has type: string

// TypeScript infers T as number
const numberResult = processData(42);
// numberResult has type: number
\`\`\`

---

## Ìæì Deep Concepts

### 1. Generic Functions

\`\`\`typescript
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const strings = wrapInArray("hello");  // Type: string[]
const numbers = wrapInArray(42);       // Type: number[]
\`\`\`

### 2. Generic Types (Interfaces)

\`\`\`typescript
interface Container<T> {
  value: T;
  getValue(): T;
}

interface APIResponse<T> {
  status: "success" | "error";
  data?: T;
  error?: string;
}
\`\`\`

### 3. Multiple Type Variables

\`\`\`typescript
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}
\`\`\`

### 4. Generic Constraints

\`\`\`typescript
// Only accept types with a length property
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength("hello");      // Works
getLength([1, 2, 3]);    // Works  
getLength(42);           // Error
\`\`\`

### 5. Default Types

\`\`\`typescript
interface Config<T = string> {
  value: T;
  timeout: number;
}

const stringConfig: Config = {
  value: "default",
  timeout: 5000
};
\`\`\`

---

## Ì≤° Real-World Applications

### AI Engineering: Chat Message Handler

\`\`\`typescript
interface Message<T> {
  role: "user" | "assistant";
  content: T;
  timestamp: Date;
}

function processMessage<T>(message: Message<T>): string {
  if (typeof message.content === "string") {
    return \`Message: \${message.content}\`;
  }
  return \`Message: \${JSON.stringify(message.content)}\`;
}
\`\`\`

### Frontend: Form State Manager

\`\`\`typescript
interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isDirty: boolean;
  isSubmitting: boolean;
}

function updateFormState<T>(
  state: FormState<T>,
  field: keyof T,
  value: unknown
): FormState<T> {
  return {
    ...state,
    values: { ...state.values, [field]: value },
    isDirty: true
  };
}
\`\`\`

---

## ‚ö†Ô∏è Generics vs `any`

| Feature | Generics | any |
|---------|----------|-----|
| Type Safety | ‚úÖ Full | ‚ùå None |
| IDE Support | ‚úÖ Yes | ‚ùå No |

---

## Ì≥ö Resources & Next Steps

- [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)

## ‚úÖ Checklist

- [ ] Understand what generics are
- [ ] Write generic functions
- [ ] Create generic interfaces
- [ ] Use constraints
- [ ] Complete exercises
