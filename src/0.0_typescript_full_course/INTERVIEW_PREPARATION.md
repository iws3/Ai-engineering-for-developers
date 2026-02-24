# TypeScript Interview Preparation Guide

Prepare for TypeScript interviews with this comprehensive guide!

---

## Common Interview Questions

### 1. What is TypeScript and why would you use it?

**Answer**:
TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Key benefits:
- **Type Safety**: Catches errors at compile-time, not runtime
- **Better IDE Support**: Autocomplete and refactoring tools work better
- **Self-Documenting**: Types document what data structures to expect
- **Scales Well**: Easier to maintain large codebases
- **Advanced Features**: Generics, interfaces, decorators

**Example**:
```typescript
// JavaScript - Error at runtime
function getUser(id) {
  return users[id];  // What if id is a string?
}

// TypeScript - Error at compile-time
function getUser(id: number): User {
  return users[id];  // id MUST be number
}
```

---

### 2. Explain the difference between `interface` and `type`

**Answer**:

| Feature | Interface | Type |
|---------|-----------|------|
| Can describe objects | ✅ Yes | ✅ Yes |
| Can describe primitives | ❌ No | ✅ Yes |
| Unions | ❌ No | ✅ Yes |
| Inheritance | ✅ extends | ✅ & intersection |
| Merging | ✅ Auto-merges | ❌ No |

**When to use**:
- **Interface**: Object shapes, class contracts
- **Type**: Unions, primitives, complex shapes

---

### 3. What is a generic? Provide an example.

**Answer**:
Generics allow functions and types to work with multiple types while maintaining type safety.

```typescript
// Function generic
function first<T>(array: T[]): T {
  return array[0];
}

const num = first([1, 2, 3]);    // Type: number
const str = first(["a", "b"]);   // Type: string

// Interface generic
interface Container<T> {
  value: T;
  getValue(): T;
}

const numContainer: Container<number> = {
  value: 42,
  getValue() { return this.value; }
};
```

---

### 4. What does `keyof` do?

**Answer**:
`keyof` creates a union type of object property names.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type UserKeys = keyof User;  // "id" | "name" | "email"

function getProperty<T>(obj: T, key: keyof T) {
  return obj[key];  // Type-safe!
}

getProperty(user, "id");     // ✅ Valid
getProperty(user, "age");    // ❌ Error - age not in User
```

---

### 5. Explain utility types: `Partial`, `Required`, `Readonly`

**Answer**:

```typescript
interface User {
  id: number;
  name: string;
}

// Partial - All fields optional
type PartialUser = Partial<User>;
// { id?: number; name?: string; }

// Required - All fields required
type RequiredUser = Required<User>;
// { id: number; name: string; }

// Readonly - All fields readonly
type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; }

// Pick - Select specific fields
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string; }

// Omit - Exclude specific fields
type UserUpdate = Omit<User, "id">;
// { name: string; }
```

---

### 6. What is a discriminated union?

**Answer**:
A pattern where a shared literal property determines the structure.

```typescript
type Result =
  | { success: true; data: string }
  | { success: false; error: string };

function handle(result: Result) {
  if (result.success) {
    // TypeScript knows result has 'data'
    console.log(result.data);
  } else {
    // TypeScript knows result has 'error'
    console.log(result.error);
  }
}
```

Benefits:
- Type-safe branching
- No runtime checks needed
- IDE autocomplete knows available properties

---

### 7. Explain `extends` in TypeScript

**Answer**:
`extends` has multiple meanings depending on context:

```typescript
// 1. Class inheritance
class Animal {
  move() { }
}
class Dog extends Animal {
  bark() { }
}

// 2. Interface inheritance
interface Nameable {
  name: string;
}
interface Person extends Nameable {
  age: number;
}

// 3. Generic constraints
function example<T extends Animal>(animal: T) {
  animal.move();  // T must have move method
}

// 4. Conditional types
type IsString<T> = T extends string ? true : false;
type A = IsString<"hello">;  // true
type B = IsString<number>;   // false
```

---

### 8. What is a type guard?

**Answer**:
A function that narrows a union type to a more specific type.

```typescript
//  Example 1: typeof guard
function process(value: string | number) {
  if (typeof value === "string") {
    value.toUpperCase();  // TypeScript knows it's string
  } else {
    value.toFixed(2);     // TypeScript knows it's number
  }
}

// Example 2: Custom type guard
interface User {
  type: "user";
  name: string;
}

interface Admin {
  type: "admin";
  permissions: string[];
}

function isAdmin(person: User | Admin): person is Admin {
  return person.type === "admin";
}

const person: User | Admin = getEntity();
if (isAdmin(person)) {
  console.log(person.permissions);  // Safe!
}
```

---

### 9. What is the `any` type and when should you use it?

**Answer**:
`any` disables type checking for a value.

```typescript
// ❌ Bad - defeats purpose of TypeScript
const data: any = getData();
console.log(data.something);  // No type checking

// ✅ Better - use unknown
const data: unknown = getData();
if (typeof data === "object" && "something" in data) {
  console.log(data.something);  // Type-checked
}

// ✅ Best - use proper types
interface Data {
  something: string;
}
const data: Data = getData();
console.log(data.something);  // Full type safety
```

**When to use `any`**:
- Third-party libraries without types
- Gradual migration from JavaScript
- Extremely rare edge cases

---

### 10. How do you make a type immutable?

**Answer**:

```typescript
// Using Readonly
interface Config {
  readonly apiUrl: string;
  readonly maxRetries: number;
}

const config: Config = { apiUrl: "...", maxRetries: 3 };
// config.apiUrl = "new";  // ERROR - readonly

// Using as const
const STATUS = {
  active: "active",
  inactive: "inactive"
} as const;
// type Status = "active" | "inactive"

// Deep readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
```

---

## Practical Coding Challenges

### Challenge 1: Implement a Function with Multiple Signatures

```typescript
// Function overloads
function create(name: string): User;
function create(name: string, age: number): User & { age: number };
function create(name: string, age?: number): any {
  return age ? { name, age } : { name };
}

create("Alice");        // { name: "Alice" }
create("Bob", 30);      // { name: "Bob", age: 30 }
```

### Challenge 2: Create a Type-Safe API Response Handler

```typescript
type ApiResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

async function handleResponse<T>(
  response: Response
): Promise<ApiResponse<T>> {
  if (!response.ok) {
    return { success: false, error: response.statusText };
  }
  const data = await response.json();
  return { success: true, data };
}
```

### Challenge 3: Type-Safe Object Getter

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];  // Type-safe!
}

const user = { name: "Alice", age: 30 };
const name = getProperty(user, "name");  // Type: string
// getProperty(user, "email");  // ERROR
```

---

## Interview Tips

1. **Explain your reasoning** - Don't just write code, explain why
2. **Ask clarifying questions** - Better code if you understand requirements
3. **Show type safety** - Demonstrate how types prevent bugs
4. **Discuss trade-offs** - No perfect solution, discuss pros/cons
5. **Real-world examples** - Relate to actual projects/use cases
6. **Performance conscious** - Consider compile-time vs runtime
7. **Error handling** - Show how types help with error management

---

## Study Resources

- **Official Handbook**: https://www.typescriptlang.org/docs/
- **TypeScript Playground**: https://www.typescriptlang.org/play/
- **LeetCode**: TypeScript problems
- **GitHub**: Real TypeScript code to study

---

## Quick Drill Questions

✅ What's the difference between `type` and `interface`?
✅ Explain generics with an example
✅ What does `keyof` do?
✅ What are discriminated unions?
✅ How do you handle union types safely?
✅ What's `Partial<T>`?
✅ Explain `extends` in different contexts
✅ What's a type guard?
✅ When would you use `unknown` instead of `any`?
✅ How do you make types immutable?

Answer these in your own words before the interview!

---

