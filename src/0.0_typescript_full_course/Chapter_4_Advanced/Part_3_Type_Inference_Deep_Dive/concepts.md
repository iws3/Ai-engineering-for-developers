# Part 3: Type Inference Deep Dive (Advanced Deep Dive)

## Learning Objectives

After this part you'll understand:
- How TypeScript infers types contextually
- `typeof`, `instanceof`, and type guards
- Generic type inference
- Conditional types for advanced inference
- Type narrowing techniques

---

## Contextual Type Inference

TypeScript infers types from context:

```typescript
// Inferred from assignment
const name = "Alice";  // string
const age = 30;        // number
const active = true;   // boolean

// Inferred from function return
function getUser(): User {
  return { name: "Bob", age: 25 }; // must match User
}

// Inferred from array
const nums = [1, 2, 3];  // number[]
const mixed = [1, "a"];  // (number | string)[]
```

---

## Type Guards

Narrow types in conditional blocks:

```typescript
function process(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();  // string methods
  } else {
    return value.toFixed(2);     // number methods
  }
}

// instanceof
class Dog {
  bark(): void { }
}

function makeSound(animal: Dog | Bird) {
  if (animal instanceof Dog) {
    animal.bark();
  }
}

// Custom type guard
function isUser(obj: any): obj is User {
  return obj && typeof obj.name === "string";
}

if (isUser(data)) {
  console.log(data.name);  // data is User
}
```

---

## Generic Type Inference

```typescript
// Infer return type
function first<T>(arr: T[]): T {
  return arr[0];
}

const firstNum = first([1, 2, 3]);  // inferred as number
const firstStr = first(["a", "b"]);  // inferred as string

// Infer from multiple parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ a: 1 }, { b: "hello" });
// merged is { a: number } & { b: string }
```

---

## Conditional Types

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">;      // true
type B = IsString<number>;       // false

// Practical: Extract promise value
type Unwrap<T> = T extends Promise<infer U> ? U : T;

type NumPromise = Unwrap<Promise<number>>;  // number
type Str = Unwrap<string>;                  // string
```

---

## Type Narrowing

```typescript
// Union narrowing
type Status = "pending" | "success" | "error";

function handle(status: Status) {
  if (status === "pending") {
    // status is "pending" here
  } else if (status === "success") {
    // status is "success" here
  }
}

// Optional narrowing
function process(obj: { name?: string }) {
  if (obj.name) {
    console.log(obj.name.toUpperCase());  // safe
  }
}
```

---

## Advanced Inference Patterns

```typescript
// Infer from object literal
const config = {
  host: "localhost",
  port: 3000
} as const;  // type is literal, not general

// Extract type from array
type ArrayElement<T> = T extends (infer E)[] ? E : never;

type NumArray = ArrayElement<number[]>;  // number
```

---

## Checklist

- [ ] Understand contextual type inference
- [ ] Know `typeof` and `instanceof` guards
- [ ] Use custom type guards
- [ ] Apply generic inference
- [ ] Understand conditional types
- [ ] Master type narrowing
