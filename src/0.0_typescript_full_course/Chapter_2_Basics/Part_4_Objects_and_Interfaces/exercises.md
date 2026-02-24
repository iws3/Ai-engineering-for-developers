# Part 4: Objects and Interfaces — Exercises

## Exercise 1: Create an Interface (Beginner)
Define a `Product` interface with:
- `id` (number, readonly)
- `name` (string)
- `price` (number)
- `inStock` (boolean)
- `description` (optional string)

Then create 2 valid Product objects.

---

## Exercise 2: Extend an Interface (Beginner)
Create a `DiscountedProduct` interface that extends `Product` (from Exercise 1) and adds:
- `discountPercent` (number)
- `originalPrice` (number)

---

## Exercise 3: Find the Errors (Intermediate)
Which interface definitions have problems?

```typescript
interface Config {
  readonly host: string;
  readonly port: number;
  password: string;
}

interface User {
  id: number;
  name: string;
  email?: string;
}

interface Database {
  readonly host: string;
  readonly host: number;  // Problem?
  name: string;
}
```

---

## Exercise 4: Nested Interfaces (Intermediate)
Create interfaces for a blog post system:
- `Comment` interface
- `Post` interface that contains an array of Comments

---

## Challenge: Redesign an Object (Advanced)
You have this object:
```typescript
const user = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date(),
  lastLogin: new Date(),
  isActive: true,
  preferences: {
    theme: "dark",
    notifications: true
  }
};
```

Create interfaces to properly type this structure. Use readonly where appropriate and optional properties where needed.

---

## 📝 Submission
- Show your interfaces with comments explaining each property
- Create valid objects matching each interface
- Explain why readonly and optional properties matter
