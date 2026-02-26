# Error Handling and Exception Strategies

Complete guide to error handling in TypeScript...

## Custom Error Classes

```typescript
class AppError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

class ValidationError extends AppError {
  constructor(public field: string, message: string) {
    super("VALIDATION_ERROR", message);
  }
}

// Usage
try {
  throw new ValidationError("email", "Invalid email");
} catch (e) {
  if (e instanceof ValidationError) {
    console.log(`Validation failed on ${e.field}`);
  }
}
```

## Result Types

```typescript
type Result<T, E> = { success: true; value: T } | { success: false; error: E };

function parseJSON<T>(json: string): Result<T, Error> {
  try {
    return { success: true, value: JSON.parse(json) };
  } catch(error) {
    return { success: false, error: error as Error };
  }
}

const result = parseJSON('{"name":"Alice"}');
if (result.success) {
  console.log(result.value);
} else {
  console.error(result.error);
}
```

## Checklist

- [ ] Create custom error classes
- [ ] Use Result types
- [ ] Implement error middleware
- [ ] Log errors properly
