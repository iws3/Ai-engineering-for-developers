# Part 5: Understanding The Compiler — Exercises

## Exercise 1: Read tsconfig.json (Beginner)
1. Create a new TypeScript project: `npm init -y && npx tsc --init`
2. Open `tsconfig.json`
3. Find and write down what these mean:
   - `"target"`
   - `"module"`
   - `"strict"`

---

## Exercise 2: Change the Target (Beginner)
1. Create a file `modern.ts`:
```typescript
const greet = (name: string) => `Hello, ${name}!`;
console.log(greet("TypeScript"));
```

2. Compile with different targets:
```bash
# Target ES2020
tsc --target ES2020 modern.ts

# Target ES5
tsc --target ES5 modern.ts
```

3. Compare the generated `modern.js` files. What's different?

---

## Exercise 3: Organize with outDir/rootDir (Intermediate)
1. Create a folder structure:
```
project/
├── src/
│   └── index.ts
└── tsconfig.json
```

2. Modify tsconfig.json:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

3. Run `tsc` (no filename needed!)
4. Where was the compiled file created?

---

## Exercise 4: Strict Mode (Intermediate)
1. Create `test.ts`:
```typescript
let x: string;
x = 123;  // This should cause an error with strict: true
```

2. Change `"strict": false` in tsconfig.json
3. Compile: Does it give an error?
4. Change `"strict": true` and try again

---

## Challenge: Full Configuration (Advanced)
Create a complete project with:
1. `src/` folder with multiple `.ts` files
2. `tsconfig.json` with:
   - `outDir: "./dist"`
   - `rootDir: "./src"`
   - `strict: true`
   - `target: "ES2020"`
3. Run `tsc` and verify files compile to `dist/`

---

## 📝 Submission
- Show your modified tsconfig.json
- Explain the differences between ES5 and ES2020 output
- Document what strict mode caught
