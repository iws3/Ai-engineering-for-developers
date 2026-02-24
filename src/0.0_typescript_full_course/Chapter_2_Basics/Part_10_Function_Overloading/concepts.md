# Part 10: Function Overloading (Beginner Deep Dive)

## 🎯 Function Overloading
**Function overloading** allows a function to have multiple signatures:

```typescript
// Overload signatures
function greet(name: string): string;
function greet(name: string, age: number): string;

// Implementation
function greet(name: string, age?: number): string {
  if (age) {
    return `Hello, ${name}! You are ${age} years old.`;
  }
  return `Hello, ${name}!`;
}

greet("Alice");        // ✅ OK
greet("Bob", 30);      // ✅ OK
greet("Charlie", "30"); // ❌ ERROR: age must be number
```

---

## 📋 Realistic Example

```typescript
// Overloads: Different input types
function parse(data: string): string[];
function parse(data: string[]): string;

// Implementation: handles both
function parse(data: string | string[]): string | string[] {
  if (typeof data === "string") {
    return data.split(",");
  } else {
    return data.join(",");
  }
}

parse("a,b,c");        // Returns: ["a", "b", "c"]
parse(["x", "y", "z"]); // Returns: "x,y,z"
```

---

## 🏷️ Important Terms
- **Function Overloading**
- **Overload Signature**
- **Implementation Signature**

---

## 📚 Resources
- [Function Overloading](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)
