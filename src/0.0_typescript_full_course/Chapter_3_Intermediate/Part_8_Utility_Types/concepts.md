# Part 8: Utility Types (Intermediate Deep Dive)

## 🎯 Learning Objectives

After this part, you'll understand:
- Common TypeScript utility types
- Partial, Required, Pick, and Omit
- Record, Extract, and Exclude
- Real-world API patterns using utilities

---

## 📝 Key Utility Types

### Partial - Make All Optional

Make all properties of a type optional:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// Equivalent to:
// { id?: number; name?: string; email?: string; }

// Usage in update function
function updateUser(id: number, changes: PartialUser): void {
  // Can provide any subset of properties
}

updateUser(1, { name: "Bob" });                    // ✅ OK
updateUser(1, { name: "Bob", email: "bob@..." }); // ✅ OK
```

### Required - Make All Required

Make all properties required:

```typescript
interface Config {
  timeout?: number;
  retries?: number;
  maxConnections?: number;
}

type RequiredConfig = Required<Config>;
// { timeout: number; retries: number; maxConnections: number; }

const config: RequiredConfig = {
  timeout: 5000,
  retries: 3,
  maxConnections: 50
};
```

### Pick - Select Specific Properties

Select only certain properties from a type:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

type UserPreview = Pick<User, "id" | "name" | "email">;
// { id: number; name: string; email: string; }

type UserInfo = Pick<User, "name" | "email">;
// { name: string; email: string; }

// Using Pick for API responses
const userPreview: UserPreview = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};
```

### Omit - Exclude Specific Properties

Exclude certain properties from a type:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type SafeUser = Omit<User, "password">;
// { id: number; name: string; email: string; }

type PublicUser = Omit<User, "password" | "id">;
// { name: string; email: string; }

// Usage
function sendUser(user: SafeUser): void {
  // Safe - no password included
}
```

### Record - Create Object with Keys

Create an object type with specific keys:

```typescript
type Status = "pending" | "loading" | "complete" | "error";

type StatusConfig = Record<Status, { color: string; icon: string }>;
// {
//   pending: { color: string; icon: string };
//   loading: { color: string; icon: string };
//   complete: { color: string; icon: string };
//   error: { color: string; icon: string };
// }

const configs: StatusConfig = {
  pending: { color: "gray", icon: "clock" },
  loading: { color: "blue", icon: "spinner" },
  complete: { color: "green", icon: "check" },
  error: { color: "red", icon: "x" }
};

// Permissions example
type Role = "admin" | "user" | "guest";
type Permissions = Record<Role, { canRead: boolean; canWrite: boolean }>;

const perms: Permissions = {
  admin: { canRead: true, canWrite: true },
  user: { canRead: true, canWrite: false },
  guest: { canRead: false, canWrite: false }
};
```

### Extract - Get Matching Types

Extract types that match a condition from a union:

```typescript
type Union = "admin" | "user" | "guest" | "moderator";

type AdminRoles = Extract<Union, "admin" | "moderator">;
// "admin" | "moderator"

type Strings = Extract<string | number | boolean, string>;
// string

type Callables = Extract<string | (() => void) | number, Function>;
// () => void
```

### Exclude - Remove Matching Types

Exclude types that match a condition from a union:

```typescript
type Union = "admin" | "user" | "guest";

type UserRoles = Exclude<Union, "admin">;
// "user" | "guest"

type Scalars = Exclude<string | number | boolean | object, object>;
// string | number | boolean

// Use case: Remove undefined/null
type Defined<T> = Exclude<T, null | undefined>;

type MaybeString = string | null | undefined;
type DefiniteString = Defined<MaybeString>;
// string
```

---

## 💡 Real-World Patterns

### Pattern 1: API Request/Response

```typescript
interface ApiUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  lastLogin?: Date;
}

// Safe to send to API
type CreateUserRequest = Omit<ApiUser, "id" | "createdAt" | "lastLogin">;
// { name: string; email: string; password: string; }

// Safe to send to frontend
type UserResponse = Omit<ApiUser, "password">;
// { id: string; name: string; email: string; createdAt: Date; lastLogin?: Date; }

// Partial update
type UpdateUserRequest = Partial<CreateUserRequest>;
// { name?: string; email?: string; password?: string; }
```

### Pattern 2: Role-Based Permissions

```typescript
interface AllActions {
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
  canAdmin: boolean;
}

type Role = "admin" | "editor" | "viewer";

type RolePermissions = Record<
  Role,
  Partial<AllActions>
>;

const permissions: RolePermissions = {
  admin: { canRead: true, canWrite: true, canDelete: true, canAdmin: true },
  editor: { canRead: true, canWrite: true },
  viewer: { canRead: true }
};

function hasPermission(
  role: Role,
  action: keyof AllActions
): boolean {
  return permissions[role][action] ?? false;
}
```

### Pattern 3: Event Handlers

```typescript
type EventName = "click" | "change" | "blur" | "focus";

interface EventHandlers {
  click: (event: MouseEvent) => void;
  change: (value: string) => void;
  blur: () => void;
  focus: () => void;
}

// Register only some handlers
type OptionalHandlers = Partial<EventHandlers>;

class InputField {
  private handlers: OptionalHandlers = {};

  on<E extends EventName>(
    event: E,
    handler: EventHandlers[E]
  ): void {
    (this.handlers as any)[event] = handler;
  }

  emit<E extends EventName>(event: E, data?: any): void {
    const handler = (this.handlers as any)[event];
    if (handler) handler(data);
  }
}
```

---

## ⚠️ Common Pitfalls

### Pitfall 1: Using Partial When You Mean Pick

```typescript
// ❌ WRONG: Partial makes everything optional
interface User { id: number; name: string; email: string; }
type UserInput = Partial<User>;
// Now all fields optional - might miss data!

// ✅ CORRECT: Use Pick for specific fields
type UserInput = Pick<User, "name" | "email">;
// Required fields enforced
```

### Pitfall 2: Forgetting to Filter Out System Fields

```typescript
// ❌ BAD: Sends ID to creation endpoint
interface User { id: number; name: string; createdAt: Date; }
type CreateRequest = User;  // ID shouldn't be included!

// ✅ GOOD: Use Omit for system fields
type CreateRequest = Omit<User, "id" | "createdAt">;
```

---

## 🌟 Best Practices

```typescript
// ✅ GOOD: Clear type names
interface User { id: string; name: string; email: string; password: string; }
type SafeUser = Omit<User, "password">;
type UserInput = Pick<User, "name" | "email" | "password">;

// ✅ GOOD: Use Record for config objects
type environments = "dev" | "staging" | "prod";
type Config = Record<Environment, { apiUrl: string; timeout: number }>;

// ❌ BAD: Unclear types
type T1 = Partial<User>;  // What's partial?
type T2 = Pick<User, "a" | "b">;  // What do a and b mean?

// ✅ GOOD: Semantic names
type UserUpdate = Partial<User>;
type UserPreview = Pick<User, "name" | "email">;
```

---

## 📚 Resources

- [TypeScript Handbook: Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

---

## ✅ Checklist

- [ ] Know Partial and Required
- [ ] Know Pick and Omit  
- [ ] Understand Record
- [ ] Know Extract and Exclude
- [ ] Apply to API patterns
- [ ] Use semantically named utility types
