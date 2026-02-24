# Part 6: Union and Intersection Types (Beginner Deep Dive)

## 🎯 Union Types: OR Logic
A **union type** allows a value to be one of multiple types.

```typescript
let value: string | number;
value = "hello";   // ✅ OK
value = 42;        // ✅ OK
value = true;      // ❌ ERROR
```

---

## 📝 Common Use Cases

```typescript
// Function that accepts string OR number
function processValue(value: string | number): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}

// Success or error response
type Response = { status: "success"; data: any } | { status: "error"; message: string };

const response: Response = {
  status: "success",
  data: { id: 1, name: "Alice" }
};
```

---

## 🤝 Intersection Types: AND Logic
An **intersection type** combines multiple types.

```typescript
interface Animal {
  name: string;
  age: number;
}

interface Pet {
  owner: string;
}

type MyPet = Animal & Pet;  // Must have BOTH

const dog: MyPet = {
  name: "Buddy",
  age: 5,
  owner: "Alice"
};
```

---

## 🏷️ Important Terms
- **Union Type (`|`)**
- **Intersection Type (`&`)**
- **Type Guards**

---

## 📚 Resources
- [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [Intersection Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)
