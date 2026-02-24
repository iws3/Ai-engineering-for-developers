# Day 9: Objects and Interfaces - Exercises

## 📋 Exercise 1: Create an Interface (Beginner)

Create an interface for a `Book` with:
- `title` (string)
- `author` (string)
- `isbn` (string)
- `pages` (number)
- `published` (optional date)

Then create a valid `Book` object.

---

## 📋 Exercise 2: Extend an Interface (Intermediate)

Create a `LibraryBook` interface that extends the `Book` interface from Exercise 1 and adds:
- `catalogId` (readonly number)
- `available` (boolean)
- `lastBorrowed` (optional date)

Create a valid `LibraryBook` object.

---

## 📋 Exercise 3: Find the Errors (Advanced)

Which interface definitions have problems? Fix them:

```typescript
// 1.
interface DatabaseConfig {
  readonly host: string;
  readonly port: number;
  password: string;
  options?: { ssl: boolean; timeout?: number };
}

// 2.
interface User {
  id: number;
  name: string;
  email: string?;  // Problem here?
}

// 3.
interface Product {
  readonly id: number;
  readonly name: string;
  name: string;  // Problem here?
  price: number;
}
```

---

## 🎯 Solutions

### Exercise 1 Solution
```typescript
interface Book {
  title: string;
  author: string;
  isbn: string;
  pages: number;
  published?: Date;
}

const book: Book = {
  title: "The TypeScript Handbook",
  author: "Microsoft",
  isbn: "123-456-789",
  pages: 500,
  published: new Date("2020-01-01")
};
```

---

### Exercise 2 Solution
```typescript
interface Book {
  title: string;
  author: string;
  isbn: string;
  pages: number;
  published?: Date;
}

interface LibraryBook extends Book {
  readonly catalogId: number;
  available: boolean;
  lastBorrowed?: Date;
}

const libraryBook: LibraryBook = {
  title: "The TypeScript Handbook",
  author: "Microsoft",
  isbn: "123-456-789",
  pages: 500,
  catalogId: 1001,
  available: true,
  lastBorrowed: new Date("2024-01-10")
};
```

---

### Exercise 3 Solutions
```typescript
// 1. ✅ OK - This is correct

// 2. ❌ Problem: Should use `email?: string` not `email: string?`
interface User {
  id: number;
  name: string;
  email?: string;  // Fixed
}

// 3. ❌ Problem: Duplicate property `name`
interface Product {
  readonly id: number;
  readonly name: string;  // Remove one
  price: number;
}
```

---

## 📝 Submission Guidelines

✅ **Your task:**
1. Solve all three exercises
2. Create a folder: `Learners/Day_9_Exercises/Solutions/[your-github-username]/`
3. Create file: `solutions.ts` with your answers
4. Create a PR with message: `[Day 9] Objects and Interfaces - [Your Name]`

📚 **What we're checking:**
- Can you create valid interfaces?
- Do you understand interface inheritance?
- Can you spot interface errors?

🎯 **Learning outcomes:**
- Interface design mastery
- Object shape contracts confidence
- Type composition understanding

---

**Need help?** Check `Learners/Day_9_Exercises/Solutions/examples/` for reference solutions!
