/**
 * Chapter 1, Part 3: How Compilation Works
 * 
 * See the 5-step compilation pipeline in action
 */

// STEP 1: TypeScript parses this code
// STEP 2: Creates an AST (Abstract Syntax Tree)
// STEP 3: Type checking happens here
// STEP 4: Valid code converts to JavaScript
// STEP 5: Output to dist/ folder

// EXERCISE 1: Type checking catches errors
// Try changing string to number and compile
const message: string = "Hello, TypeScript!";
// const message: string = 42;  // ERROR before runtime!

// EXERCISE 2: Type erasure - types disappear
interface Point {
  x: number;
  y: number;
}

// After compilation, interface is GONE
// Only the object { x: 10, y: 20 } remains
const point: Point = { x: 10, y: 20 };
console.log(point);

// EXERCISE 3: Compile-time vs runtime
const numbers: number[] = [1, 2, 3];

// Before.compile: TypeScript knows types
// After compile: Just a JavaScript array
numbers.forEach(n => {
  console.log(n * 2);
});

// CHALLENGE: What's the compiled JavaScript look like?
// Run: npm run build
// Then look inside dist/chapter1-fundamentals/part-3-compilation/
// Find this file's compiled .js version
// Notice: NO types, NO interfaces - just plain JavaScript!

export {};
