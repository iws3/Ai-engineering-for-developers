# Part 6: Union and Intersection Types — Exercises

## Exercise 1: Union Types (Beginner)
Create a variable that can be string OR number:

```typescript
let value: ___ | ___ = "hello";
value = 42;
value = true;  // Should ERROR
```

---

## Exercise 2: Type Guards (Intermediate)
Safe handling of union types:

```typescript
function print(value: string | number) {
  if (typeof value === "___") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

---

## Exercise 3: Intersection Types (Intermediate)
Combine two interfaces with `&`

---

## 📝 Submission
Show your union and intersection examples with explanations
