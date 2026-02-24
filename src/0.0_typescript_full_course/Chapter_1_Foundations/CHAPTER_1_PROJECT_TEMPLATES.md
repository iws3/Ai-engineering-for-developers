# Chapter 1: TypeScript Project Templates & Boilerplates

Ready to start your own TypeScript project? Here are templates for different purposes.

---

## Template 1: CLI Application (Command Line)

**Use this for**: Tools, scripts, automation, data processing

```json
// package.json
{
  "name": "my-cli-tool",
  "version": "1.0.0",
  "description": "A simple command-line tool",
  "main": "dist/index.js",
  "bin": {
    "my-tool": "dist/cli.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "ts-node src/index.ts",
    "start": "node dist/index.js",
    "test": "jest"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "ts-node": "^10.9.0",
    "@types/node": "^20.0.0",
    "jest": "^29.0.0"
  }
}
```

```typescript
// src/cli.ts
#!/usr/bin/env node

import fs from "fs";

function main() {
  console.log("CLI tool running!");
  const args = process.argv.slice(2);
  console.log("Arguments:", args);
}

main();
```

**Run it**:
```bash
npm run build
npm start
```

---

## Template 2: Node.js Backend API

**Use this for**: REST APIs, GraphQL servers, backend services

```json
{
  "name": "my-api",
  "version": "1.0.0",
  "main": "dist/server.js",
  "scripts": {
    "build": "tsc",
    "dev": "nodemon --exec ts-node src/server.ts",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "ts-node": "^10.9.0",
    "@types/express": "^4.17.17",
    "@types/node": "^20.0.0",
    "nodemon": "^3.0.0"
  }
}
```

```typescript
// src/server.ts
import express from "express";

const app = express();
const PORT = 3000;

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [];

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const newUser: User = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.json(newUser);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## Template 3: React Frontend

**Use this for**: Web UIs, single-page applications, dashboards

```json
{
  "name": "my-react-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "vite": "^5.0.0"
  }
}
```

```typescript
// src/App.tsx
import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddUser = () => {
    const newUser: User = {
      id: users.length + 1,
      name,
      email
    };
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  };

  return (
    <div>
      <h1>User Management</h1>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleAddUser}>Add User</button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};
```

---

## Template 4: TypeScript Library/Package

**Use this for**: npm packages, SDKs, reusable code

```json
{
  "name": "@myorg/my-library",
  "version": "1.0.0",
  "description": "A useful TypeScript library",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsc",
    "test": "jest",
    "prepublish": "npm run build && npm test"
  },
  "files": ["dist"],
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/node": "^20.0.0"
  }
}
```

```typescript
// src/index.ts - Main export
export interface Config {
  apiKey: string;
  endpoint: string;
}

export class MyLibrary {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  async getData<T>(id: string): Promise<T> {
    const response = await fetch(`${this.config.endpoint}/${id}`, {
      headers: {
        "Authorization": `Bearer ${this.config.apiKey}`
      }
    });
    return response.json();
  }
}
```

```json
// tsconfig.json for library
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "esnext",
    "lib": ["ES2020"],
    "declaration": true,        # Generate .d.ts files
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

## Template 5: Data Processing Pipeline

**Use this for**: ETL, batch processing, data analysis

```typescript
// src/pipeline.ts
interface DataRecord {
  id: string;
  value: number;
  timestamp: Date;
}

interface ProcessedRecord {
  id: string;
  normalizedValue: number;
  processed: true;
}

// Type-safe pipeline step
class Pipeline {
  private data: DataRecord[] = [];

  load(records: DataRecord[]): this {
    this.data = records;
    console.log(`Loaded ${records.length} records`);
    return this;
  }

  filter(predicate: (r: DataRecord) => boolean): this {
    this.data = this.data.filter(predicate);
    console.log(`Filtered to ${this.data.length} records`);
    return this;
  }

  normalize(): ProcessedRecord[] {
    const max = Math.max(...this.data.map(r => r.value));
    const min = Math.min(...this.data.map(r => r.value));
    const range = max - min;

    return this.data.map(r => ({
      id: r.id,
      normalizedValue: (r.value - min) / range,
      processed: true
    }));
  }
}

// Usage
const pipeline = new Pipeline();
const results = pipeline
  .load(records)
  .filter(r => r.value > 100)
  .normalize();
```

---

## tsconfig.json Templates

### Strict Mode (Recommended for new projects)
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
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Loose Mode (For existing projects)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "allowJs": true,
    "strict": false,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

---

## Base package.json Scripts

Every project benefits from these common scripts:

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "start": "node dist/index.js",
    "format": "prettier --write \"src/**/*.ts\"",
    "lint": "eslint src/**/*.ts",
    "test": "jest",
    "clean": "rm -rf dist"
  }
}
```

---

## Quick Start Checklists

### For CLI Tool
- [ ] Use `#!/usr/bin/env node` shebang
- [ ] Add `bin` field in package.json
- [ ] Handle command-line arguments
- [ ] Add error handling
- [ ] Test with `npm i -g` to verify

### For API
- [ ] Set up routes
- [ ] Add request validation
- [ ] Add error middleware
- [ ] Use types for request/response
- [ ] Add CORS if needed

### For React App
- [ ] Set up routing
- [ ] Type all components
- [ ] Type props and state
- [ ] Set up API service layer
- [ ] Add environment variables

### For Library
- [ ] Use barrel exports (index.ts)
- [ ] Generate .d.ts declarations
- [ ] Test with `npm link`
- [ ] Document public API
- [ ] Follow semantic versioning

---

