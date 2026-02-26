# Concurrency and Async Patterns

## Promise Utilities

```typescript
function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => 
      setTimeout(() => reject(new Error("Timeout")), ms)
    )
  ]);
}

async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3
): Promise<T> {
  for (let i = 1; i <= maxAttempts; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === maxAttempts) throw e;
      await new Promise(r => setTimeout(r, 100 * i));
    }
  }
  throw new Error("Max retries");
}
```

## Worker Threads

```typescript
import { Worker } from "worker_threads";

async function runInWorker<T>(code: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(code, { eval: true });
    worker.on("message", resolve);
    worker.on("error", reject);
  });
}
```

## Checklist

- [ ] Use Promise utilities
- [ ] Implement retry logic
- [ ] Handle concurrency
- [ ] Use worker threads
