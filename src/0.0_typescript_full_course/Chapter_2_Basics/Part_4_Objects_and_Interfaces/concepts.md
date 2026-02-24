# Part 4: Objects and Interfaces (Beginner Deep Dive)

## 🎯 What is an Object?
An **object** is a collection of key-value pairs. An **interface** defines the shape of an object.

---

## 📝 Key Terms
- **Object Literal:** `{ key: value }`
- **Interface:** A contract defining object properties
- **Property:** A key-value pair in an object
- **Optional Property:** A property that doesn't have to exist
- **Readonly Property:** A property that can't be changed

---

## 🏗️ Objects and Interfaces

### Define an Interface
```typescript
interface User {
  name: string;
  age: number;
  email: string;
}
```

This says: "A User MUST have name (string), age (number), and email (string)."

### Use the Interface
```typescript
const alice: User = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

// Missing email? ERROR!
const bob: User = {
  name: "Bob",
  age: 25
};  // ❌ ERROR: missing email
```

---

## 🔧 Optional Properties

```typescript
interface Profile {
  username: string;
  bio?: string;      // Optional (may not exist)
  website?: string;  // Optional
}

const alice: Profile = {
  username: "alice_dev"
  // bio and website not required
};

const bob: Profile = {
  username: "bob_dev",
  bio: "Software engineer",
  website: "bob.dev"
};
```

---

## 🔒 Readonly Properties

```typescript
interface Config {
  readonly apiUrl: string;
  readonly version: string;
  timeout: number;  // Can change (not readonly)
}

const config: Config = {
  apiUrl: "https://api.example.com",
  version: "1.0.0",
  timeout: 5000
};

config.timeout = 10000;      // ✅ OK
config.apiUrl = "https://..."; // ❌ ERROR: readonly
```

---

## 📦 Nested Objects

```typescript
interface Address {
  street: string;
  city: string;
  zipcode: string;
}

interface Person {
  name: string;
  address: Address;
}

const alice: Person = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "Portland",
    zipcode: "97201"
  }
};
```

---

## 🔄 Interface Inheritance

```typescript
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
}

const buddy: Dog = {
  name: "Buddy",
  age: 5,
  breed: "Golden Retriever"
};
```

---

## 🎯 Real-World Example: Chat Interface

```typescript
interface Message {
  readonly id: number;
  author: string;
  content: string;
  timestamp: Date;
  reactions?: number;  // Optional
}

interface ChatRoom {
  name: string;
  messages: Message[];
  readonly createdAt: Date;
}

const room: ChatRoom = {
  name: "TypeScript Help",
  messages: [
    {
      id: 1,
      author: "Alice",
      content: "What is a type?",
      timestamp: new Date(),
      reactions: 5
    }
  ],
  createdAt: new Date()
};
```

---

## 🏷️ Important Terms
- **Object**
- **Interface**
- **Property**
- **Optional Property (`?`)**
- **Readonly Property**
- **Inheritance**

---

## 📚 Resources
- [TypeScript Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [Objects in JavaScript (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

---

## ✅ Best Practice Checklist
- [ ] Name interfaces descriptively
- [ ] Use optional properties when appropriate
- [ ] Use readonly for immutable properties
- [ ] Keep interfaces focused and simple
- [ ] Use inheritance to avoid duplication

