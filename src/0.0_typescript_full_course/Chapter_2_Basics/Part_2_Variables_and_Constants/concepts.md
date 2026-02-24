# Part 2: Variables and Constants (Beginner Deep Dive)

## 🎯 Choosing Between const, let, and var

### `const` - Use  This First!
```typescript
const username = "alice";  // Cannot reassign
username = "bob";          // ❌ ERROR
```

**When to use:** For values that won't change!

---

### `let` - When You Need to Reassign
```typescript
let count = 0;
count = 1;     // ✅ OK
count++;       // ✅ OK
```

**When to use:** For variables that will change

---

### `var` - Don't Use! (Legacy)
```typescript
var oldWay = "Don't use this";  // ❌ Avoid in modern code
```

**Why avoid:**
- Confusing scoping rules
- Can be accidentally redeclared
- Not in modern JavaScript

---

## 📝 Key Terms
- **const:** Cannot reassign (immutable)
- **let:** Can reassign (mutable)
- **var:** Legacy (avoid!)
- **Immutability:** Once set, doesn't change
- **Scope:** Where a variable is accessible

---

## 🔒 const Doesn't Mean Immutable

```typescript
const user = { name: "Alice", age: 30 };
user.age = 31;                    // ✅ OK - can modify properties
user = { name: "Bob", age: 25 };  // ❌ ERROR - can't reassign

const items = [1, 2, 3];
items.push(4);                   // ✅ OK - can call methods
items = [5, 6];                  // ❌ ERROR - can't reassign
```

**Key Insight:** `const` prevents reassignment, not mutations!

---

## 📍 Scope: Where Variables Exist

### Global Scope
```typescript
const global = "I'm everywhere";

function myFunction() {
  console.log(global);  // ✅ Can access
}
```

### Function Scope
```typescript
function myFunction() {
  const local = "Only in this function";
  console.log(local);  // ✅ Can access
}

console.log(local);    // ❌ ERROR: not defined
```

### Block Scope (let/const)
```typescript
if (true) {
  const blockScoped = "Only in this block";
  console.log(blockScoped);  // ✅ OK
}

console.log(blockScoped);    // ❌ ERROR: not defined
```

---

## 🎯 Real-World Examples

### Configuration (use const)
```typescript
const API_URL = "https://api.example.com";
const MAX_RETRIES = 3;
const TIMEOUT_MS = 5000;
```

### Counters (use let)
```typescript
let retries = 0;
while (retries < MAX_RETRIES) {
  retry();
  retries++;
}
```

### Dynamic State (use let)
```typescript
let currentUser = null;
currentUser = getUserData();  // Now it has value
```

---

## 🏷️ Important Terms
- **const**
- **let**
- **var (avoid)**
- **Scope**
- **Immutability**

---

## 📚 Resources
- [const vs let Explained](https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/)
- [JavaScript Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope)

---

## ✅ Best Practice Checklist
- [ ] Use `const` by default
- [ ] Use `let` only for values that change
- [ ] Never use `var`
- [ ] Understand that `const` ≠ immutable
- [ ] Keep variables in narrowest scope possible

