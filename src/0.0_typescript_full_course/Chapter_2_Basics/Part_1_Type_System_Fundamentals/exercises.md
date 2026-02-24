# Part 1: Type System Fundamentals — Exercises

## Exercise 1: Type Identification (Beginner)
What is the type of each value?

```typescript
const value1 = "hello";
const value2 = 42;
const value3 = true;
const value4 = [1, 2, 3];
const value5 = null;
```

Write down: What type does TypeScript infer for each?

---

## Exercise 2: Fix Type Errors (Beginner)
Identify and fix the type errors:

```typescript
let name: string = 42;
let count: number = "ten";
let active: boolean = 1;
let items: number[] = [1, "two", 3];
```

---

## Exercise 3: Type Annotations (Intermediate)
Add type annotations to these variables:

```typescript
const greeting = "Hello";
const score = 95;
const passed = true;
const numbers = [10, 20, 30];
```

---

## Exercise 4: Array Types (Intermediate)
Create arrays with specific types:

```typescript
// An array of strings
___ colors = ["red", "green", "blue"];

// An array of numbers
___ ages = [25, 30, 35];

// An array of mixed strings and numbers
___ mixed = [1, "two", 3, "four"];
```

---

## Challenge: Understand any (Advanced)
1. Write a function that accepts `any` type
2. Pass different types to it
3. Explain why `any` is dangerous
4. Try rewriting without `any`

```typescript
function process(value: any) {
  console.log(value.toUpperCase());  // Works with any, but will crash!
}

process(42);  // ⚠️ Crashes at runtime!
```

---

## 📝 Submission
- List the inferred types from Exercise 1
- Show your fixed code from Exercise 2
- Explain why type safety matters
