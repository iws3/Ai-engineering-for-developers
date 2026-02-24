# Day 7: Variables and Constants - Exercises

## 📋 Exercise 1: Choose the Right Declaration (Beginner)

For each scenario, choose `const` or `let` and explain why:

```typescript
// 1. A username that never changes
___ username = "alice_dev";

// 2. A counter that increments
___ count = 0;

// 3. An API configuration
___ API_BASE_URL = "https://api.example.com";

// 4. An array that grows over time
___ userList = [];

// 5. A configuration object
___ appConfig = { debug: true, timeout: 5000 };
```

**Hint:** Most should be `const`. Only use `let` if the variable itself will be reassigned.

---

## 📋 Exercise 2: Spot the Errors (Intermediate)

Which lines have errors? Explain what's wrong:

```typescript
const name = "Alice";
name = "Bob";  // Line 2 - ERROR or OK?

const numbers = [1, 2, 3];
numbers.push(4);  // Line 5 - ERROR or OK?

const config = { timeout: 5000 };
config.timeout = 10000;  // Line 8 - ERROR or OK?

const person = { name: "Charlie" };
person = { name: "David" };  // Line 11 - ERROR or OK?

let count = 5;
count = 10;  // Line 14 - ERROR or OK?
count++;  // Line 15 - ERROR or OK?
```

---

## 📋 Exercise 3: Type the Variables (Advanced)

Add type annotations to these variables:

```typescript
// 1. User data
___ user = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

// 2. List of items
___ items = ["apple", "banana", 100];

// 3. Configuration with mixed types
___ config = {
  debug: true,
  port: 3000,
  host: "localhost"
};

// 4. Tuple-like data
___ coordinates = [10.5, 20.3];
```

**Challenge:** Make sure your types are as specific as possible.

---

## 🎯 Solutions

### Exercise 1 Solutions
```typescript
// 1. const - doesn't change
const username = "alice_dev";

// 2. let - will be reassigned
let count = 0;

// 3. const - constant value
const API_BASE_URL = "https://api.example.com";

// 4. const - array contents change, but variable doesn't reassign
const userList = [];

// 5. const - object contents change, but variable doesn't reassign
const appConfig = { debug: true, timeout: 5000 };
```

**Key Insight:** Use `const` by default. Only use `let` when you actually reassign the variable (like `count = 5; count = 10;`).

---

### Exercise 2 Solutions
```typescript
const name = "Alice";
name = "Bob";  // ❌ ERROR - Can't reassign const

const numbers = [1, 2, 3];
numbers.push(4);  // ✅ OK - Array methods are allowed

const config = { timeout: 5000 };
config.timeout = 10000;  // ✅ OK - Property changes allowed

const person = { name: "Charlie" };
person = { name: "David" };  // ❌ ERROR - Can't reassign const

let count = 5;
count = 10;  // ✅ OK - let allows reassignment
count++;  // ✅ OK - Increment operator works with let
```

**Key Insight:** `const` prevents reassignment but allows mutations (array.push, object.property = value).

---

### Exercise 3 Solutions
```typescript
// 1. User data
const user: { name: string; age: number; email: string } = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

// Or with an interface (better):
interface User {
  name: string;
  age: number;
  email: string;
}
const user: User = { /* ... */ };

// 2. List of items
const items: (string | number)[] = ["apple", "banana", 100];

// 3. Configuration with mixed types
const config: { debug: boolean; port: number; host: string } = {
  debug: true,
  port: 3000,
  host: "localhost"
};

// 4. Tuple-like data
const coordinates: [number, number] = [10.5, 20.3];
```

---

## 📝 Submission Guidelines

✅ **Your task:**
1. Solve all three exercises
2. Create a folder: `Learners/Day_7_Exercises/Solutions/[your-github-username]/`
3. Create file: `solutions.ts` with your answers
4. Create a PR with message: `[Day 7] Variables and Constants - [Your Name]`

📚 **What we're checking:**
- Did you choose the right declaration? (const vs let)
- Do you understand mutability?
- Can you type variables correctly?

🎯 **Learning outcomes:**
- Mastery of const vs let
- Understanding immutability
- Type annotations confidence

---

**Need help?** Check `Learners/Day_7_Exercises/Solutions/examples/` for reference solutions!
