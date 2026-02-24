# Day 8: Functions and Type Annotations

## 🎯 Learning Objectives
- ✅ Type parameters and return types
- ✅ Optional and default parameters
- ✅ Rest parameters and overloading basics
- ✅ Arrow functions vs function declarations

**Time:** 45 minutes | **Difficulty:** Beginner | **Prerequisites:** Days 1-7

---

## 📚 Function Basics

### Function Declaration with Types
```typescript
// Parameter types + return type
function greet(name: string, age: number): string {
  return `Hi ${name}, age ${age}`;
}

greet("Alice", 30);  // ✅ OK
greet("Alice", "30");  // ❌ ERROR: age must be number
greet("Alice");  // ❌ ERROR: missing age parameter
```

### Optional Parameters
```typescript
function describe(name: string, nickname?: string): string {
  return nickname ? `${name} (${nickname})` : name;
}

describe("Alice");  // ✅ OK - "Alice"
describe("Alice", "Ali");  // ✅ OK - "Alice (Ali)"
```

### Default Parameters
```typescript
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

greet("Alice");  // "Hello, Alice!"
greet("Alice", "Hi");  // "Hi, Alice!"
```

---

## Arrow Functions

```typescript
// Traditional
const add = function(a: number, b: number): number {
  return a + b;
};

// Arrow function
const add = (a: number, b: number): number => a + b;

// Parentheses optional for single param
const square = (x: number): number => x * x;

// Complex body
const calculate = (a: number, b: number): number => {
  const sum = a + b;
  return sum * 2;
};
```

---

## Rest Parameters

```typescript
// Collect multiple arguments
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4);  // 10
sum(1, 2);  // 3

// Mixed parameters
function buildString(prefix: string, ...items: string[]): string {
  return `${prefix}: ${items.join(", ")}`;
}

buildString("Tags", "TypeScript", "JavaScript");  // "Tags: TypeScript, JavaScript"
```

---

## 🧠 Real-World Examples

### AI Engineering
```typescript
// Flexible parameter handling
function callLLM(
  prompt: string,
  model: string = "gpt-4",
  temperature: number = 0.7,
  ...options: string[]
): Promise<string> {
  // Send to API
  return Promise.resolve(`Response from ${model}`);
}

// Usage variations
callLLM("What is AI?");
callLLM("What is AI?", "gpt-3.5");
callLLM("What is AI?", "gpt-4", 0.5, "--streaming", "--verbose");
```

### Frontend
```typescript
// React-style event handler
const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
  console.log("Clicked");
};

// Utility function
const formatPrice = (price: number, currency: string = "USD"): string => {
  return `${currency} ${price.toFixed(2)}`;
};

formatPrice(99.5);  // "USD 99.50"
formatPrice(99.5, "EUR");  // "EUR 99.50"
```

---

## ✨ Best Practices

✅ **DO:**
1. Always type parameters explicitly
2. Always specify return types
3. Use arrow functions for callbacks
4. Use default parameters for common cases

❌ **DON'T:**
1. Rely on type inference for function params
2. Use `any` in function signatures
3. Have functions without return type annotation

---

## 🎯 Quick Exercises

### Exercise 1: Type the Function
Complete the function signature:

```typescript
function calculatePrice(quantity: ___, pricePerUnit: ___, tax: ___ = 0.1): ___ {
  return (quantity * pricePerUnit) * (1 + tax);
}

// Should work:
calculatePrice(2, 50);  // 110
calculatePrice(2, 50, 0.2);  // 120
```

### Exercise 2: Arrow vs Regular
Convert to arrow function:

```typescript
function multiply(a: number, b: number): number {
  return a * b;
}
```

### Exercise 3: Rest Parameters
Create a function that concatenates strings:

```typescript
// Function signature needed
function ___(separator: string, ...words: ???): ??? {
  return words.join(separator);
}

// Usage:
joinWith("-", "hello", "world");  // "hello-world"
joinWith(", ", "a", "b", "c");  // "a, b, c"
```

---

## ✅ Solutions

**Exercise 1:**
```typescript
function calculatePrice(
  quantity: number,
  pricePerUnit: number,
  tax: number = 0.1
): number {
  return (quantity * pricePerUnit) * (1 + tax);
}
```

**Exercise 2:**
```typescript
const multiply = (a: number, b: number): number => a * b;
```

**Exercise 3:**
```typescript
function joinWith(separator: string, ...words: string[]): string {
  return words.join(separator);
}
```

---

## 📝 Key Takeaways
1. **Always type parameters** - No guessing what goes in
2. **Always type returns** - Clear contract
3. **Use arrow functions** - Modern, cleaner syntax
4. **Default parameters** - Reduce boilerplate
5. **Rest parameters** - Flexible argument handling

---

**Next:** [Day 9: Objects and Interfaces](./Day_9_Objects_and_Interfaces.md)
