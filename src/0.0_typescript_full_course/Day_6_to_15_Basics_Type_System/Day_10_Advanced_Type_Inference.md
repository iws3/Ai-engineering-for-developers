# Day 10: Advanced Type Inference

## 🎯 Learning Objectives
- ✅ When TypeScript infers types automatically
- ✅ Limitations of type inference
- ✅ When to use explicit annotations
- ✅ Type widening and narrowing

**Time:** 45 minutes | **Difficulty:** Intermediate | **Prerequisites:** Days 1-9

---

## 📚 Type Inference Fundamentals

### What is Type Inference?
TypeScript automatically determines the type without explicit annotation:

```typescript
// No annotation, TypeScript infers types
const name = "Alice";  // Inferred: string
const age = 30;  // Inferred: number
const active = true;  // Inferred: boolean
const items = [1, 2, 3];  // Inferred: number[]

// TypeScript "sees" the value and knows the type
const greeting = `Hello, ${name}`;  // string
const nextAge = age + 1;  // number
```

### Inference from Context
```typescript
// Function return type inferred
function add(a: number, b: number) {
  return a + b;  // Inferred: number (from addition)
}

const result = add(5, 3);  // result: number

// Array element types inferred
const mixed = ["hello", 42, true];  // (string | number | boolean)[]

// Object properties inferred
const config = {
  timeout: 5000,  // number
  debug: true,  // boolean
  name: "app"  // string
};
// config is: { timeout: number; debug: boolean; name: string }
```

---

## ⚠️ When Inference Isn't Enough

### Example: Ambiguous Types
```typescript
// Problem: Which type is correct?
const values = [1, "two", 3];  // (string | number)[]

// TypeScript had to guess - what if you meant:
// 1. An array of mixed strings/numbers?
// 2. An array that starts with number, then adds types later?

// Better: Be explicit when ambiguous
const mixedValues: (string | number)[] = [1, "two", 3];
const stringValues: string[] = ["one", "two", "three"];
```

### When to Annotate Anyway
```typescript
// ❌ Bad: Unclear intention
const config = {
  port: 3000,
  host: "localhost"
};

// ✅ Good: Clear what this object is
interface ServerConfig {
  port: number;
  host: string;
}

const config: ServerConfig = {
  port: 3000,
  host: "localhost"
};

// Reason: Readers know this is a "ServerConfig", not just any object
```

---

## 🎯 Type Widening

TypeScript makes educated guesses about types:

```typescript
// Inference: "hello" is a string (not literal "hello")
let message = "hello";  // Inferred: string
message = "world";  // ✅ OK

// Inference: 1 is a number (not literal 1)
let count = 1;  // Inferred: number
count = 2;  // ✅ OK

// Array inference: [1, 2] is number[] (not [1, 2])
let arr = [1, 2];  // Inferred: number[]
arr = [3, 4, 5];  // ✅ OK
```

### Const Narrows Types
```typescript
// const: Narrowest possible type (literal)
const DIRECTION = "north";  // Literal type: "north"
const VERSION = 1;  // Literal type: 1

// let: Wider type
let direction = "north";  // Type: string
let version = 1;  // Type: number
```

---

## 🧠 Real-World Examples

### AI Engineering
```typescript
// Inference helps with API responses
interface ApiResponse {
  status: number;
  data: string;
  timestamp: Date;
}

// Function return type inferred from response
async function fetchData(url: string) {
  const response = await fetch(url);
  return response.json();  // Inferred: Promise<any>
  // Problem: any is too loose!
}

// Better: Explicit return type
async function fetchData(url: string): Promise<ApiResponse> {
  const response = await fetch(url);
  return response.json();
}
```

### Frontend
```typescript
// Inference in React state
interface User {
  id: number;
  name: string;
  email: string;
}

// Good: Explicit type for clarity
const [user, setUser] = useState<User | null>(null);

// Problem: Without explicit type
const [data, setData] = useState(null);
// TypeScript infers: null (very limited!)

// Solution: Explicit type parameter
const [data, setData] = useState<ApiResponse | null>(null);
```

---

## 🔍 Type Narrowing

Refining types within code blocks:

```typescript
function process(value: string | number) {
  // Narrowing with typeof
  if (typeof value === "string") {
    console.log(value.length);  // value: string (safe to use string methods)
  } else {
    console.log(value.toFixed(2));  // value: number (safe to use number methods)
  }
}

// Narrowing with truthiness
function check(value: string | null) {
  if (value) {
    console.log(value.toUpperCase());  // value: string (null eliminated)
  }
}

// Narrowing with instanceof
class Dog {
  bark() {}
}

function animal(obj: Dog | string) {
  if (obj instanceof Dog) {
    obj.bark();  // obj: Dog (safe to call bark)
  }
}
```

---

## ✨ Best Practices

✅ **DO:**
1. Let TypeScript infer simple types (`const x = 5`)
2. Annotate function parameters explicitly
3. Annotate function return types explicitly
4. Annotate when type is ambiguous
5. Use `as const` for literal types when needed

❌ **DON'T:**
1. Annotate everything (over-engineering)
2. Rely on inference for complex types
3. Use `any` when inference fails
4. Create overly permissive types

---

## 🎯 Quick Exercises

### Exercise 1: Inference or Annotation?
For each, say if TypeScript can infer the type or if you need to annotate:

```typescript
// 1
const user = { name: "Alice", age: 30 };

// 2
function getValue() {
  return Math.random() > 0.5 ? "hello" : 123;
}

// 3
const items = [];  // What's the type?
```

### Exercise 2: Fix the Inference Problem
```typescript
// Problem: What type is config?
const config = {
  port: 3000,
  debug: true,
  retries: 3
};

// Now add a property
config.timeout = 5000;

// Is this valid? Should we annotate config?
```

### Exercise 3: Type Narrowing
```typescript
function process(value: string | number | boolean) {
  // Fill in the conditions
  if (___) {
    console.log(value.length);  // string
  } else if (___) {
    console.log(value.toFixed(2));  // number
  } else {
    console.log(value);  // boolean
  }
}
```

---

## ✅ Solutions

**Exercise 1:**
1. ✅ Can infer - object literal with clear properties
2. ❌ Need to annotate - return type unclear (string | number)
3. ❌ Need to annotate - empty array type is `never[]` (unclear intent)

**Exercise 2:**
```typescript
// Inference creates: { port: number; debug: boolean; retries: number }
// Then adding timeout fails!

// Better:
interface Config {
  port: number;
  debug: boolean;
  retries: number;
  timeout?: number;
}

const config: Config = {
  port: 3000,
  debug: true,
  retries: 3
};

config.timeout = 5000;  // ✅ OK
```

**Exercise 3:**
```typescript
if (typeof value === "string") {
  console.log(value.length);
} else if (typeof value === "number") {
  console.log(value.toFixed(2));
} else {
  console.log(value);
}
```

---

## 📝 Key Takeaways
1. **Inference is great** - Let TypeScript guess simple types
2. **Annotate parameters** - Always type function inputs
3. **Annotate returns** - Always type function outputs
4. **Annotate when ambiguous** - Be explicit for clarity
5. **Type narrowing** - Refine types with conditionals

---

**Next:** [Day 11: Union and Intersection Types](./Day_11_Union_and_Intersection_Types.md)
