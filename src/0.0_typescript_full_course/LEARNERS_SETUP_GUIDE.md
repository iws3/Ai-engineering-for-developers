# Learners Setup Guide - Getting Started with TypeScript

Welcome to the TypeScript Learning Course! This guide will help you set up your development environment and start coding.

## Prerequisites

- **Computer**: Windows, Mac, or Linux
- **Internet**: Download necessary tools
- **Text Editor**: VS Code recommended
- **Patience**: Learning TypeScript takes time!

---

## Step 1: Install Node.js

### What is Node.js?
Node.js allows you to run JavaScript code on your computer (not just in browser).

### Installation Steps

**Windows/Mac:**
1. Go to https://nodejs.org/
2. Download LTS version (Long Term Support)
3. Run installer, click "Next" through everything
4. Restart your computer

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
```

### Verify Installation
```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
```

---

## Step 2: Download This Course

### Option A: Using Git (Recommended)
```bash
git clone https://github.com/your-username/typescript-course.git
cd typescript-course
```

### Option B: Download ZIP
1. Click green "Code" button on GitHub
2. Click "Download ZIP"
3. Extract to your computer

---

## Step 3: Set Up Your Learning Workspace

### Opening in VS Code

1. Open VS Code
2. File â†’ Open Folder
3. Select `typescript-course/Learners` folder
4. Click "Open"

### What You'll See

```
Learners/
â”œâ”€â”€ package.json        # Project metadata
â”œâ”€â”€ tsconfig.json       # TypeScript configuration
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ index.ts       # Main file
â”‚   â”œâ”€â”€ utils/
â”‚   â”‚   â””â”€â”€ helpers.ts # Utility functions
â”‚   â””â”€â”€ chapter1-fundamentals/
â”‚       â””â”€â”€ part-1-why-typescript/
â”‚           â””â”€â”€ exercise-basic-types.ts
â””â”€â”€ dist/              # Compiled JavaScript (created after build)
```

---

## Step 4: Install Dependencies

All the tools you need to write and compile TypeScript:

```bash
# Navigate to Learners folder
cd typescript-course/Learners

# Install all dependencies (takes ~2 minutes)
npm install
```

This downloads:
- **TypeScript (5.3.3)**: The compiler
- **Prettier**: Code formatter
- **ESLint**: Code linter (finds problems)

### Verify Installation
```bash
npm list typescript    # Should show 5.3.3
```

---

## Step 5: Compile and Run Your First Program

### Compile TypeScript â†’ JavaScript
```bash
npm run build
# Or use watch mode (auto-compiles on file changes)
npm run dev
```

### Run the Compiled Code
```bash
npm start
```

### Expected Output
```
Hello, TypeScript Learner!
```

**If you see this - Congratulations! Your setup is complete!** í¾‰

---

## Step 6: VS Code Extensions (Recommended)

Install these extensions for better TypeScript support:

1. **TypeScript Vue Plugin (Volar)**
   - ID: `Vue.volar`
   - Better TypeScript support

2. **Prettier - Code formatter**
   - ID: `esbenp.prettier-vscode`
   - Auto-format your code on save

3. **ESLint**
   - ID: `dbaeumer.vscode-eslint`
   - Shows code problems

### How to Install
1. Open VS Code
2. Go to Extensions (left sidebar, square icon)
3. Search for extension name
4. Click "Install"

---

## Step 7: Configure VS Code Settings

### Enable Format on Save

1. File â†’ Preferences â†’ Settings
2. Search for "format on save"
3. Check the box âœ“
4. Search for "default formatter"
5. Select "Prettier"

### This means:
Every time you save a file, Prettier auto-formats your code!

---

## Step 8: Creating Your First Exercise File

### Create a new file

1. Right-click in Explorer (left sidebar)
2. New File
3. Name it: `my-first-program.ts`
4. Write this code:

```typescript
// Your first TypeScript program!
const greeting: string = "Hello, TypeScript!";
const number: number = 42;

console.log(greeting);
console.log(number);
```

### Compile and Run

```bash
npm run build
npm start
```

Expected output:
```
Hello, TypeScript!
42
```

---

## Common Issues & Solutions

### Issue 1: "npm: command not found"
**Solution**: Node.js not installed. Go back to Step 1.

### Issue 2: "typescript not found"
**Solution**:
```bash
cd typescript-course/Learners   # Make sure you're in right folder
npm install                     # Install dependencies again
```

### Issue 3: File contains syntax errors
**Solution**: Check your code carefully. Look for:
- Missing semicolons: `;`
- Mismatched brackets: `{ }` `( )` `[ ]`
- Incorrect types: if marked as `string`, can't assign `number`

### Issue 4: JavaScript file won't run
**Solution**: Make sure you're running `.js` file from `dist/` folder:
```bash
npm run build    # Creates dist/ folder
npm start        # Runs dist/index.js
```

---

## Your First Exercise

Ready to code? Open this file to get started:

í³‚ `src/chapter1-fundamentals/part-1-why-typescript/exercise-basic-types.ts`

Follow the TODO comments and complete each exercise. When you're done:

```bash
npm run build    # Compile to check for errors
npm start        # Run your code
```

---

## Daily Workflow

### Every learning session, follow this pattern:

1. **Open VS Code**
   ```
   File â†’ Open Folder â†’ typescript-course/Learners
   ```

2. **Create/edit a file** in `src/`
   - New exercises
   - Practicing concepts

3. **Save the file**
   - Format on save will auto-format (if configured)

4. **Compile**
   ```bash
   npm run build
   ```

5. **Check for errors**
   - Look at terminal output
   - Read error messages carefully

6. **Fix errors**
   - Use error messages to guide you
   - Hover over red squiggles in VS Code

7. **Run your code**
   ```bash
   npm start
   ```

8. **Celebrate progress!** í¾‰

---

## Progressive Learning Path

Start with these in order:

**Week 1: Basics**
- [ ] Part 1: exercises-basic-types.ts
- [ ] Practice declaring variables

**Week 2: Functions**
- [ ] Part 3: exercises-functions.ts
- [ ] Practice function types

**Week 3: Objects**
- [ ] Part 4: exercises-interfaces.ts
- [ ] Practice object structures

**Month 2+**: Continue through chapters

---

## Getting Help

- **VS Code Error Messages**: Read them! They're helpful.
- **Google**: Search for the error message
- **ChatGPT**: Ask questions about TypeScript
- **Course Materials**: Check concepts.md files
- **CONTRIBUTING.md**: See how to ask for help

---

## Next Steps

1. âœ… Complete setup (you're here)
2. í³– Read Chapter 1 concepts
3. í²» Complete Part 1 exercises
4. í¾“ Progress through course
5. íº€ Build your own project

---

## Quick Reference

| Command | What it does |
|---------|-------------|
| `npm install` | Download dependencies |
| `npm run build` | Compile TypeScript â†’ JavaScript |
| `npm run dev` | Compile and watch for changes |
| `npm start` | Run compiled JavaScript |
| `npm run format` | Auto-format code with Prettier |
| `npm run lint` | Check code for problems |

---

Let's get started! íº€

