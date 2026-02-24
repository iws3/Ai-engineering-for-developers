# Part 2: Setup Development Environment (Beginner Deep Dive)

## 🛠️ What You'll Learn
- How to install Node.js and TypeScript
- Setting up your first TypeScript project
- Understanding the project structure
- Getting VS Code ready for TypeScript development

---

## 📝 Key Terms
- **Node.js:** A runtime that lets you run JavaScript outside a browser
- **npm:** Node Package Manager - downloads and manages code libraries
- **TypeScript Compiler:** Converts TypeScript code into JavaScript
- **.ts file:** A TypeScript source file (like .js but with types)
- **tsconfig.json:** Configuration file that tells TypeScript how to compile

> **Beginner Note:** You can't run TypeScript directly in a browser. You must compile it to JavaScript first!

---

## Step 1️⃣: Install Node.js

### Windows
1. Go to [nodejs.org](https://nodejs.org)
2. Download the LTS (Long Term Support) version
3. Run the installer and follow the prompts
4. Open Command Prompt and type: `node --version` (should show v18.x.x or higher)

### Mac/Linux
```bash
# Using Homebrew (Mac)
brew install node

# Check installation
node --version
```

---

## Step 2️⃣: Install TypeScript Globally

```bash
npm install -g typescript
```

Verify:
```bash
tsc --version
```

---

## Step 3️⃣: Create Your First TypeScript Project

```bash
mkdir my-typescript-project
cd my-typescript-project
npm init -y
npm install --save-dev typescript
```

---

## Step 4️⃣: Create tsconfig.json

```bash
npx tsc --init
```

This creates a default configuration file. **Key settings to know:**

```json
{
  "compilerOptions": {
    "target": "ES2020",          // Which JavaScript version to output
    "module": "commonjs",        // Module system
    "strict": true,              // Enable strict type checking
    "esModuleInterop": true,     // Better module compatibility
    "skipLibCheck": true,        // Skip type checking of libraries
    "forceConsistentCasingInFileNames": true
  }
}
```

---

## Step 5️⃣: Create Your First .ts File

Create `hello.ts`:

```typescript
const greeting: string = "Hello, TypeScript!";
console.log(greeting);
```

---

## Step 6️⃣: Compile TypeScript to JavaScript

```bash
tsc hello.ts
```

This creates `hello.js` (the compiled JavaScript output).

Run it:
```bash
node hello.js
```

---

## 🎯 VS Code Setup (Optional but Recommended)

1. Install **VS Code** from [code.visualstudio.com](https://code.visualstudio.com)
2. Open your project folder: `File → Open Folder`
3. Install the **TypeScript vue** extension (optional but helpful)

**Pro Tip:** VS Code has built-in TypeScript support. Start typing and you'll see error hints!

---

## 🏷️ Important Terms to Remember
- **Node.js**
- **npm (Node Package Manager)**
- **TypeScript Compiler (tsc)**
- **.ts file**
- **tsconfig.json**

---

## 📚 Resources
- [Node.js Official Docs](https://nodejs.org/docs/)
- [TypeScript Setup Guide](https://www.typescriptlang.org/download)
- [VS Code Getting Started](https://code.visualstudio.com/docs/introvideos/basics)

---

## ✅ Checklist Before Moving Forward
- [ ] Node.js installed and verified
- [ ] TypeScript installed globally
- [ ] Created first .ts file
- [ ] Compiled using `tsc`
- [ ] Ran the compiled .js file successfully

