# Day 6: Type System Fundamentals - Exercises

## 🟢 Exercise 1: Type Inference (Beginner)

Create a file and determine the types. Write your answers in markdown:

```typescript
const greeting = "Hello";
const count = 42;
const active = true;
const items = [1, 2, 3];
const user = { id: 1, name: "Alice" };
const result = null;
```

**Question:** What type is each variable?

---

## 🟡 Exercise 2: Annotation Challenge (Intermediate)

Write these with proper type annotations:

```typescript
function describe(value) {
  // Should return a string description
  return `Value: ${value}`;
}

function add(a, b) {
  // Takes two numbers, returns number
  return a + b;
}

const config = {
  timeout: 5000,
  retries: 3,
  debug: false
};
```

---

## 🔴 Exercise 3: Any vs Unknown (Advanced)

Compare these approaches:

```typescript
// Approach 1: Using 'any'
function processAny(data: any) {
  console.log(data.toUpperCase());  // What if data isn't string?
}

// Approach 2: Using 'unknown'  
function processUnknown(data: unknown) {
  // How would you safely use data?
}

// Write processUnknown properly with type guards
```

**Submit exercises to:** `Learners/Day_6_Exercises/Solutions/YOUR-GITHUB-USERNAME/`
