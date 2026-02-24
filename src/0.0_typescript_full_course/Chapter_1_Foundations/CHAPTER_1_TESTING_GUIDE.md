# Chapter 1: Testing TypeScript Code

Testing ensures your code works as intended. TypeScript makes testing easier!

---

## Why Test TypeScript?

1. **Type Safety Complements Testing**
   - Types prevent whole classes of bugs
   - Tests verify business logic correctness

2. **Refactoring Safely**
   - Change code with confidence
   - Tests catch regressions

3. **Documentation**
   - Tests show how code is supposed to work

---

## Setting Up Jest

Jest is the most popular TypeScript test framework.

### Installation

```bash
npm install --save-dev jest @types/jest ts-jest
```

### Configuration

**jest.config.js**:
```javascript
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.ts", "**/*.test.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts"
  ]
};
```

### package.json Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## Writing Tests

### Test 1: Simple Function

```typescript
// src/math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}
```

```typescript
// src/__tests__/math.test.ts
import { add, multiply } from "../math";

describe("Math Functions", () => {
  describe("add", () => {
    it("should add two positive numbers", () => {
      expect(add(2, 3)).toBe(5);
    });

    it("should handle negative numbers", () => {
      expect(add(-2, 3)).toBe(1);
    });

    it("should handle zero", () => {
      expect(add(0, 5)).toBe(5);
    });
  });

  describe("multiply", () => {
    it("should multiply two numbers", () => {
      expect(multiply(2, 3)).toBe(6);
    });

    it("should return 0 when multiplying by 0", () => {
      expect(multiply(5, 0)).toBe(0);
    });
  });
});
```

**Run tests**:
```bash
npm test
```

---

### Test 2: Functions with Types

```typescript
// src/user.ts
interface User {
  id: number;
  name: string;
  email: string;
}

export function createUser(name: string, email: string): User {
  return {
    id: Math.random(),
    name,
    email
  };
}

export function isValidEmail(email: string): boolean {
  return email.includes("@");
}
```

```typescript
// src/__tests__/user.test.ts
import { createUser, isValidEmail } from "../user";

describe("User Functions", () => {
  describe("createUser", () => {
    it("should create user with correct properties", () => {
      const user = createUser("Alice", "alice@example.com");
      expect(user.name).toBe("Alice");
      expect(user.email).toBe("alice@example.com");
      expect(user.id).toBeDefined();
    });

    it("should have unique IDs", () => {
      const user1 = createUser("Alice", "alice@example.com");
      const user2 = createUser("Bob", "bob@example.com");
      expect(user1.id).not.toBe(user2.id);
    });
  });

  describe("isValidEmail", () => {
    it("should validate correct emails", () => {
      expect(isValidEmail("alice@example.com")).toBe(true);
    });

    it("should reject emails without @", () => {
      expect(isValidEmail("alice-example.com")).toBe(false);
    });
  });
});
```

---

### Test 3: Async Functions

```typescript
// src/api.ts
export interface Post {
  id: number;
  title: string;
  content: string;
}

export async function getPost(id: number): Promise<Post> {
  const response = await fetch(`https://api.example.com/posts/${id}`);
  return response.json();
}
```

```typescript
// src/__tests__/api.test.ts
import { getPost } from "../api";

// Mock fetch
global.fetch = jest.fn();

describe("API Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch post from API", async () => {
    const mockPost = {
      id: 1,
      title: "TypeScript Tips",
      content: "Here are some tips..."
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockPost
    });

    const post = await getPost(1);
    expect(post.title).toBe("TypeScript Tips");
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com/posts/1"
    );
  });

  it("should handle API errors", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(getPost(1)).rejects.toThrow("Network error");
  });
});
```

---

### Test 4: Classes

```typescript
// src/calculator.ts
export class Calculator {
  private history: number[] = [];

  add(a: number, b: number): number {
    const result = a + b;
    this.history.push(result);
    return result;
  }

  getHistory(): number[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
  }
}
```

```typescript
// src/__tests__/calculator.test.ts
import { Calculator } from "../calculator";

describe("Calculator", () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it("should add numbers", () => {
    expect(calculator.add(2, 3)).toBe(5);
  });

  it("should maintain history", () => {
    calculator.add(2, 3);
    calculator.add(5, 7);
    expect(calculator.getHistory()).toEqual([5, 12]);
  });

  it("should clear history", () => {
    calculator.add(2, 3);
    calculator.clearHistory();
    expect(calculator.getHistory()).toEqual([]);
  });
});
```

---

## Test Structure Guidelines

### Arrange-Act-Assert Pattern

```typescript
it("should calculate discount correctly", () => {
  // ARRANGE - Set up test data
  const price = 100;
  const discountPercent = 10;

  // ACT - Perform the action
  const discountedPrice = applyDiscount(price, discountPercent);

  // ASSERT - Check the result
  expect(discountedPrice).toBe(90);
});
```

---

## Common Expectations

```typescript
// Equality
expect(value).toBe(5);  // Exact match
expect(value).toEqual({ name: "Alice" });  // Deep equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();

// Numbers
expect(value).toBeGreaterThan(5);
expect(value).toBeLessThan(10);
expect(value).toBeCloseTo(3.14, 1);  // Within 1 decimal

// Strings
expect(message).toContain("error");
expect(email).toMatch(/\w+@\w+\.\w+/);

// Arrays
expect(arr).toContain("item");
expect(arr).toHaveLength(3);

// Objects
expect(obj).toHaveProperty("name");

// Functions
expect(fn).toThrow();
expect(fn).toThrow(Error);

// Async
await expect(promise).resolves.toBe(value);
await expect(promise).rejects.toThrow();
```

---

## Test Organization

```
src/
├── __tests__/
│   ├── unit/
│   │   ├── math.test.ts
│   │   ├── user.test.ts
│   │   └── api.test.ts
│   ├── integration/
│   │   └── user-workflow.test.ts
│   └── e2e/
│       └── main-flow.test.ts
├── math.ts
├── user.ts
└── api.ts
```

---

## TypeScript Testing Best Practices

1. **Type Your Test Data**
```typescript
interface TestUser {
  id: number;
  name: string;
}

const mockUser: TestUser = { id: 1, name: "Alice" };
```

2. **Create Test Utilities**
```typescript
export function createMockUser(overrides?: Partial<User>): User {
  return {
    id: 1,
    name: "Default",
    email: "test@example.com",
    ...overrides
  };
}

// Usage
const user = createMockUser({ name: "Alice" });
```

3. **Use Type-Safe Mocks**
```typescript
const mockApi: jest.Mocked<typeof api> = {
  getUser: jest.fn()
};

mockApi.getUser.mockResolvedValue({ id: 1, name: "Alice" });
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test math.test.ts

# Run in watch mode (re-run on changes)
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

---

## Test Coverage Goals

- **Statements**: 80-90% coverage
- **Branches**: 75-85% coverage
- **Functions**: 80-90% coverage
- **Lines**: 80-90% coverage

```bash
npm test -- --coverage
```

---

