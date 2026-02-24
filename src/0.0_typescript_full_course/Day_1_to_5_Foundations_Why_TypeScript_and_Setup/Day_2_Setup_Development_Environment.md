# Day 2: Setting Up Your Development Environment

## 🎯 Today's Learning Objectives

By the end of this lesson, you'll have:
- ✅ Node.js and npm installed and verified
- ✅ VS Code set up with TypeScript extensions
- ✅ Your first TypeScript project created
- ✅ TypeScript compiler configured
- ✅ Tools ready to code!

**Time to complete:** 45 minutes  
**Difficulty:** Beginner  
**Prerequisites:** Day 1 knowledge (helpful but not required)

---

## 📚 Why Setup Matters

A proper development environment is like a chef's clean, organized kitchen. You could cook in a messy kitchen, but it's frustrating and error-prone. TypeScript setup is the same:

- **Proper tools** = Faster feedback on errors
- **Clear structure** = Easy to find files and understand projects
- **Configured compiler** = Ensures consistent code quality
- **Extensions** = IDE helps you write better code instantly

---

## 🔬 Understanding Your TypeScript Toolchain

Before we set up, let's understand what we're installing:

```
Your Computer
├─ Node.js (JavaScript runtime)
│  └─ npm (Node Package Manager)
│     └─ Downloads and manages packages
│
├─ Visual Studio Code (Code editor)
│  └─ TypeScript extension
│     └─ Provides intellisense and error checking
│
└─ Your Project
   ├─ TypeScript files (.ts)
   ├─ package.json (project config)
   ├─ tsconfig.json (TypeScript config)
   └─ node_modules/ (installed packages)
```

---

## 💻 Step-by-Step Setup Guide

### Step 1: Install Node.js

Node.js is the runtime that lets you run JavaScript (and TypeScript) on your computer.

#### On macOS:
```bash
# Using Homebrew (if you have it)
brew install node

# Or download from https://nodejs.org/
```

#### On Windows:
1. Go to https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Run the installer
4. Follow the prompts (use all defaults)
5. Restart your computer

#### On Linux:
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install nodejs npm

# Or using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node
```

#### Verify Installation:
```bash
# Check Node version (should be 18+)
node --version
# v18.17.0

# Check npm version
npm --version
# 9.6.7
```

### Step 2: Install VS Code

1. Go to https://code.visualstudio.com/
2. Download for your operating system
3. Run the installer
4. Open VS Code

### Step 3: Install TypeScript Extension

1. In VS Code, open Extensions (Ctrl+Shift+X or Cmd+Shift+X)
2. Search for "TypeScript Vue Plugin" or just look for extensions by "Microsoft"
3. Install the extension (often comes built-in)
4. VS Code is now TypeScript-aware!

### Step 4: Create Your First Project

Open a terminal and run:

```bash
# Navigate to where you want your projects
cd ~/projects   # Or your preferred location

# Create a new directory
mkdir typescript-course

# Enter the directory
cd typescript-course

# Initialize a new Node project
npm init -y
# Creates package.json with defaults

# Install TypeScript as a development dependency
npm install --save-dev typescript

# Initialize TypeScript config
npx tsc --init
# Creates tsconfig.json with sensible defaults
```

**After these commands, your project structure looks like:**
```
typescript-course/
├── node_modules/           (all installed packages)
├── package.json            (project metadata)
├── package-lock.json       (lock versions)
└── tsconfig.json           (TypeScript configuration)
```

### Step 5: Verify Everything Works

Create your first TypeScript file:

```bash
# Open VS Code in current directory
code .
```

Then create a new file named `hello.ts`:

```typescript
// hello.ts
const message: string = "Hello, TypeScript!";
console.log(message);

function add(a: number, b: number): number {
  return a + b;
}

console.log(add(5, 3));  // Should print 8
```

Now compile and run it:

```bash
# Compile TypeScript to JavaScript
npx tsc

# Run the generated JavaScript
node hello.js

# Output:
# Hello, TypeScript!
# 8
```

**Success!** You've written and run your first TypeScript program! 🎉

---

## 🎯 Understanding tsconfig.json

After running `npx tsc --init`, you have a `tsconfig.json` file. This tells TypeScript how to compile your code.

**Key settings you should know:**

```json
{
  "compilerOptions": {
    "target": "ES2020",              // What JS version to compile to
    "module": "commonjs",            // How to handle imports/exports
    "lib": ["ES2020"],               // What JavaScript features are available
    "outDir": "./dist",              // Where to put compiled .js files
    "rootDir": "./src",              // Where your .ts files are
    "strict": true,                  // Enable all type checking
    "esModuleInterop": true,         // Better module compatibility
    "skipLibCheck": true,            // Skip type checking libraries
    "forceConsistentCasingInFileNames": true  // Prevent case issues
  },
  "include": ["src/**/*"],            // Which files to compile
  "exclude": ["node_modules"]         // Which files to skip
}
```

**For this course, we recommend:**

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
  "exclude": ["node_modules", "dist"]
}
```

---

## 💻 Practical Setup for This Course

Let's set up your environment the "course way":

```bash
# 1. Create project
mkdir typescript-course-journey
cd typescript-course-journey

# 2. Initialize Node
npm init -y

# 3. Install TypeScript
npm install --save-dev typescript ts-node @types/node

# 4. Create directory structure
mkdir src
mkdir dist

# 5. Initialize TypeScript
npx tsc --init

# 6. Update tsconfig.json
# (Replace content with the config above)

# 7. Create a test file
echo 'const greeting: string = "I am learning TypeScript!";console.log(greeting);' > src/day2.ts

# 8. Test it works
npx ts-node src/day2.ts
# Output: I am learning TypeScript!
```

**Now you have:**
```
typescript-course-journey/
├── src/
│   └── day2.ts          ← Your TypeScript code here
├── dist/                ← Compiled JavaScript goes here
├── node_modules/        ← Dependencies (auto-created)
├── package.json         ← Project metadata
├── package-lock.json    ← Lock file (auto-created)
└── tsconfig.json        ← TypeScript config
```

---

## ✨ VS Code Tips for TypeScript

### Must-Have Extensions
1. **TypeScript Vue Plugin** - Better TypeScript support (Microsoft)
2. **Code Runner** - Run code with one click
3. **Better Comments** - Highlight your comments

### Useful Keyboard Shortcuts
```
Ctrl+Shift+P (Cmd+Shift+P on Mac) - Command palette
Ctrl+. (Cmd+.) - Quick fixes
Ctrl+/ (Cmd+/) - Comment/uncomment
F12 - Go to definition
```

### Setting Up Auto-Compile

Edit `.vscode/settings.json`:
```json
{
  "files.exclude": {
    "**/dist": true,
    "**/node_modules": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
```

### Watch Mode

Instead of manually running `npx tsc` every time, use watch mode:

```bash
# Automatically recompile when files change
npx tsc --watch
```

Leave this running in a terminal while you code!

---

## 🧠 Real-World Application

### In AI Engineering

A proper setup means you can:
- Quickly test LLM prompts
- Run TypeScript code against APIs
- Test type safety before deploying to production

```typescript
// src/llm-test.ts
import fetch from 'node-fetch';

interface LLMResponse {
  content: string;
  tokensUsed: number;
}

async function testLLM() {
  const response = await fetch('https://api.example.com/llm', {
    method: 'POST',
    body: JSON.stringify({prompt: "Hello"})
  });
  const data: LLMResponse = await response.json();
  console.log(data.content);
}

testLLM();
```

Run with: `npx ts-node src/llm-test.ts`

### In Frontend Development

A proper setup means you can:
- Test React components with types
- Verify props before rendering
- Catch component errors immediately

```typescript
// src/components/Button.tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

export default Button;
```

---

## 🎯 Practice Exercises

### Exercise 1: Verify Your Installation (Beginner)

Run these commands. What do you see?

```bash
node --version      # What version?
npm --version       # What version?
npx tsc --version   # TypeScript version?
```

**Question:** Are all versions showing? If not, what's missing?

### Exercise 2: Create and Run a File (Beginner)

1. Create `src/hello.ts`
2. Add this code:
```typescript
const message: string = "I'm learning TypeScript!";
const number: number = 42;
console.log(message, number);
```

3. Compile with: `npx tsc`
4. Run with: `node dist/hello.js`
5. What do you see?

### Exercise 3: Understand tsconfig.json (Intermediate)

1. Open `tsconfig.json`
2. Change `"strict": true` to `"strict": false`
3. Create a file with: `const x = "hello"; const y = x + 5;`
4. Compile and run
5. Try same file with `"strict": true` - what's the difference?

### Exercise 4: Set Up Watch Mode (Intermediate)

1. Run: `npx tsc --watch` in one terminal
2. In another terminal, edit a `.ts` file
3. Watch for the file to auto-compile
4. What happens in the dist/ folder?

### Exercise 5: Configure Your Environment (Advanced)

1. Create `.vscode/settings.json`:
```json
{
  "[typescript]": {
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll": true
    }
  }
}
```

2. Close and reopen VS Code
3. Edit a TypeScript file
4. Does it auto-format on save?

---

## ✅ Solutions

### Exercise 1: Version Check
Your output should show three version numbers like:
```
v18.17.0        (Node)
9.6.7           (npm)
Version 5.2.2   (ts)
```

All present? Great! If not, re-run the installation steps.

### Exercise 2: Create and Run
Should output:
```
I'm learning TypeScript! 42
```

### Exercise 3: Strict Mode
- With `strict: false` - runs without error (bad!)
- With `strict: true` - shows error (good! number cannot add to string)

### Exercise 4: Watch Mode
- Changes to `.ts` files cause automatic recompilation
- `dist/` folder updates immediately
- No need to manually run `tsc` each time

### Exercise 5: VS Code Config
- Once configured, saves reformat files automatically
- Makes code consistent without extra clicks

---

## 📖 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [TypeScript Handbook - Setup](https://www.typescriptlang.org/docs/handbook/tsconfig.json.html)
- [VS Code TypeScript Guide](https://code.visualstudio.com/docs/typescript/typescript-compiling)

---

## 📝 Key Takeaways

### What You've Learned Today:

1. **Install Node.js** - Your JavaScript runtime
2. **Install VS Code** - Your editor
3. **Create a TypeScript project** - npm init + TypeScript setup
4. **Configure TypeScript** - tsconfig.json handles compilation
5. **Compile and run code** - From .ts to .js to results
6. **Set up your environment** - The foundation for all future lessons

### The Key Insight:

> **A good development environment is invisible - you don't think about it, it just works. Setup takes 30 minutes now, saves hours later.**

---

## 🎯 What's Next? (Tomorrow's Preview)

Tomorrow (Day 3), we'll dive into **how TypeScript actually compiles**:
- See the transformation from TypeScript to JavaScript
- Understand what the compiler does
- Learn about type erasure
- Learn about source maps

**Get your environment ready!** 🚀

---

**Reflection Questions:**
- Did your setup work on the first try?
- What confused you during setup?
- Are you ready to start coding tomorrow?

**Next:** [Day 3: How TypeScript Compiles](./Day_3_How_TypeScript_Compiles.md)
