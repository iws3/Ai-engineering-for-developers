# Chapter 1: TypeScript Debugging Guide

## Understanding Error Messages

TypeScript gives very detailed error messages. Learning to read them saves hours of debugging!

---

## Error Format

```
src/file.ts(10,5): error TS2322: Type 'string' is not assignable to type 'number'.
```

Breaking this down:
- **src/file.ts** - File with the error
- **(10,5)** - Line 10, column 5 (where cursor should point)
- **error TS2322** - Error code (Google this for more info)
- **Message** - What's wrong and what was expected

---

## Common Error Codes

### TS2322: Type Mismatch
```typescript
const age: number = "25";  // Error TS2322
```
**Fix**: Assign correct type or convert
```typescript
const age: number = 25;  // Correct
const age: number = parseInt("25");  // Converted
```

---

### TS2339: Property Not Found
```typescript
interface User {
  name: string;
}

const user: User = { name: "Alice" };
console.log(user.emailAddress);  // Error TS2339: Property 'emailAddress' not found
```
**Fix**: Check property name in interface
```typescript
console.log(user.name);  // Correct
// Or add property to interface
interface User {
  name: string;
  emailAddress?: string;
}
```

---

### TS7006: Implicit Any
```typescript
function add(a, b) {  // Error TS7006: 'a' is missing a type annotation
  return a + b;
}
```
**Fix**: Add type annotations
```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

---

### TS2531: Possibly Undefined
```typescript
function getName(user: { name?: string }): string {
  return user.name.toUpperCase();  // Error: name might be undefined
}
```
**Fix**: Check before using
```typescript
function getName(user: { name?: string }): string {
  return (user.name || "").toUpperCase();  // Handle undefined
}

// Or optional chaining
function getName(user: { name?: string }): string {
  return user.name?.toUpperCase() ?? "";
}
```

---

### TS2304: Cannot Find Name
```typescript
import { getData } from "./data";
console.log(someVariable);  // Error TS2304: Cannot find name 'someVariable'
```
**Fix**: Check variable is declared
```typescript
const someVariable = 42;
console.log(someVariable);  // OK
```

---

## Debugging Workflow

### Step 1: Read the Error Message
Don't skip this. The message tells you what's wrong.

### Step 2: Find the File and Line
```
src/index.ts(42,10): error
         ^^
         Go to this line
```

### Step 3: Look at the Code Context
```typescript
// Line 40
const user = { name: "Alice" };

// Line 42 (the error)
user.age = 25;  // TS2339: Property 'age' not found
```

### Step 4: Understand the Problem
- Code expects `age` to exist
- Type says it doesn't

### Step 5: Fix It
Add `age` to the object or type:
```typescript
const user: { name: string; age: number } = {
  name: "Alice",
  age: 25
};
user.age = 25;  // OK
```

---

## VS Code Debugging Features

### Hover Over Variables
```typescript
const user = { name: "Alice", age: 25 };
       ^^^^
       Hover here to see: type { name: string; age: number }
```

### View Inferred Type
```typescript
// Type = automatically determined
function add(a: number, b: number) {
  return a + b;  // Hover on 'a + b' - shows type: number
}
```

### Jump to Type Definition
```typescript
interface User {
  name: string;
}

const user: User = { name: "Alice" };
          ^^^^
          Right-click → Go to Definition
          Shows the interface
```

### Check Type Compatibility
```typescript
const value: unknown = "hello";

// Red squiggle: Type 'unknown' not assignable to 'string'
const message: string = value;

// Fix: Type guard
if (typeof value === "string") {
  const message: string = value;  // OK
}
```

---

## Incremental Debugging

When you have many errors:

### Strategy 1: Fix Errors from Top to Bottom
Later errors might be cascading from first error.

```typescript
// Error 1 (line 5):
interface User {
  name: string;
}

// Error 2 (line 10) - might be caused by error 1:
const user: User = { age: 25 };  // Missing 'name'

// Fix error 1 first, then error 2 becomes clear
```

### Strategy 2: Focus on Error Clusters
Errors often group by cause:
- 5 errors in `User` interface → Fix the interface
- 5 errors calling `getData()` → Fix function signature

### Strategy 3: Use TypeScript CLI
```bash
# See ALL errors at once
npx tsc --noEmit

# Get detailed error context
npx tsc --pretty false  # Show raw errors

# Stop after first 5 errors (useful with many issues)
npx tsc --maxNodeModuleJsDepth 1
```

---

## Testing Error Handling

### Intentional Type Errors (for learning)

```typescript
// Safe way to test: comment shows what error should occur
const message: string = 42;
// ERROR: Type 'number' is not assignable to type 'string'

// Later when you understand, fix it:
const message: string = "Hello";  // Correct
```

---

## Debugging null/undefined Issues

### The Problem
```typescript
let user: { name: string };
user = null;  // Error: GOOD - caught at compile time!
console.log(user.name);  // Would crash at runtime
```

### Making it Explicit
```typescript
let user: { name: string } | null = null;
// Now it's clear null is possible

if (user !== null) {
  console.log(user.name);  // Safe - checked first
}
```

### Optional Chaining
```typescript
// Instead of checking manually each time
if (user !== null && user.name) {
  console.log(user.name.toUpperCase());
}

// Use optional chaining
console.log(user?.name?.toUpperCase());  // Safe, cleaner
```

---

## Narrowing Type Errors

### Type Guard Pattern
```typescript
function process(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows: value is now string
    console.log(value.toUpperCase());  // OK
  } else {
    // TypeScript knows: value must be number
    console.log(value.toFixed(2));  // OK
  }
}
```

### Discriminated Unions
```typescript
type Result =
  | { success: true; data: string }
  | { success: false; error: string };

function handle(result: Result) {
  if (result.success) {
    // TypeScript knows: result.data exists
    console.log(result.data);
  } else {
    // TypeScript knows: result.error exists
    console.log(result.error);
  }
}
```

---

## Debugging Complex Types

### When You're Confused About a Type
```typescript
// Create a "test" variable to see the type
const testType: typeof someComplexVariable = someComplexVariable;
//                      ^^^
//                      Hover to see inferred type
```

### Extract and Name Types
```typescript
// Instead of inline confusion
function process(data: { name: string; items: Array<{ id: number; value: string }> }) {
  // Hard to read
}

// Extract to interface
interface ItemData {
  id: number;
  value: string;
}

interface ProcessData {
  name: string;
  items: ItemData[];
}

function process(data: ProcessData) {
  // Clear and reusable
}
```

---

## Quick Error Resolution Checklist

- [ ] Read the full error message
- [ ] Find the exact line number
- [ ] Look at the code context
- [ ] Hover in VS Code to see inferred type
- [ ] Check if type annotation is correct
- [ ] Check if actual value matches type
- [ ] Apply type guards if dealing with unions
- [ ] Use ` exact

---

