# Day 7: Variables and Constants

## 🎯 Learning Objectives
- ✅ Understand `var`, `let`, `const` differences
- ✅ Master variable scoping
- ✅ Learn immutability concepts
- ✅ Understand shadowing and best practices

**Time:** 45 minutes | **Difficulty:** Beginner | **Prerequisites:** Days 1-6

---

## 📚 var vs let vs const

### `const` (Preferred)
```typescript
// Cannot reassign
const age = 30;
age = 31;  // ❌ ERROR

// Block scoped
if (true) {
  const local = "scoped to block";
}
console.log(local);  // ❌ ERROR: not defined

// ✅ Use const by default
const user: { name: string; age: number } = {
  name: "Alice",
  age: 30
};
user.age = 31;  // ✅ OK - modifying property
// user = {};  // ❌ ERROR - reassigning
```

### `let` (When reassignment needed)
```typescript
// Can reassign
let count = 0;
count = 1;  // ✅ OK
count++;    // ✅ OK

// Block scoped (good!)
if (true) {
  let local = "block scoped";
}
console.log(local);  // ❌ not defined

// Use when value changes
let attempts = 0;
while (attempts < 3) {
  attempts++;  // Reassignment needed
}
```

### `var` (Avoid!)
```typescript
// ❌ Function scoped (confusing!)
if (true) {
  var old = "visible outside";
}
console.log(old);  // "visible outside" - LEAKED!

// ❌ Can be redeclared
var x = 1;
var x = 2;  // No error - confusing!

// NEVER use 'var' in modern TypeScript
```

---

## 💡 Type Annotations with Variables

```typescript
// Explicit annotation
const name: string = "Alice";
let count: number = 0;
const active: boolean = true;

// Let TypeScript infer
const name = "Alice";        // Inferred: string
let count = 0;               // Inferred: number

// Key: annotate if inference is unclear
const items: (string | number)[] = [1, "two", 3];
const config: { debug: boolean; timeout: number } = {
  debug: true,
  timeout: 5000
};
```

---

## 🧠 Real-World Application

### AI Engineering
```typescript
// Configuration that shouldn't change
const MODEL_NAME = "gpt-4";
const MAX_TOKENS = 2048;

// State that changes
let retryCount = 0;

// Best practice: const config object
const chatConfig = {
  model: "gpt-4",
  temperature: 0.7,
  maxTokens: 2048
};
```

### Frontend
```typescript
// Constant values
const COLORS = { primary: "#007bff", secondary: "#6c757d" };

// Component state (will change in React)
let count = 0;

// Configuration
const APP_CONFIG = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};
```

---

## ✨ Best Practices

✅ **DO:**
1. Default to `const`
2. Use `let` only when reassignment needed
3. Never use `var`
4. Group related variables

❌ **DON'T:**
1. Reassign unnecessarily
2. Use var ever
3. Mix const/let/var styles

---

## 🎯 Quick Exercises

### Exercise 1: Choose the Right Declaration
For each, choose `const` or `let`:

```typescript
// 1. Username that won't change
___ username = "alice";

// 2. Counter that increments
___ count = 0;

// 3. Configuration object
___ config = { debug: true };
```

### Exercise 2: Spot the Error
Which lines have problems?

```typescript
const name = "Alice";
name = "Bob";  // Line 2

const numbers = [1, 2, 3];
numbers.push(4);  // Line 5

const config = { timeout: 5000 };
config.timeout = 10000;  // Line 8
```

---

## ✅ Solutions

**Exercise 1:**
1. `const username`
2. `let count`
3. `const config`

**Exercise 2:**
- Line 2: ERROR (can't reassign const)
- Line 5: OK (const doesn't prevent method calls)
- Line 8: OK (const doesn't prevent property changes)

---

## 📝 Key Takeaways
1. **const** - Default choice (variables don't reassign)
2. **let** - Use when reassignment needed
3. **var** - Never use (legacy)
4. **Immutability** - Safer, more predictable code

---

**Next:** [Day 8: Functions and Type Annotations](./Day_8_Functions_and_Type_Annotations.md)
