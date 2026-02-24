# Part 7: Type Aliases vs Interfaces (Beginner Deep Dive)

## 🎯 Type Aliases
A **type alias** creates a name for any type:

```typescript
type Point = { x: number; y: number };
type Status = "pending" | "complete" | "failed";
type ID = string | number;

const point: Point = { x: 10, y: 20 };
const status: Status = "complete";
```

---

## 🏗️ Interfaces
An **interface** defines object shapes:

```typescript
interface User {
  name: string;
  email: string;
}

const user: User = {
  name: "Alice",
  email: "alice@example.com"
};
```

---

## 🔄 When to Use Each

**Use `interface` for:**
- Object shapes
- Classes
- When you might extend it

**Use `type` for:**
- Unions and primitives
- Function types
- Simple mappings

```typescript
// Interface: Objects
interface Database {
  host: string;
  port: number;
}

// Type alias: Union
type Result = { success: true; data: any } | { success: false; error: string };

// Type alias: Function
type Callback = (data: any) => void;
```

---

## 🏷️ Important Terms
- **Type Alias**
- **Interface**
- **Declaration Merging** (interfaces only)

---

## 📚 Resources
- [Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
- [Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
