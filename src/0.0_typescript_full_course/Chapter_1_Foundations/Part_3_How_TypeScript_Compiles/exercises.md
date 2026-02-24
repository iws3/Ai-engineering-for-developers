# Part 3: How TypeScript Compiles — Exercises

## Exercise 1: Observe Type Erasure (Beginner)
Create a TypeScript file `example.ts`:
```typescript
let count: number = 10;
const message: string = "Hello";
const isValid: boolean = true;
```

1. Compile it: `tsc example.ts`
2. Open the generated `example.js`
3. Write down: What happened to the type annotations?

---

## Exercise 2: Source Maps (Beginner)
1. Create `debug.ts`:
```typescript
const greeting: string = "Welcome to TypeScript!";
console.log(greeting);
```

2. Compile with source maps: `tsc debug.ts --sourceMap`
3. List the files created (what's the .map file?)

---

## Exercise 3: Fix Type Errors Before Compilation (Intermediate)
Try to compile this file. What error do you get?

```typescript
// error.ts
let name: string = 42;
name.toUpperCase();
```

1. What error message does TypeScript show?
2. Fix the type error and compile again

---

## Exercise 4: Understand the Pipeline (Intermediate)
Write out the 4 steps of compilation in your own words:
1. Tokenization
2. Parsing
3. Semantic Analysis
4. Code Generation

---

## Challenge: Trace Compilation (Advanced)
1. Create a file with mixed types:
```typescript
let age: number = 25;
let name: string = "Alice";
age = name; // This should cause an error
```

2. Try to compile
3. Explain what went wrong and why TypeScript caught it BEFORE generating .js

---

## 📝 Submission
- Show the compiled .js files
- Explain type erasure in your own words
- Document the compilation errors you encountered
