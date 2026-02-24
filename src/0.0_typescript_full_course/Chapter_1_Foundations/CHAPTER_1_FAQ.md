# Chapter 1: Frequently Asked Questions

## Q1: Do I need to learn JavaScript first?

**Short Answer**: Yes, strongly recommended.

**Long Answer**: TypeScript is a superset of JavaScript. You need to understand:
- Variables (`let`, `const`, `var`)
- Functions (arrow functions, regular functions)
- Objects and arrays
- Promises and async/await
- Basic ES6+ syntax

If you're not comfortable with these, learn JavaScript first. A solid JavaScript foundation makes TypeScript much easier to understand.

**Recommended**: Spend 1-2 weeks on JavaScript fundamentals before TypeScript.

---

## Q2: How long does it take to get productive with TypeScript?

**Realistic Timeline**:
- **Days 1-3**: Learn basic types (string, number, boolean, array)
- **Days 4-7**: Understand interfaces and functions
- **Week 2**: Generics and more advanced types
- **Week 3+**: Apply to real projects, see the benefits

**Time to Productivity**:
- Small projects (< 1000 lines): ~1 week
- Medium projects (1-10k lines): ~2-3 weeks
- Complex projects: ~1 month to feel comfortable

The investment pays off quickly as you catch bugs earlier.

---

## Q3: Why am I getting "Cannot find name" errors?

**Most Common Causes**:

1. **Import statement is wrong**:
```typescript
// ❌ Forgot import
const { readFile } = require('fs/promises');
const data = await readFile('file.txt');  // ReferenceError

// ✅ Import properly
import { readFile } from 'fs/promises';
const data = await readFile('file.txt');
```

2. **Variable declared in different scope**:
```typescript
// ❌ Variable inside if block
if (true) {
  const x = 5;
}
console.log(x);  // ReferenceError - x not in this scope

// ✅ Declare at function level
const x = 5;
if (true) {
  console.log(x);  // Works
}
```

3. **Type used at runtime**:
```typescript
// ❌ TypeScript types don't exist at runtime
type User = { name: string };
if (user instanceof User) { }  // Error!

// ✅ Use type guards
if ('name' in user) { }  // Correct
```

---

## Q4: What's the difference between `any` and `unknown`?

| Aspect | `any` | `unknown` |
|--------|-------|---------|
| **Type Safety** | None (dangerous) | Forced to check before use |
| **When to use** | Almost never | When you truly don't know the type |
| **Example** | `let x: any = ...` | `let x: unknown = ...` |
| **Usage** | Can do anything immediately | Must type-guard first |

```typescript
const unknownValue: unknown = "hello";
console.log(unknownValue.toUpperCase());  // ❌ Error!

if (typeof unknownValue === "string") {
  console.log(unknownValue.toUpperCase());  // ✓ OK!
}
```

**Rule**: Prefer `unknown` to `any`. It forces you to be explicit about type safety.

---

## Q5: Do I need TypeScript for small projects?

**Depends on**:
- **< 100 lines**: Probably not worth it. JavaScript is fine.
- **100-1,000 lines**: TypeScript helps, but optional
- **1,000+ lines**: Highly recommended - saves debugging time
- **Team projects**: TypeScript is worth it at any size
- **Business-critical code**: Always use TypeScript

**The Truth**: TypeScript's value increases with project complexity. Small projects? You choose. But once you hit ~1,000 lines, the benefits become clear.

---

## Q6: Why does my tsconfig.json not work?

**Checklist**:

- [ ] Is `tsconfig.json` in the project root (same folder as package.json)?
- [ ] Does it have valid JSON with no trailing commas?
- [ ] Did you run `npm install typescript` (local TypeScript install)?
- [ ] Are you using `npx tsc` or `./node_modules/.bin/tsc` to compile?
- [ ] Did you modify tsconfig and forget to recompile?

**Debug Command**:
```bash
npx tsc --showConfig -p .
# Shows the ACTUAL config TypeScript is using with all defaults
```

---

## Q7: My code compiles but fails at runtime. Why?

**This happens because**:

TypeScript only checks COMPILE-TIME types. At runtime, JavaScript runs with your compiled code.

```typescript
// TypeScript checks this:
const obj: { name: string } = {
  name: "Alice"
};
console.log(obj.name);  // TypeScript: "Alice" is string ✓

// But at runtime, what if obj is actually:
const obj = null;  // JSON parsing failed, returned null
console.log(obj.name);  // Runtime error: cannot read 'name' of null ���
```

**Solution**: Validate data at runtime:
```typescript
// Option 1: Type guards
if (obj !== null && typeof obj === "object" && "name" in obj) {
  console.log(obj.name);
}

// Option 2: Validation libraries
import { z } from "zod";
const schema = z.object({ name: z.string() });
const result = schema.safeParse(data);
if (result.success) {
  console.log(result.data.name);  // Safe!
}
```

**Remember**: TypeScript protects you from type MISMATCH, not from API failures or bad data.

---

## Q8: Should I use interfaces or types?

**Quick Comparison**:

| Feature | Interface | Type |
|---------|-----------|------|
| **Objects** | ✓ Better | ✓ Works |
| **Unions** | ✗ No | ✓ Yes |
| **Primitives** | ✗ No | ✓ Yes |
| **Inheritance** | ✓ extends | ✓ & |
| **Merging** | ✓ Auto-merges | ✗ No |

**Simple Rule**:
- Describing **object shapes**: Use `interface`
- Everything else: Use `type`

```typescript
// Use interface
interface User {
  id: number;
  name: string;
}

// Use type (unions, primitives)
type Status = "active" | "inactive";
type ID = string | number;
```

---

## Q9: How do I debug TypeScript?

**Debugging Methods**:

1. **Read compiler errors** (they're helpful!):
```
error TS2322: Type 'string' is not assignable to type 'number'.
```

2. **Check types in VS Code**:
- Hover over variable to see its type
- Right-click > "Go to Definition"
- Use F12 to jump to interface definitions

3. **Use `type` keyword to inspect**:
```typescript
type Check = typeof someVariable;  // Shows variable type
// Hover over "Check" to see it
```

4. **Enable source maps in tsconfig.json**:
```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```
Then debug with Node Inspector or Chrome DevTools.

---

## Q10: When should I use generics?

**Use generics when**:
- You have same logic for different types
- You want to preserve the original type

**Example**:
```typescript
// ❌ Without generics (loses type info)
function first(arr: any[]): any {
  return arr[0];
}

const num = first([1, 2, 3]);  // Type is 'any' - lost!

// ✅ With generics (preserves type info)
function first<T>(arr: T[]): T {
  return arr[0];
}

const num = first([1, 2, 3]);  // Type is 'number' - preserved!
const str = first(["a", "b"]);  // Type is 'string'
```

**Rule of Thumb**:
- Single simple function? Might not need generics
- Reusable utility? Use generics to preserve types
- Building a library? Generics are your friend

---

