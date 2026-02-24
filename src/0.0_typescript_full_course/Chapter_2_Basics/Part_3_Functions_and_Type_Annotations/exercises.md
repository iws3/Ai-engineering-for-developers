# Part 3: Functions and Type Annotations — Exercises

## Exercise 1: Complete Function Signatures (Beginner)
Fill in the missing type annotations:

```typescript
function greet(name: ___, greeting: ___ = "Hello"): ___ {
  return `${greeting}, ${name}!`;
}

function isAdult(age: ___): ___ {
  return age >= 18;
}

function combine(items: ___, separator: ___): ___ {
  return items.join(separator);
}
```

---

## Exercise 2: Convert to Arrow Functions (Beginner)
Rewrite as arrow functions:

```typescript
// 1.
function multiply(a: number, b: number): number {
  return a * b;
}

// 2.
function isPositive(x: number): boolean {
  return x > 0;
}

// 3.
function printMessage(msg: string): void {
  console.log(msg);
}
```

---

## Exercise 3: Optional and Default Parameters (Intermediate)
Fix the bugs:

```typescript
// Parameters are in wrong order
function search(
  query: string,
  limit?: number,
  offset: number
): string[] {
  // ...
}

// Missing return type
function calculateTotal(price: number, tax: number = 0.1) {
  return price * (1 + tax);
}
```

---

## Exercise 4: Rest Parameters (Intermediate)
What does this function do?

```typescript
function buildString(separator: string, ...words: string[]): string {
  return words.join(separator);
}

buildString("-", "hello", "world", "!");
// What does it return?
```

---

## Challenge: Design Your Own Functions (Advanced)
Create functions for:
1. Convert Celsius to Fahrenheit (with optional rounding)
2. Find maximum number from multiple arguments
3. Build a query string from key-value pairs

---

## 📝 Submission
- Show all function signatures with correct types
- Convert all functions to arrow syntax
- Explain optional vs default parameters
