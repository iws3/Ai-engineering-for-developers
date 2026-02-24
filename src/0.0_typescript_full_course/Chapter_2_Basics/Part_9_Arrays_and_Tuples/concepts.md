# Part 9: Arrays and Tuples (Beginner Deep Dive)

## 📚 Arrays

### Typed Arrays
```typescript
let numbers: number[] = [1, 2, 3];
let strings: string[] = ["a", "b", "c"];
let booleans: boolean[] = [true, false];

// Alternative syntax
let items: Array<number> = [1, 2, 3];
```

### Array Methods (Type Safe)
```typescript
const nums: number[] = [1, 2, 3];

nums.push(4);           // ✅ OK
nums.push("four");      // ❌ ERROR
nums.map(x => x * 2);   // ✅ OK
```

---

## 🎯 Tuples
A **tuple** is a fixed-length array with specific types at each position:

```typescript
type Coordinate = [number, number];
const point: Coordinate = [10, 20];  // ✅ OK
const line: Coordinate = [10];       // ❌ ERROR: needs 2 elements

type Response = [number, string];
const response: Response = [200, "OK"];
const bad: Response = ["200", "OK"];  // ❌ ERROR: wrong types
```

---

## 🏷️ Important Terms
- **Array Type (`T[]`)**
- **Tuple**
- **Fixed Length**
- **Type at Each Position**

---

## 📚 Resources
- [Arrays](https://www.typescriptlang.org/docs/handbook/2/objects.html#the-array-type)
- [Tuples](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)
