# Part 2: Setup Development Environment — Exercises

## Exercise 1: Install and Verify (Beginner)
1. Install Node.js and TypeScript
2. Verify both are installed by running:
   ```bash
   node --version
   npm --version
   tsc --version
   ```
3. Take a screenshot or copy the version numbers

---

## Exercise 2: Create a Project (Beginner)
1. Create a new folder called `typescript-learning`
2. Navigate into it
3. Run `npm init -y`
4. Run `npx tsc --init`
5. List the files created (use `ls` or `dir`)

---

## Exercise 3: Compile Your First File (Intermediate)
1. Create a file called `greeting.ts` with:
```typescript
const name: string = "TypeScript Developer";
console.log(`Hello, ${name}!`);
```
2. Compile it: `tsc greeting.ts`
3. Run it: `node greeting.js`
4. What output did you see?

---

## Exercise 4: Explore tsconfig.json (Intermediate)
1. Open the `tsconfig.json` file created in Exercise 2
2. Find and explain what these options do:
   - `"target"`
   - `"strict"`
   - `"module"`

---

## Challenge: Try the Watch Mode (Advanced)
1. Run: `tsc --watch`
2. Edit your `greeting.ts` file and change the name
3. Notice that it auto-compiles!
4. Stop watching with `Ctrl+C`

---

## 📝 Submission
- Document your installation process
- Show that all files compile and run successfully
- Write down what each tsconfig option means in your own words
