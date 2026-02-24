# Part 1: Generics Basics ‚Äî Exercises

## Exercise 1 (Beginner): Create a Generic Identity Function

Create a function `identity<T>` that accepts any value and returns it unchanged.

\`\`\`typescript
// Write your solution here
function identity<T>(value: T): T {
  // TODO: Return the value as-is
}

// Test cases
const result1 = identity("hello");    // Should be string
const result2 = identity(42);         // Should be number
const result3 = identity(true);       // Should be boolean

console.log(result1);
console.log(result2);
console.log(result3);
\`\`\`

**Solution**:
\`\`\`typescript
function identity<T>(value: T): T {
  return value;
}
\`\`\`

---

## Exercise 2 (Intermediate): Generic Array Wrapper

Create a function `wrapInArray<T>` that takes any value and returns it wrapped in an array. TypeScript should infer the array type correctly.

\`\`\`typescript
function wrapInArray<T>(value: T): T[] {
  // TODO: Return array containing the value
}

// Test cases
const stringArray = wrapInArray("TypeScript");  // Type: string[]
const numberArray = wrapInArray(99);            // Type: number[]
const boolArray = wrapInArray(true);            // Type: boolean[]

// Try to access - TypeScript should know the element types
console.log(stringArray[0].toUpperCase()); // Should work!
console.log(numberArray[0].toFixed(2));    // Should work!
\`\`\`

**Solution**:
\`\`\`typescript
function wrapInArray<T>(value: T): T[] {
  return [value];
}
\`\`\`

---

## Exercise 3 (Intermediate): Generic Container Interface

Create a generic `Container<T>` interface that holds a value of type T and provides a method to retrieve it. Then create implementations for different types.

\`\`\`typescript
interface Container<T> {
  // TODO: Add properties and methods
}

// User example
interface User {
  id: number;
  name: string;
}

// Implement Container<User>
const userContainer: Container<User> = {
  // TODO: Implement
};

// Implement Container<string>
const messageContainer: Container<string> = {
  // TODO: Implement
};

console.log(userContainer);
console.log(messageContainer);
\`\`\`

**Solution**:
\`\`\`typescript
interface Container<T> {
  value: T;
  getValue(): T;
}

const userContainer: Container<User> = {
  value: { id: 1, name: "Alice" },
  getValue() {
    return this.value;
  }
};

const messageContainer: Container<string> = {
  value: "Hello, TypeScript!",
  getValue() {
    return this.value;
  }
};
\`\`\`

---

## Challenge (Advanced): Generic API Response Handler

Create a generic function `handleAPIResponse<T>` that:
1. Accepts an `APIResponse<T>` parameter
2. Returns the data if status is "success", throws an error otherwise
3. Properly type the returned data

\`\`\`typescript
interface APIResponse<T> {
  status: "success" | "error";
  data?: T;
  error?: string;
}

function handleAPIResponse<T>(response: APIResponse<T>): T {
  // TODO: Implement
}

// Test with user data
interface UserData {
  id: number;
  name: string;
  email: string;
}

const successResponse: APIResponse<UserData> = {
  status: "success",
  data: { id: 1, name: "Bob", email: "bob@example.com" }
};

const errorResponse: APIResponse<UserData> = {
  status: "error",
  error: "Failed to fetch user"
};

const userData = handleAPIResponse(successResponse);
console.log(userData.name); // Should work!

// This should throw
try {
  handleAPIResponse(errorResponse);
} catch (err) {
  console.log("Error handled:", err);
}
\`\`\`

**Solution**:
\`\`\`typescript
function handleAPIResponse<T>(response: APIResponse<T>): T {
  if (response.status === "success" && response.data) {
    return response.data;
  }
  throw new Error(response.error || "Unknown error");
}
\`\`\`

---

## Ì≥ù Submission Tips

- Test your code in TypeScript Playground
- Ensure type inference works correctly
- Add comments explaining generic type flow
- Consider edge cases

