# Part 5: Advanced Generics (Intermediate Deep Dive)

## 🎯 Learning Objectives

After this part, you'll understand:
- Generic constraints and bounds
- Type parameter inference
- Multiple type parameters
- Default type parameters
- Generic utility patterns
- Advanced patterns (currying, builders)
- Real-world generic applications

---

## 📝 Key Terms

- **Generic Constraint**: Restricting what types a type parameter can be
- **extends**: Keyword for constraining type parameters
- **Type Parameter**: The `<T>` in generic functions/classes
- **Inference**: TypeScript determining generic types from usage
- **Currying**: Creating specialized versions of generic functions
- **Builder Pattern**: Generic class building objects step-by-step

---

## 🎯 Generic Constraints

Constrain what types a generic can accept:

```typescript
// ❌ Without constraint - Too permissive
function getLength(input: any): number {
  return input.length;  // What if input doesn't have length?
}

// ✅ With constraint - Type-safe
function getLength<T extends { length: number }>(input: T): number {
  return input.length;  // ✅ Safe - we know it has length
}

getLength("hello");      // ✅ OK - string has length
getLength([1, 2, 3]);    // ✅ OK - array has length
getLength({ length: 5}); // ✅ OK - object with length property
getLength(42);           // ❌ ERROR - number doesn't have length
```

**Common constraints:**

```typescript
// Constraint: Must be object
function processObject<T extends object>(obj: T): void {
  console.log(Object.keys(obj));
}

// Constraint: Must be string or number
function getValue<T extends string | number>(val: T): T {
  return val;
}

// Constraint: Must have name property
function getName<T extends { name: string }>(obj: T): string {
  return obj.name;
}

// Constraint: Must be array
function getFirst<T extends any[]>(arr: T): T[0] {
  return arr[0];
}

// Constraint: Must be constructor
function create<T extends new (...args: any[]) => any>(
  constructor: T
): InstanceType<T> {
  return new constructor();
}
```

---

## 🔗 Keyof Constraints

The `keyof` keyword gets all property names of a type:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// T extends keyof User means "T must be a key of User"
function getProperty<T extends keyof User>(obj: User, key: T): User[T] {
  return obj[key];
}

const user: User = { id: 1, name: "Alice", email: "alice@example.com" };

const id = getProperty(user, "id");        // ✅ Type: number
const name = getProperty(user, "name");    // ✅ Type: string
const email = getProperty(user, "email");  // ✅ Type: string

// getProperty(user, "age");  // ❌ ERROR: "age" is not a key of User
```

**Real-world example:**

```typescript
// Type-safe object update function
function updateProperty<
  T extends object,
  K extends keyof T
>(obj: T, key: K, value: T[K]): void {
  obj[key] = value;  // ✅ Type-safe assignment
}

const user = { name: "Alice", age: 30 };
updateProperty(user, "name", "Bob");        // ✅ OK - string
updateProperty(user, "age", 31);            // ✅ OK - number
// updateProperty(user, "age", "thirty");   // ❌ ERROR - string not assignable to number
```

---

## 🔄 Multiple Type Parameters

Generics can have múltiple type parameters:

```typescript
// Dictionary/Map with key and value types
interface Dictionary<K, V> {
  [key: K]: V;
}

const stringToNumber: Dictionary<string, number> = {
  "count": 5,
  "age": 30
};

// Function with multiple parameters
function mapArray<T, U>(
  items: T[],
  mapper: (item: T) => U
): U[] {
  return items.map(mapper);
}

const numbers = [1, 2, 3];
const strings = mapArray(numbers, n => n.toString());  // U is string

// Multiple constraints
function merge<T extends object, U extends object>(
  obj1: T,
  obj2: U
): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ a: 1 }, { b: "hello" });
// Type: { a: number } & { b: string }
```

---

## 📌 Default Type Parameters

Generics can have default types:

```typescript
// Default type parameter: T = string
interface Container<T = string> {
  value: T;
  getValue(): T;
}

const stringContainer: Container = { 
  value: "hello",
  getValue() { return this.value; }
};

const numberContainer: Container<number> = {
  value: 42,
  getValue() { return this.value; }
};

// Function with default
function createArray<T = string>(length: number, fill: T): T[] {
  return Array(length).fill(fill);
}

const strings = createArray(3, "x");       // Type: string[], inferred from "x"
const numbers = createArray<number>(3, 5);  // Type: number[], explicit
```

---

## 🎨 Advanced Patterns

### Pattern 1: Generic builders

```typescript
class QueryBuilder<T> {
  private filters: Array<(item: any) => boolean> = [];

  where(predicate: (item: T) => boolean): this {
    this.filters.push(predicate);
    return this;  // Return this for chaining
  }

  execute(items: T[]): T[] {
    return items.filter(item =>
      this.filters.every(f => f(item))
    );
  }
}

interface User {
  id: number;
  name: string;
  age: number;
}

const users: User[] = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 25 },
  { id: 3, name: "Charlie", age: 35 }
];

const results = new QueryBuilder<User>()
  .where(u => u.age > 25)
  .where(u => u.name.includes("a"))
  .execute(users);
  // Results: [{ id: 1, name: "Alice", age: 30 }]
```

### Pattern 2: Generic composition

```typescript
type ApiEndpoint<T> = {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  response: T;
};

const getUserEndpoint: ApiEndpoint<{ id: number; name: string }> = {
  path: "/api/users/:id",
  method: "GET",
  response: { id: 1, name: "Alice" }
};

// Generic function to call endpoints
async function callEndpoint<T>(
  endpoint: ApiEndpoint<T>,
  ...args: any[]
): Promise<T> {
  // Simulate API call
  return endpoint.response;
}

const user = await callEndpoint(getUserEndpoint);
// Type of user: { id: number; name: string }
```

### Pattern 3: Recursive generics

```typescript
// Type-safe tree structure
interface TreeNode<T> {
  value: T;
  children?: TreeNode<T>[];
}

function flattenTree<T>(node: TreeNode<T>): T[] {
  const result = [node.value];
  if (node.children) {
    for (const child of node.children) {
      result.push(...flattenTree(child));
    }
  }
  return result;
}

interface MenuItem {
  label: string;
  icon: string;
}

const menu: TreeNode<MenuItem> = {
  value: { label: "Home", icon: "home" },
  children: [
    {
      value: { label: "About", icon: "info" },
      children: []
    },
    {
      value: { label: "Services", icon: "settings" },
      children: [{
        value: { label: "Consulting", icon: "consultant" }
      }]
    }
  ]
};

const allItems = flattenTree(menu);
```

---

## 📚 Practical Real-World Examples

### Example 1: Repository Pattern

```typescript
interface Repository<T> {
  create(item: Omit<T, "id">): T;
  read(id: string): T | null;
  update(id: string, changes: Partial<T>): T | null;
  delete(id: string): boolean;
  list(): T[];
}

class MemoryRepository<T extends { id: string }> implements Repository<T> {
  private items = new Map<string, T>();

  create(item: Omit<T, "id">): T {
    const id = Math.random().toString();
    const newItem = { ...item, id } as T;
    this.items.set(id, newItem);
    return newItem;
  }

  read(id: string): T | null {
    return this.items.get(id) || null;
  }

  update(id: string, changes: Partial<T>): T | null {
    const item = this.items.get(id);
    if (!item) return null;
    const updated = { ...item, ...changes } as T;
    this.items.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }

  list(): T[] {
    return Array.from(this.items.values());
  }
}

interface User {
  id: string;
  name: string;
  email: string;
}

const userRepo = new MemoryRepository<User>();
const user = userRepo.create({ name: "Alice", email: "alice@example.com" });
```

### Example 2: HTTP Client

```typescript
interface HttpConfig {
  timeout: number;
  retries: number;
}

class HttpClient<T = any> {
  constructor(private config: HttpConfig) {}

  async get<R = T>(url: string): Promise<R> {
    // Implementation
    return {} as R;
  }

  async post<D, R = T>(url: string, data: D): Promise<R> {
    // Implementation
    return {} as R;
  }
}

interface UserResponse {
  id: number;
  name: string;
}

const client = new HttpClient<UserResponse>({ timeout: 5000, retries: 3 });
const user = await client.get<UserResponse>("/api/users/1");  // Type: UserResponse
```

---

## ⚠️ Common Pitfalls

### Pitfall 1: Over-Constraining

```typescript
// ❌ BAD - Too restrictive
function getFirst<T extends string | number>(
  items: T[]
): T {
  return items[0];
}

// Can't use with other types
getFirst([true, false]);  // ❌ ERROR

// ✅ GOOD - More general
function getFirst<T>(items: T[]): T {
  return items[0];
}

getFirst([true, false]);  // ✅ OK
```

### Pitfall 2: Forgetting to Extend in Constraints

```typescript
// ❌ Wrong - K can be any string
function getProperty<T, K>(obj: T, key: K): unknown {
  return (obj as any)[key];
}

// ✅ Correct - K must be a key of T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

---

## 🌟 Best Practices

```typescript
// ✅ GOOD: Use constraints to guide types
function getObjectKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

// ✅ GOOD: Use multiple parameters for flexibility
type Result<T, E> = { success: true; data: T } | { success: false; error: E };

// ❌ BAD: Unnecessary any
function doSomething<T>(item: any[]): T {
  return item[0];
}

// ✅ GOOD: Proper constraints
function doSomething<T extends any[]>(item: T): T[0] {
  return item[0];
}
```

---

## 📚 Resources

- [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Generic Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
- [keyof Type](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)

---

## ✅ Checklist

- [ ] Understand generic constraints with `extends`
- [ ] Know how to use `keyof` for type-safe property access
- [ ] Can work with multiple type parameters
- [ ] Understand default type parameters
- [ ] Know advanced patterns (builders, composition)
- [ ] Can create real-world generic patterns
- [ ] Avoid over-constraining types
- [ ] Understand inference in generic functions
