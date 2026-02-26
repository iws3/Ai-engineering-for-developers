# Middleware and Request Piping

## Middleware Chain

```typescript
type Middleware<T> = (data: T, next: () => Promise<T>) => Promise<T>;

class MiddlewareChain<T> {
  private middlewares: Middleware<T>[] = [];

  use(middleware: Middleware<T>): this {
    this.middlewares.push(middleware);
    return this;
  }

  async execute(data: T): Promise<T> {
    let index = 0;
    const next = async (): Promise<T> => {
      if (index >= this.middlewares.length) return data;
      const middleware = this.middlewares[index++];
      return middleware(data, next);
    };
    return next();
  }
}
```

## Checklist

- [ ] Build middleware chains
- [ ] Handle async operations
- [ ] Error propagation
- [ ] Test middleware
