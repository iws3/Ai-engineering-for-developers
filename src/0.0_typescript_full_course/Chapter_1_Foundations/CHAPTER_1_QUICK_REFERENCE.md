# Chapter 1: Quick Reference Guide

## TypeScript vs JavaScript at a Glance

```
┌─────────────────────────────────────────────────────────┐
│                   JAVASCRIPT                            │
├─────────────────────────────────────────────────────────┤
│  • Dynamically typed                                    │
│  • Types checked at runtime (if error even happens)    │
│  • Flexible but error-prone                            │
│  • Good for small scripts                              │
└─────────────────────────────────────────────────────────┘

                          ↓ ADD TYPES ↓

┌─────────────────────────────────────────────────────────┐
│                   TYPESCRIPT                            │
├─────────────────────────────────────────────────────────┤
│  • Statically typed (with type annotations)            │
│  • Types checked BEFORE code runs (at compile-time)    │
│  • Safe and professional                               │
│  • Essential for large projects                        │
│  • Compiles to JavaScript                              │
└─────────────────────────────────────────────────────────┘
```

## Installation Checklist

```bash
# 1. Install Node.js
✓ Download from nodejs.org
✓ Verify: node --version && npm --version

# 2. Create project
✓ mkdir my-project
✓ cd my-project
✓ npm init -y

# 3. Install TypeScript
✓ npm install --save-dev typescript
✓ Create tsconfig.json

# 4. Create src/
✓ mkdir src
✓ touch src/index.ts

# 5. Run!
✓ npm run build
✓ npm run dev (watch mode)
```

## Essential tsconfig.json (Copy-Paste Ready)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "sourceMap": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Essential package.json Scripts

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "start": "node dist/index.js"
  }
}
```

## Type Syntax Quick Reference

```typescript
// Primitives
const str: string = "hello";
const num: number = 42;
const bool: boolean = true;
const nothing: null = null;
const undef: undefined = undefined;

// Arrays
const numbers: number[] = [1, 2, 3];
const strings: Array<string> = ["a", "b"];

// Functions
function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;

// Objects & Interfaces
interface User {
  name: string;
  age: number;
  email?: string;  // Optional
}

// Union Types
let id: number | string;
id = 123;      // ✓
id = "abc";    // ✓
id = true;     // ✗

// Generics
function getItem<T>(arr: T[]): T | undefined {
  return arr[0];
}
```

## Compilation Workflow

```
Source Code (src/*.ts)
        ↓
   [tsc compiler]
        ↓
Type Checking ← Catches errors here!
        ↓
Code Generation
        ↓
JavaScript Output (dist/*.js)
        ↓
   [Node.js/Browser]
        ↓
Runtime Execution
```

## Common Commands

```bash
# Compile once
npm run build
npx tsc

# Watch for changes & auto-compile
npm run dev
npx tsc --watch

# Run compiled code
npm start
node dist/index.js

# Check types without emitting
npx tsc --noEmit

# See all files being compiled
npx tsc --listFiles
```

## Debugging Tips

```bash
# Enable source maps in tsconfig.json
"sourceMap": true

# Then use debugger in browser/VS Code

# Or compile with inline source maps
"inlineSourceMap": true

# Check configuration
npx tsc --showConfig
```

## Best Practices Summary

✅ DO:
- Use `strict: true` in tsconfig.json
- Avoid `any` type
- Use interfaces/types to document code
- Enable `noUnusedLocals` and `noUnusedParameters`
- Test that code actually runs, not just compiles
- Use autocomplete from your IDE
- Read error messages carefully

❌ DON'T:
- Use `any` as an escape hatch
- Skip type annotations entirely (but let inference help!)
- Ignore TypeScript errors and compile anyway
- Use `!` (non-null assertion) without good reason
- Forget to compile before running

