# Part 10: Async/Await & Promises (Intermediate Deep Dive)

## Learning Objectives

After this part you'll understand:
- Promise basics and states
- Async/await syntax
- Error handling with try-catch
- Promise.all, Promise.race patterns
- Real-world async patterns

---

## Key Terms

- **Promise**: Object representing future value
- **Async**: Function returning a Promise
- **Await**: Pause execution until Promise resolves
- **Microtask**: JavaScript task queue for Promises

---

## Promises - The Foundation

Promises represent async operations:

```typescript
// Creating a Promise
const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => resolve("done"), 1000);
});

// Consuming a Promise
promise.then(result => {
  console.log(result);  // "done"
});

// Chaining
fetch("/api/users")
  .then(r => r.json())
  .then(users => users.filter(u => u.active))
  .catch(error => console.error(error));
```

---

## Async/Await Syntax

Modern Promise handling:

```typescript
// Async function returns Promise
async function getUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const user = await response.json();
  return user;
}

// Usage
const user = await getUser("123");

// Error handling
try {
  const user = await getUser("123");
} catch (error) {
  console.error("Failed:", error);
}
```

---

## Real-World Patterns

### Retry Pattern

```typescript
async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
}

// Usage
const data = await retry(() => fetch("/api/data").then(r => r.json()));
```

### Race Pattern

```typescript
const result = await Promise.race([
  fetch("/api/data"),
  new Promise((_, reject) => 
    setTimeout(() => reject(new Error("timeout")), 5000)
  )
]);
```

---

## Resources

- [TypeScript Handbook: Async/Await](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html#async-await)
- [MDN Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

---

## Checklist

- [ ] Understand Promise creation and states
- [ ] Know async/await syntax
- [ ] Understand error handling with try-catch
- [ ] Know Promise.all and Promise.race
- [ ] Apply real-world async patterns
