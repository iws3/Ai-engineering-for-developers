# Day 9: Objects and Interfaces

## 🎯 Learning Objectives
- ✅ Understand interface contracts
- ✅ Define object shapes with interfaces
- ✅ Optional and readonly properties
- ✅ Interface inheritance and merging

**Time:** 50 minutes | **Difficulty:** Beginner-Intermediate | **Prerequisites:** Days 1-8

---

## 📚 Objects and Interfaces

### Basic Interface
```typescript
// Define what properties an object must have
interface User {
  name: string;
  age: number;
  email: string;
}

// Object must match interface
const user: User = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

// Missing property? ERROR
const incomplete: User = {
  name: "Bob",
  age: 25
  // ❌ ERROR: missing email
};
```

### Optional Properties
```typescript
interface Profile {
  username: string;
  bio?: string;  // Optional!
  website?: string;
}

const profile1: Profile = {
  username: "alice123"
  // bio and website not required
};

const profile2: Profile = {
  username: "bob123",
  bio: "Software engineer",
  website: "example.com"
};
```

### Readonly Properties
```typescript
interface Config {
  readonly apiUrl: string;
  readonly version: string;
  timeout: number;  // Can change
}

const config: Config = {
  apiUrl: "https://api.example.com",
  version: "1.0.0",
  timeout: 5000
};

config.timeout = 10000;  // ✅ OK
config.apiUrl = "https://new.com";  // ❌ ERROR: readonly
```

### Inline Types
```typescript
// Instead of interface, use type annotation
const user: { name: string; age: number } = {
  name: "Alice",
  age: 30
};

// But interfaces are preferred for objects
// (we'll see why when we cover inheritance)
```

---

## 🧠 Real-World Examples

### AI Engineering - Chat Message
```typescript
interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  tokens?: number;  // Optional token count
}

interface ChatConfig {
  readonly model: string;
  readonly apiKey: string;
  temperature: number;
  maxTokens: number;
}

const message: ChatMessage = {
  role: "user",
  content: "What is TypeScript?",
  timestamp: new Date()
};

const config: ChatConfig = {
  model: "gpt-4",
  apiKey: "sk-...",
  temperature: 0.7,
  maxTokens: 2048
};
```

### Frontend - React Props
```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

interface FormInputProps {
  readonly name: string;
  value: string;
  placeholder?: string;
  required: boolean;
}

const buttonProps: ButtonProps = {
  label: "Click me",
  onClick: () => console.log("clicked")
};
```

---

## 🔄 Interface Inheritance

```typescript
interface Animal {
  name: string;
  age: number;
}

// Extend Animal
interface Dog extends Animal {
  breed: string;
}

const dog: Dog = {
  name: "Buddy",
  age: 5,
  breed: "Golden Retriever"
};

// Multiple inheritance
interface Swimmer {
  swim(): void;
}

interface Flyer {
  fly(): void;
}

interface Duck extends Swimmer, Flyer {
  name: string;
}
```

---

## ✨ Best Practices

✅ **DO:**
1. Use interfaces for object shapes
2. Make properties readonly if they shouldn't change
3. Use optional properties sparingly (be explicit)
4. Inherit interfaces to share common properties

❌ **DON'T:**
1. Use `any` in interfaces
2. Create overly complex interfaces
3. Mutate readonly properties

---

## 🎯 Quick Exercises

### Exercise 1: Create an Interface
Create a `Product` interface with:
- `id` (number, readonly)
- `name` (string)
- `price` (number)
- `inStock` (boolean)
- `description` (string, optional)

### Exercise 2: Extend Interface
Create a `DiscountedProduct` interface that extends `Product` and adds:
- `discountPercent` (number)

### Exercise 3: Create Valid Objects
Which objects are valid for the `Product` interface from Exercise 1?

```typescript
// A
const productA = {
  id: 1,
  name: "Laptop",
  price: 999,
  inStock: true
};

// B
const productB: Product = {
  id: 2,
  name: "Mouse",
  price: 25
};

// C
const productC: Product = {
  id: 3,
  name: "Keyboard",
  price: 75,
  inStock: true,
  description: "Mechanical keyboard"
};
```

---

## ✅ Solutions

**Exercise 1:**
```typescript
interface Product {
  readonly id: number;
  name: string;
  price: number;
  inStock: boolean;
  description?: string;
}
```

**Exercise 2:**
```typescript
interface DiscountedProduct extends Product {
  discountPercent: number;
}
```

**Exercise 3:**
- A: ❌ Missing `inStock` (required)
- B: ❌ Missing `inStock` (required)
- C: ✅ Valid (description is optional)

---

## 📝 Key Takeaways
1. **Interfaces define contracts** - What objects must have
2. **Optional properties** - Use `?` for optional fields
3. **Readonly** - Prevent accidental mutations
4. **Inheritance** - Share common properties between interfaces
5. **Composition over complexity** - Start simple, extend as needed

---

**Next:** [Day 10: Advanced Type Inference](./Day_10_Advanced_Type_Inference.md)
