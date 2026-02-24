# Part 2: Variables and Constants — Exercises

## Exercise 1: const vs let (Beginner)
For each scenario, write `const` or `let`:

```typescript
// 1. API endpoint that never changes
___ API_URL = "https://api.example.com";

// 2. Counter in a loop
___ count = 0;

// 3. Configuration object
___ config = { debug: true };

// 4. Variable that will be reassigned multiple times
___ result = calculateValue();
```

---

## Exercise 2: Spot the Errors (Beginner)
Which have errors?

```typescript
const name = "Alice";
name = "Bob";           // Line 2: ERROR or OK?

const list = [1, 2, 3];
list.push(4);           // Line 5: ERROR or OK?

const config = { timeout: 5000 };
config.timeout = 10000; // Line 8: ERROR or OK?
```

---

## Exercise 3: Scope Problems (Intermediate)
Identify scope issues:

```typescript
const global = "I'm global";

function testScope() {
  const local = "I'm local";
  console.log(global);  // Will this work?
  console.log(local);   // Will this work?
}

console.log(global);    // Will this work?
console.log(local);     // Will this work?
```

---

## Exercise 4: Block Scope (Intermediate)
What gets printed?

```typescript
let x = "outer";

if (true) {
  let x = "inner";
  console.log(x);  // What prints?
}

console.log(x);    // What prints?
```

---

## Challenge: Write const/let Rules (Advanced)
Create your own naming convention and scoping rules. For example:
- When to use UPPERCASE for constants
- When to keep variables in smallest scope
- How to name variables

---

## 📝 Submission
- Show your const/let choices from Exercise 1
- Explain the errors in Exercise 2
- Draw a diagram showing scope from Exercise 3
