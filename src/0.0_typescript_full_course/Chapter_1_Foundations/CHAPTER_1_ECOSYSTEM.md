# Chapter 1: TypeScript Ecosystem & Popular Tools

TypeScript doesn't exist in isolation - it's part of a rich ecosystem of tools and frameworks!

---

## Popular JavaScript Frameworks with TypeScript

### React + TypeScript

```typescript
// components/Button.tsx
import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary"
}) => (
  <button
    onClick={onClick}
    className={`btn btn-${variant}`}
  >
    {label}
  </button>
);
```

**Popular libraries**:
- Next.js - Full-stack React framework
- React Query - Data fetching
- Redux - State management
- Material-UI - Component library

---

### Vue 3 + TypeScript

```typescript
<script setup lang="ts">
import { ref, computed } from "vue";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const todos = ref<Todo[]>([]);
const newTodo = ref("");

const incompleteTodos = computed(() =>
  todos.value.filter((t) => !t.completed)
);

function addTodo() {
  todos.value.push({
    id: Date.now(),
    title: newTodo.value,
    completed: false
  });
  newTodo.value = "";
}
</script>
```

**Popular libraries**:
- Nuxt - Full-stack Vue framework
- Pinia - State management
- Vite - Build tool
- Vuetify - Component library

---

### Node.js + Express

```typescript
// server.ts
import express from "express";

interface User {
  id: number;
  name: string;
  email: string;
}

const app = express();
app.use(express.json());

const users: User[] = [];

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  const user: User = {
    id: users.length + 1,
    name,
    email
  };
  users.push(user);
  res.status(201).json(user);
});

app.listen(3000);
```

**Popular frameworks**:
- Express - Minimal web framework
- Nestjs - Opinionated, structured framework
- Fastify - High-performance framework
- Apollo Server - GraphQL server

---

## Essential Development Tools

### Package Managers

| Tool | Purpose | Command |
|------|---------|---------|
| npm | Standard package manager | `npm install` |
| yarn | Popular alternative | `yarn add` |
| pnpm | Fast, space-efficient | `pnpm add` |

### Build Tools

```bash
# Webpack - Bundler
npm install --save-dev webpack webpack-cli

# Vite - Fast build tool
npm create vite@latest my-app -- --template react

# esbuild - Fast JavaScript bundler
npm install --save-dev esbuild
```

### Linters & Formatters

```bash
# ESLint - Find code problems
npm install --save-dev eslint @typescript-eslint/parser

# Prettier - Format code
npm install --save-dev prettier

# SWC - Fast TypeScript compiler
npm install --save-dev @swc/core
```

---

## TypeScript Project Setup Tools

### Create Fastest Setup

```bash
# Create React app with TypeScript
npx create-react-app my-app --template typescript

# Create Next.js with TypeScript
npx create-next-app@latest my-app --typescript

# Create Vue app with TypeScript
npm create vue@latest my-app

# Create NestJS project
npm i -g @nestjs/cli
nest new projectname
```

---

## Popular TypeScript Libraries

### Validation & Runtime Type Checking

```typescript
import { z } from "zod";

// Define schema
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
});

// Parse/validate at runtime
const data = { id: 1, name: "Alice", email: "alice@ex.com" };
const user = UserSchema.parse(data);  // Throws if invalid
```

**Libraries**:
- Zod - Type-safe validation
- io-ts - Functional validation
- class-validator - Decorator-based
- yup - Schema validation

### HTTP Clients

```typescript
import axios from "axios";

interface User {
  id: number;
  name: string;
}

const client = axios.create({
  baseURL: "https://api.example.com"
});

const users = await client.get<User[]>("/users");
```

**Libraries**:
- Axios - Popular HTTP client
- Fetch API - Built-in
- node-fetch - Node.js fetch
- got - Lightweight HTTP client

### ORM/Database

```typescript
import { DataSource } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  entities: [User]
});
```

**Libraries**:
- TypeORM - Popular ORM
- Prisma - Modern ORM
- Sequelize - SQL ORM
- MongoDB driver - NoSQL

---

## Testing Ecosystem

```typescript
// Vitest - Fast unit test runner
import { describe, it, expect } from "vitest";

describe("Math", () => {
  it("should add", () => {
    expect(1 + 2).toBe(3);
  });
});
```

**Libraries**:
- Jest - Popular test runner
- Vitest - Fast Vite-native testing
- Cypress - E2E testing
- Playwright - Browser automation

---

## Documentation Tools

```bash
# TypeDoc - Generate API docs from TypeScript
npm install --save-dev typedoc
npx typedoc src/

# Storybook - Component documentation
npx sb init --type react --use-typescript
```

---

## Version Management

```bash
# nvm - Node version manager
nvm install 18
nvm use 18

# fnm - Fast Node manager
fnm install 18
fnm use 18
```

---

## Continuous Integration / Deployment

### GitHub Actions with TypeScript

```yaml
# .github/workflows/ci.yml
name: CI

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install
      - run: npm run build
      - run: npm test
```

**Platforms**:
- GitHub Actions - Free for public repos
- GitLab CI - Integrated with GitLab
- CircleCI - Powerful CI/CD
- Travis CI - Popular legacy choice

---

## Code Quality Tools

### Pre-commit Hooks

```bash
# husky - Git hooks
npm install husky
npx husky install

# lint-staged - Lint only staged files
npm install lint-staged

# commitlint - Validate commit messages
npm install @commitlint/cli
```

**Example .husky/pre-commit**:
```bash
#!/bin/sh
npm run lint
npm run test
```

---

## Essential Development Extensions

| Extension | Purpose |
|-----------|---------|
| ESLint | Linting |
| Prettier | Formatting |
| TypeScript | Language support |
| Rest Client | Test APIs |
| Thunder Client | API testing |
| GitLens | Git integration |
| Docker | Container support |

---

## Popular TypeScript Learning Resources

- **Official Handbook**: https://www.typescriptlang.org/docs/
- **TypeScript Deep Dive**: https://basarat.gitbook.io/typescript/
- **Exercism**: Free exercises for TypeScript
- **LeetCode**: Algorithm problems in TypeScript
- **TypeScript Discord**: Community help

---

## Ecosystem Quick Start

```bash
# Create modern React + TypeScript project
npx create-react-app my-app --typescript
cd my-app
npm install

# Add Prettier for formatting
npm install --save-dev prettier
echo '{}' > .prettierrc

# Add ESLint for linting
npx eslint --init

# Ready to code!
npm start
```

---

