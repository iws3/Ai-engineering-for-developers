# Documentation Generation

## JSDoc to Markdown

```typescript
/**
 * Adds two numbers
 * @param a First number
 * @param b Second number  
 * @returns Sum of a and b
 */
function add(a: number, b: number): number {
  return a + b;
}

/**
 * User data model
 */
interface User {
  /** Unique identifier */
  id: string;
  /** User email */
  email: string;
}
```

Tools:
- TypeDoc for API docs
- TSDoc for comments
- Docusaurus for sites

## Checklist

- [ ] Write JSDoc
- [ ] Generate API docs
- [ ] Create guides
- [ ] Maintain docs with code
