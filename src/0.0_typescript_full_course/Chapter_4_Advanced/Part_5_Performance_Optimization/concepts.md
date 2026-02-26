# Part 5: Performance Optimization (Advanced Deep Dive)

## Learning Objectives

After this part you'll understand:
- Compilation performance tuning
- Type checking optimization
- Bundle size reduction
- Incremental builds
- Profiling TypeScript code

---

## tsconfig Optimization

Faster compilation:

```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "tsBuildInfoFile": ".tsbuildinfo",
    "incremental": true
  }
}
```

### skipLibCheck

Skip checking third-party library types:
```json
{
  "compilerOptions": {
    "skipLibCheck": true  // Skip node_modules type checking
  }
}
```

### Incremental

Only recompile changed files:
```json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  }
}
```

---

## Type Performance

```typescript
// BAD: Very deep type
type Level1 = Value extends string ? Level2 : never;
type Level2 = Level1 extends string ? Level3 : never;
// ... many levels ...

// GOOD: Flatter structure
type Result = Value extends string
  ? Check1
  : Check2
  : Check3;
```

---

## Bundle Size

### Tree-Shaking

```typescript
// GOOD: Named exports (tree-shakeable)
export function used() { }
export function unused() { }

// BAD: Default export (all included)
export default {
  used() { },
  unused() { }
};
```

### External Dependencies

```typescript
// GOOD: Separate entry points
import { lightweight } from "library/lite";

// BAD: Importing everything
import * as heavy from "library";
```

---

## Incremental Builds

```bash
# Initial build
npm run build

# Subsequent builds only compile changes
npm run build  # Much faster!
```

### Project References

```json
{
  "references": [
    { "path": "./packages/core" }
  ]
}
```

---

## Profiling

```bash
# Measure compilation time
tsc --diagnostics

# Show slowest type operations
tsc --pretty false --diagnostics | head -20

# Output with performance details
node --trace-gc tsc app.ts > gc-log.txt 2>&1
```

---

## Runtime Performance

```typescript
// Pre-calculate where possible
const VALID_STATUSES = new Set(["pending", "done", "error"]);

function isValid(status: string): status is Status {
  return VALID_STATUSES.has(status);
}

// Avoid expensive operations in hot code
function process(items: Item[]): void {
  // Cache expensive computation
  const cache = new Map<string, Result>();

  for (const item of items) {
    if (cache.has(item.id)) {
      return cache.get(item.id);
    }

    const result = expensiveOp(item);
    cache.set(item.id, result);
  }
}
```

---

## Lazy Loading

```typescript
// Load modules only when needed
async function initializeUI() {
  const { UIComponent } = await import("./ui");
  return new UIComponent();
}
```

---

## Checklist

- [ ] Enable incremental compilation
- [ ] Use skipLibCheck in projects
- [ ] Tree-shake unused exports
- [ ] Profile compilation speed
- [ ] Use path aliases wisely
- [ ] Cache expensive computations
