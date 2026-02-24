# Part 5: Advanced Type Inference — Exercises

## Exercise 1: Identify Inferred Types (Beginner)
What type does TypeScript infer for each?

```typescript
const username = "alice";
const score = 95;
const cards = ["A", "K", "Q"];
const config = { debug: true, port: 3000 };
const values = [1, "two", true];
```

---

## Exercise 2: Type Widening Problems (Beginner)
What happens when you try to reassign?

```typescript
let direction = "north";
direction = 42;  // Will this work?

let count = 5;
count = "five";  // Will this work?

let active = true;
active = 1;      // Will this work?
```

---

## Exercise 3: Fix Inference Errors (Intermediate)
These have inference problems. Write explicit types:

```typescript
// Problem: Unclear what kind of array this is
const items = [];

// Problem: Object structure is unclear
const response = {
  status: 200,
  data: null
};

// Problem: Return type unclear
function calculate(x: number) {
  if (x > 0) return "positive";
  return false;
}
```

---

## Exercise 4: Type Narrowing (Intermediate)
Complete the function with type narrowing:

```typescript
function process(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if  (typeof value === "number") {
    return value.toFixed(2);
  } else {
    return String(value);
  }
}
```

---

## Challenge: Understand Inference & Annotation (Advanced)
Create 3 examples where:
1. Inference works perfectly (no annotation needed)
2. Inference is unclear (annotation needed)
3. You use inference with type narrowing

---

## 📝 Submission
- List inferred types from Exercise 1
- Explain what went wrong in Exercise 2
- Show your explicit types from Exercise 3
- Demonstrate type narrowing understanding
