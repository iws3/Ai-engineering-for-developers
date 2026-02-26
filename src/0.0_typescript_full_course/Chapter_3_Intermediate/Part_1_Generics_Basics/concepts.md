# Part 1: Generics Basics (Intermediate)

## ��� Learning Objectives
- Understand what generics are and why they matter
- Write generic functions and generic types
- Use type variables (<T>) to create reusable code
- Apply generics to real-world AI and frontend scenarios
- Distinguish between generics and the `any` type

---

## ���️ Key Terms to Remember

- **Generic**: A way to write reusable code that works with multiple types
- **Type Variable** (or **Type Parameter**): A placeholder for a type (usually T, U, K)
- **Constraint**: A limitation on what types a generic can accept (using extends)
- **Concrete Type**: The actual type used when calling a generic function
- **Polymorphism**: The ability to work with multiple types

> **Beginner Note**: Generics let you write "templates" for code that work with any type, while still maintaining full type safety. Think of them like function parameters, but for types instead of values!

---

## ��� Understanding Generics

### What Problem Do Generics Solve?

Imagine you're building an AI chat application and need functions that work with **any data type**. Without generics:

\`\`\`typescript
// ❌ Bad approach - lots of duplication
function identifyString(value: string): string { return value; }
function identifyNumber(value: number): number { return value; }
function identifyBoolean(value: boolean): boolean { return value; }
\`\`\`

With generics:

\`\`\`typescript
// ✅ Good approach - one reusable function
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello");  // Works with string
identity<number>(42);       // Works with number
identity<boolean>(true);    // Works with boolean
\`\`\`

### How Generics Work

A **generic function** uses a **type variable** (usually T) which acts like a placeholder:

\`\`\`typescript
// <T> = "accept any type"
function processData<T>(data: T): T {
  console.log(data);
  return data;
}

// TypeScript infers T as string
const result = processData("AI");
// result has type: string

// TypeScript infers T as number
const numberResult = processData(42);
// numberResult has type: number
\`\`\`

---

## ��� Deep Concepts

### 1. Generic Functions

\`\`\`typescript
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const strings = wrapInArray("hello");  // Type: string[]
const numbers = wrapInArray(42);       // Type: number[]
\`\`\`

### 2. Generic Types (Interfaces)

\`\`\`typescript
interface Container<T> {
  value: T;
  getValue(): T;
}

interface APIResponse<T> {
  status: "success" | "error";
  data?: T;
  error?: string;
}
\`\`\`

### 3. Multiple Type Variables

\`\`\`typescript
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}
\`\`\`

### 4. Generic Constraints

\`\`\`typescript
// Only accept types with a length property
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength("hello");      // Works
getLength([1, 2, 3]);    // Works  
getLength(42);           // Error
\`\`\`

### 5. Default Types

```typescript
interface Config<T = string> {
  value: T;
  timeout: number;
}

const stringConfig: Config = {
  value: "default",
  timeout: 5000
};

const numberConfig: Config<number> = {
  value: 42,
  timeout: 5000
};
```

### 6. KeyOf Constraint

Constrain generic to be keys of another type:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Key must be a key of User
function getValue<K extends keyof User>(user: User, key: K): User[K] {
  return user[key];
}

const user: User = { id: 1, name: "Alice", email: "alice@example.com" };

const id = getValue(user, "id");       // ✅ number
const name = getValue(user, "name");   // ✅ string
const age = getValue(user, "age");     // ❌ ERROR: "age" not a key of User
```

### 7. Conditional Types

Types that depend on conditions:

```typescript
// If T is string, return number; otherwise return string
type StringToNumber<T> = T extends string ? number : string;

type A = StringToNumber<"hello">;  // number
type B = StringToNumber<42>;       // string
```

---

## 📚 Generic Patterns & Best Practices

### Pattern 1: Maybe/Optional Wrapper

```typescript
// Represents a value that might not exist
interface Maybe<T> {
  hasValue: boolean;
  value?: T;
  map<U>(fn: (value: T) => U): Maybe<U>;
  getOrElse(defaultValue: T): T;
}

class SomeMaybe<T> implements Maybe<T> {
  hasValue = true;
  constructor(public value: T) {}
  
  map<U>(fn: (value: T) => U): Maybe<U> {
    return new SomeMaybe(fn(this.value));
  }
  
  getOrElse(defaultValue: T): T {
    return this.value;
  }
}

class NoneMaybe<T> implements Maybe<T> {
  hasValue = false;
  
  map<U>(fn: (value: T) => U): Maybe<U> {
    return new NoneMaybe<U>();
  }
  
  getOrElse(defaultValue: T): T {
    return defaultValue;
  }
}

const someValue = new SomeMaybe(42);
const doubled = someValue.map(x => x * 2);  // SomeMaybe<number>
```

### Pattern 2: Async Result Type

```typescript
// Either success or error
type Result<T, E = Error> = 
  | { type: "success"; value: T }
  | { type: "error"; error: E };

async function fetchData<T>(url: string): Promise<Result<T>> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return { type: "success", value: data };
  } catch (error) {
    return { type: "error", error: error as Error };
  }
}

// Usage
const result = await fetchData<User>("/api/users/1");
if (result.type === "success") {
  console.log(result.value.name);
}
```

### Pattern 3: Repository Pattern

```typescript
// Generic data access layer
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}

class UserRepository implements Repository<User> {
  async findById(id: string): Promise<User | null> {
    // Implementation
    return null;
  }
  
  async findAll(): Promise<User[]> {
    return [];
  }
  
  async save(entity: User): Promise<void> {
    // Implementation
  }
  
  async delete(id: string): Promise<void> {
    // Implementation
  }
}
```

### Pattern 4: Event Emitter

```typescript
// Generic event emitter
interface EventMap {
  [key: string]: any;
}

class EventEmitter<T extends EventMap> {
  private listeners: Map<string, Set<(data: any) => void>> = new Map();

  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    if (!this.listeners.has(event as string)) {
      this.listeners.set(event as string, new Set());
    }
    this.listeners.get(event as string)!.add(listener);
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    this.listeners.get(event as string)?.forEach(listener => listener(data));
  }
}

// Usage
interface MyEvents {
  message: string;
  userJoined: { userId: string; name: string };
  userLeft: { userId: string };
}

const emitter = new EventEmitter<MyEvents>();

emitter.on("message", (msg: string) => {
  console.log("Message:", msg);
});

emitter.on("userJoined", (data: { userId: string; name: string }) => {
  console.log(`${data.name} joined`);
});

emitter.emit("message", "Hello!");
emitter.emit("userJoined", { userId: "1", name: "Alice" });
```

### Pattern 5: State Management

```typescript
type State = any;
type Action = { type: string };

// Generic reducer type
type Reducer<S extends State, A extends Action> = (
  state: S,
  action: A
) => S;

// Usage example
interface CounterState {
  count: number;
}

type CounterAction = 
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: number }
  | { type: "reset" };

const counterReducer: Reducer<CounterState, CounterAction> = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - action.payload };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
};
```

---

## 🎯 Real-World Applications

### AI Engineering: Chat Message Handler

```typescript
interface Message<T> {
  role: "user" | "assistant" | "system";
  content: T;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

type TextMessage = Message<string>;
type FunctionCallMessage = Message<{
  name: string;
  arguments: Record<string, unknown>;
}>;

function processMessage<T>(message: Message<T>): string {
  if (typeof message.content === "string") {
    return `Message: ${message.content}`;
  }
  return `Message: ${JSON.stringify(message.content)}`;
}

// Usage
const textMsg: TextMessage = {
  role: "user",
  content: "Hello, AI!",
  timestamp: new Date()
};

const functionMsg: FunctionCallMessage = {
  role: "assistant",
  content: {
    name: "call_weather",
    arguments: { location: "New York" }
  },
  timestamp: new Date()
};

processMessage(textMsg);        // Works with string
processMessage(functionMsg);    // Works with function call
```

### Frontend: Form State Manager

```typescript
interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isDirty: boolean;
  isSubmitting: boolean;
}

interface FormActions<T> {
  setFieldValue<K extends keyof T>(field: K, value: T[K]): void;
  setFieldError<K extends keyof T>(field: K, error: string): void;
  setFieldTouched<K extends keyof T>(field: K, touched: boolean): void;
  reset(): void;
}

// Usage
interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const formState: FormState<LoginForm> = {
  values: { email: "", password: "", rememberMe: false },
  errors: {},
  touched: {},
  isDirty: false,
  isSubmitting: false
};

// Type-safe field access
formState.values.email;     // ✅ string
formState.values.age;       // ❌ ERROR: not in LoginForm
```

### API Client: Generic HTTP Handler

```typescript
interface ApiResponse<T> {
  status: number;
  data?: T;
  error?: string;
}

class ApiClient {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      return {
        status: response.status,
        data
      };
    } catch (error) {
      return {
        status: 500,
        error: String(error)
      };
    }
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(body)
      });
      const data = await response.json();
      return {
        status: response.status,
        data
      };
    } catch (error) {
      return {
        status: 500,
        error: String(error)
      };
    }
  }
}

// Usage
interface User {
  id: number;
  name: string;
  email: string;
}

const client = new ApiClient();
const response = await client.get<User>("/api/users/1");

if (response.data) {
  console.log(response.data.name);  // ✅ User properties available
}
```

---

## ⚠️ Common Pitfalls

### Pitfall 1: Not Leveraging Type Inference

```typescript
// ❌ Unnecessary - TypeScript can infer
const result = identity<string>("hello");

// ✅ Better - let TypeScript infer
const result = identity("hello");
```

### Pitfall 2: Too Broad Constraints

```typescript
// ❌ BAD - accepts any type, defeats purpose
function process<T extends any>(value: T): T {
  return value;
}

// ✅ GOOD - specific constraint
function process<T extends string | number>(value: T): T {
  return value;
}
```

### Pitfall 3: Generic But Not Using It

```typescript
// ❌ Declares generic but never uses T
function process<T>(value: string): string {
  return value.toUpperCase();
}

// ✅ Actually use the generic
function process<T extends string>(value: T): T {
  return value.toUpperCase() as T;
}
```

---

## 🏆 Best Practices

1. **Use generics for reusability** - avoid `any` at all costs
2. **Constrain when possible** - `<T extends SomeType>` catches errors earlier
3. **Default types help** - `<T = DefaultType>`
4. **Document generics** - JSDoc explaining what T represents
5. **Avoid nested generics** - keep complexity manageable
6. **Use keyof for type safety** - accessing object properties safely
7. **Name generics meaningfully** - T, U, K are fine, but be specific if complex

---

## ⚠️ Generics vs `any`

| Aspect | Generics | any |
|--------|----------|-----|
| **Type Safety** | ✅ Full | ❌ None |
| **IDE Support** | ✅ Autocomplete | ❌ No help |
| **Inference** | ✅ Automatic | ❌ Nothing |
| **Error Catching** | ✅ Compile-time | ❌ Runtime only |
| **Refactoring** | ✅ Safe | ❌ Risky |

**Always choose generics over `any`!**

---

## 📚 Resources & Next Steps

- [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Advanced Generics](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)

---

## ✅ Checklist

- [ ] Understand what generics are
- [ ] Write generic functions
- [ ] Create generic interfaces  
- [ ] Understand constraints
- [ ] Know multiple type variables
- [ ] Use keyof constraints
- [ ] Understand default generic types
- [ ] Comfortable with real-world patterns
- [ ] Know when to use vs alternatives
- [ ] Can identify pitfalls
