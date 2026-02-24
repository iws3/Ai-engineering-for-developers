/**
 * Chapter 1, Part 5: Compiler Configuration
 * 
 * Experiments with different TypeScript configurations
 */

// The tsconfig.json file controls how TypeScript compiles

// EXERCISE 1: ES version compatibility
// Check tsconfig.json "target" field
// It's set to ES2020
// This determines what JavaScript features are available

// Example: Nullish coalescing (only in ES2020+)
const value = null;
const result = value ?? "default";  // Works with target: ES2020
// Would fail with target: ES2015

// EXERCISE 2: Module type
// Check "module" field (should be "commonjs")
// This determines how imports/exports work

import { greetLearner } from "../../utils/helpers";

// EXERCISE 3: Strict checking
// All of these would error with "strict": true

// const user: string = null;  // STRICT ERROR
// function process(data) { }  // STRICT ERROR
// const arr: any = [];  // STRICT ERROR (noImplicitAny)

// EXERCISE 4: Source maps
// Check "sourceMap": true in tsconfig.json
// Run: npm run build
// Look in dist/ for .map files - these help with debugging

// CHALLENGE: Try changing tsconfig.json
// 1. Change "strict": false
// 2. Run: npm run build
// 3. See how many errors disappear?
// 4. Change it back to "strict": true
// 5. Notice how errors reappear? That's the power of strict mode!

export {};
