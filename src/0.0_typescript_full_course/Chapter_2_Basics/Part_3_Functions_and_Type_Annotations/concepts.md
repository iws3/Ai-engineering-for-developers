# Part 3: Functions and Type Annotations (Beginner Deep Dive)

## 🎯 What is a Function?
A **function** is reusable code that accepts inputs and produces outputs.

---

## 📝 Key Terms
- **Parameter:** An input to a function
- **Argument:** The actual value passed to a function
- **Return Type:** What a function outputs
- **Arrow Function:** Shorthand function syntax `(params) => result`
- **Function Signature:** The complete declaration including types

---

## 📐 Function Syntax

### Traditional Function
```typescript
function add(a: number, b: number): number {
  return a + b;
}

add(2, 3);  // Returns 5
```

**Reading the signature:**
- `add` - Function name
- `(a: number, b: number)` - Parameters with types
- `: number` - Return type
- `return` - What gets output

---

### Arrow Function (Modern & Preferred)
```typescript
const multiply = (a: number, b: number): number => a * b;

multiply(4, 5);  // Returns 20
```

**Advantages:**
- More concise
- Modern ES6 syntax
- Better for callbacks

---

## 🔄 Return Types

```typescript
// Returns a number
function count(): number {
  return 42;
}

// Returns a string
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Returns nothing (void)
function logMessage(msg: string): void {
  console.log(msg);
  // No return statement
}

// Returns a boolean
function isEven(x: number): boolean {
  return x % 2 === 0;
}
```

---

## 📥 Parameter Types

### Required Parameters
```typescript
function introduce(name: string, age: number): string {
  return `I'm ${name}, age ${age}`;
}

introduce("Alice", 30);      // ✅ OK
introduce("Bob");            // ❌ ERROR: missing age
```

### Optional Parameters
```typescript
function greet(name: string, nickname?: string): string {
  if (nickname) {
    return `hello, ${name} (${nickname})!`;
  }
  return `hello, ${name}!`;
}

greet("Alice");           // ✅ OK
greet("Alice", "Ali");    // ✅ OK
```

### Default Parameters
```typescript
function introduce(
  name: string,
  greeting: string = "Hello"
): string {
  return `${greeting}, ${name}!`;
}

introduce("Alice");           // Uses default: "Hello, Alice!"
introduce("Bob", "Hi");       // Uses provided: "Hi, Bob!"
```

---

## 💪 Rest Parameters

Collect multiple arguments into an array:

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4);     // Returns 10
sum(10, 20);         // Returns 30
```

---

## 🎯 Real-World Examples

```typescript
// Calculate discount
const applyDiscount = (
  price: number,
  discount: number = 0.1
): number => price * (1 - discount);

applyDiscount(100);      // 90 (10% off)
applyDiscount(100, 0.2); // 80 (20% off)

// Format message with variable arguments
const buildMessage = (
  prefix: string,
  ...words: string[]
): string => `${prefix}: ${words.join(", ")}`;

buildMessage("Welcome", "to", "TypeScript");
// Output: "Welcome: to, TypeScript"
```

---

## 🏷️ Important Terms
- **Function Signature**
- **Parameter**
- **Return Type**
- **Arrow Function**
- **Optional Parameters**
- **Rest Parameters**

---

## 📚 Resources
- [TypeScript Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

---

## ✅ Best Practice Checklist
- [ ] Always annotate parameter types
- [ ] Always specify return types
- [ ] Use arrow functions for modern code
- [ ] Use optional parameters judiciously
- [ ] Document what functions do

