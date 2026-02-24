# TypeScript Monorepo Guide

Building scalable monorepo architectures with TypeScript.

---

## Setup with TypeScript Project References

### Root tsconfig.json
\`\`\`json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "rootDir": ".",
    "baseUrl": "."
  },
  "files": [],
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/api" },
    { "path": "./packages/ui" }
  ]
}
\`\`\`

### Package Structure
\`\`\`
monorepo/
  packages/
    core/
      src/
      tsconfig.json
      package.json
    api/
      src/
      tsconfig.json
      package.json
    ui/
      src/
      tsconfig.json
      package.json
  tsconfig.json
  package.json
\`\`\`

---

## Benefits

- Shared types across packages
- Atomic version bumps
- Unified testing
- Dependency clarity
- Code reuse without duplication

---

