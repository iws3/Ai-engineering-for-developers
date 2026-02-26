# Part 6: Testing TypeScript (Advanced Deep Dive)

## Learning Objectives

After this part you'll understand:
- Unit testing with Jest/Vitest
- Mocking and testing strategies
- Integration testing
- Type-safe testing patterns
- Test coverage

---

## Unit Testing with Jest

```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

// math.test.ts
describe("add", () => {
  it("adds positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("adds negative numbers", () => {
    expect(add(-2, -3)).toBe(-5);
  });
});
```

---

## Mocking

```typescript
// userService.ts
interface UserRepository {
  findById(id: string): Promise<User>;
}

class UserService {
  constructor(private repo: UserRepository) {}

  async getUser(id: string): Promise<User> {
    return this.repo.findById(id);
  }
}

// userService.test.ts
describe("UserService", () => {
  it("fetches user", async () => {
    const mockRepo: UserRepository = {
      async findById(id: string) {
        return { id, name: "Alice", email: "alice@ex.com" };
      }
    };

    const service = new UserService(mockRepo);
    const user = await service.getUser("123");

    expect(user.name).toBe("Alice");
  });
});
```

---

## Type-Safe Mocks

```typescript
import { jest } from "@jest/globals";

describe("Service", () => {
  it("calls dependency", () => {
    const mockFn = jest.fn<() => string>();
    mockFn.mockReturnValue("result");

    expect(mockFn()).toBe("result");
    expect(mockFn).toHaveBeenCalled();
  });
});
```

---

## Testing Async Code

```typescript
describe("async operations", () => {
  it("handles promises", async () => {
    const result = await fetchData();
    expect(result).toBeDefined();
  });

  it("handles errors", async () => {
    await expect(failingOp()).rejects.toThrow();
  });
});
```

---

## Integration Testing

```typescript
// Integration with database
describe("User API", () => {
  let db: Database;

  beforeEach(async () => {
    db = new Database();
    await db.connect();
  });

  afterEach(async () => {
    await db.disconnect();
  });

  it("creates and retrieves user", async () => {
    const user = await db.users.create({
      name: "Alice",
      email: "alice@ex.com"
    });

    const retrieved = await db.users.findById(user.id);
    expect(retrieved.name).toBe("Alice");
  });
});
```

---

## Test Coverage

```bash
# Run tests with coverage
npm test -- --coverage

# Output shows:
# - Lines covered
# - Branches covered
# - Functions covered
# - Statements covered
```

Target 80%+ coverage for critical code.

---

## Parameterized Tests

```typescript
describe.each([
  [1, 2, 3],
  [2, 3, 5],
  [-1, 1, 0]
])("add(%i, %i) = %i", (a, b, expected) => {
  it("returns correct result", () => {
    expect(add(a, b)).toBe(expected);
  });
});
```

---

## Checklist

- [ ] Set up Jest with TypeScript
- [ ] Write unit tests
- [ ] Mock dependencies
- [ ] Test async code
- [ ] Achieve 80%+ coverage
- [ ] Use type-safe testing patterns
