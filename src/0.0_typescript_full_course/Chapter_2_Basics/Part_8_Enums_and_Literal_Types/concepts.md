# Part 8: Enums and Literal Types (Beginner Deep Dive)

## 🎯 Enums
An **enum** is a set of named constants:

```typescript
enum Status {
  Pending = "pending",
  Complete = "complete",
  Failed = "failed"
}

let status: Status = Status.Complete;
```

---

## 📝 Numeric Enums

```typescript
enum Direction {
  Up = 1,
  Down = 2,
  Left = 3,
  Right = 4
}

const dir: Direction = Direction.Up;
```

---

## 🏷️ Literal Types
A literal type is a specific exact value:

```typescript
let status: "pending" | "complete" | "failed" = "pending";

type Size = "small" | "medium" | "large";
const size: Size = "medium";
```

**Literal types are often better than enums for strings!**

---

## 🏷️ Important Terms
- **Enum**
- **Literal Type**
- **String Enum**
- **Numeric Enum**

---

## 📚 Resources
- [Enums](https://www.typescriptlang.org/docs/handbook/2/enums.html)
- [Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)
