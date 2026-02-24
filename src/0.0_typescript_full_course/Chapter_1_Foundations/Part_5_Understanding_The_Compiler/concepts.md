# Part 5: Understanding The Compiler (Beginner Deep Dive)

## 🎛️ What is tsconfig.json?
The `tsconfig.json` file tells the TypeScript compiler how to compile your code. It's like a configuration manual for `tsc`!

---

## 📝 Key Terms
- **tsconfig.json:** The TypeScript compiler configuration file
- **Compiler Options:** Settings that control how TypeScript compiles
- **Root Directory:** Where TypeScript looks for files to compile
- **Output Directory:** Where compiled .js files go
- **Strict Mode:** A setting that makes type checking stricter

> **Beginner Note:** If you don't have a tsconfig.json, TypeScript uses default settings. Creating one gives you control!

---

## 📄 A Minimal tsconfig.json

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
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

---

## 🔧 Key Compiler Options Explained

### `target`
Specifies which JavaScript version to output.

```json
"target": "ES2020"  // Output modern JavaScript
"target": "ES5"     // Output older JavaScript (wider browser support)
```

**Example:**
```typescript
// TypeScript (arrow function)
const add = (a: number, b: number) => a + b;

// Output as ES2020 (stays the same)
const add = (a, b) => a + b;

// Output as ES5 (becomes function)
var add = function(a, b) { return a + b; };
```

---

### `module`
Specifies how modules are imported/exported.

```json
"module": "commonjs"    // For Node.js (require/module.exports)
"module": "esnext"      // For modern browsers (import/export)
```

---

### `lib`
Specifies which built-in JavaScript libraries to include.

```json
"lib": ["ES2020", "DOM"]  // Include ES2020 and browser APIs
"lib": ["ES2020"]         // Only ES2020, no browser APIs
```

---

### `outDir` and `rootDir`
Controls input and output directories.

```json
"rootDir": "./src",     // Look for .ts files here
"outDir": "./dist"      // Put compiled .js files here
```

**File structure:**
```
project/
├── src/
│   └── hello.ts
├── dist/
│   └── hello.js (automatically created)
└── tsconfig.json
```

---

### `strict: true`
Enables strict type checking. This is the most important setting for beginners!

```json
"strict": true
```

With `strict: true`:
```typescript
let x: string = "hello";
x = 123;  // ❌ ERROR: Cannot assign number to string
```

Without `strict: true`:
```typescript
let x: string = "hello";
x = 123;  // ⚠️ Warning, but allowed
```

---

### `esModuleInterop`
Makes imports/exports more compatible between module systems.

```json
"esModuleInterop": true  // Recommended for better compatibility
```

---

## 🚀 Workflow with tsconfig.json

### Step 1: Set up tsconfig.json
```bash
npx tsc --init
```

### Step 2: Organize files
```
project/
├── src/
│   ├── index.ts
│   └── utils.ts
├── dist/
├── tsconfig.json
└── package.json
```

### Step 3: Compile all files at once
```bash
tsc  # Compiles everything in src/ → dist/
```

### Step 4: Watch mode
```bash
tsc --watch  # Recompiles automatically when you save
```

---

## 🏷️ Important Terms
- **tsconfig.json**
- **Compiler Options**
- **target**
- **Strict Mode**
- **outDir/rootDir**
- **module**

---

## 📚 Resources
- [TypeScript Compiler Options](https://www.typescriptlang.org/tsconfig/)
- [tsconfig.json Deep Dive](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

---

## 💡 Pro Tips
1. Always set `"strict": true`
2. Use `outDir` to keep compiled files separate
3. Use `--watch` mode during development
4. Commit tsconfig.json to version control

