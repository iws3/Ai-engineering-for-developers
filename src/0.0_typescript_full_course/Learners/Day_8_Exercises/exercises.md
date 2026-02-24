# Day 8: Functions and Type Annotations - Exercises

## 📋 Exercise 1: Complete Function Signatures (Beginner)

Fill in the missing type annotations:

```typescript
// 1. Greeting function
function greet(name: ___, greeting: ___ = "Hello"): ___ {
  return `${greeting}, ${name}!`;
}

// 2. Calculate sum
function sum(...numbers: ___): ___ {
  return numbers.reduce((a, b) => a + b, 0);
}

// 3. Check if user is adult
function isAdult(age: ___): ___ {
  return age >= 18;
}

// 4. Build sentence from words
function joinWords(separator: ___, ...words: ___): ___ {
  return words.join(separator);
}
```

---

## 📋 Exercise 2: Convert to Arrow Functions (Intermediate)

Convert these to arrow functions:

```typescript
// 1.
function multiply(a: number, b: number): number {
  return a * b;
}

// 2.
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// 3.
function logMessage(msg: string): void {
  console.log(msg);
}
```

---

## 📋 Exercise 3: Fix the Function (Advanced)

What's wrong with each function? Fix them:

```typescript
// 1. Missing return type
function calculateTotal(items: number[]) {
  return items.reduce((a, b) => a + b, 0);
}

// 2. Missing parameter types
function createUser(name, email, age) {
  return { name, email, age };
}

// 3. Incorrect optional parameter placement
function buildQuery(filter: string, limit?: number, offset: number) {
  // ...
}

// 4. Missing type for rest parameter
function combineArrays(first: number[], ...rest) {
  return [first, ...rest];
}
```

---

## 🎯 Solutions

### Exercise 1 Solutions
```typescript
// 1.
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

// 2.
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

// 3.
function isAdult(age: number): boolean {
  return age >= 18;
}

// 4.
function joinWords(separator: string, ...words: string[]): string {
  return words.join(separator);
}
```

---

### Exercise 2 Solutions
```typescript
// 1.
const multiply = (a: number, b: number): number => a * b;

// 2.
const greet = (name: string): string => `Hello, ${name}!`;

// 3.
const logMessage = (msg: string): void => {
  console.log(msg);
};
```

---

### Exercise 3 Solutions
```typescript
// 1. Add return type
function calculateTotal(items: number[]): number {
  return items.reduce((a, b) => a + b, 0);
}

// 2. Add parameter types
function createUser(name: string, email: string, age: number) {
  return { name, email, age };
}

// 3. Optional parameters must come AFTER required ones
function buildQuery(filter: string, offset?: number, limit?: number) {
  // ...
}

// 4. Type the rest parameter as array
function combineArrays(first: number[], ...rest: number[][]) {
  return [first, ...rest];
}
```

---

## 📝 Submission Guidelines

✅ **Your task:**
1. Solve all three exercises
2. Create a folder: `Learners/Day_8_Exercises/Solutions/[your-github-username]/`
3. Create file: `solutions.ts` with your answers
4. Create a PR with message: `[Day 8] Functions and Type Annotations - [Your Name]`

📚 **What we're checking:**
- Can you complete function signatures?
- Do you understand arrow function syntax?
- Can you fix function errors?

🎯 **Learning outcomes:**
- Function signature mastery
- Arrow function confidence
- Type safety in function design

---

**Need help?** Check `Learners/Day_8_Exercises/Solutions/examples/` for reference solutions!
