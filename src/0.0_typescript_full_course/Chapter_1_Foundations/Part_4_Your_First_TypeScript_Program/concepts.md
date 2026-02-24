# Part 4: Your First TypeScript Program (Beginner Deep Dive)

## 🎯 What You'll Build
A complete student grade calculator program. You'll learn:
- Creating variables with types
- Writing functions with parameters and return types
- Using interfaces to define object shapes
- Organizing code logically

---

## 📝 Key Concepts
- **Variable Declaration:** `const x: string = "value"`
- **Function Signature:** `(parameters) => returnType`
- **Interface:** A contract defining object properties
- **Return Type:** What a function outputs

> **Beginner Note:** This program brings everything together. Don't worry if it looks complex—we'll break it down line by line!

---

## 💻 The Complete Program

```typescript
// Define student's grade record
interface StudentGrade {
  name: string;
  subject: string;
  score: number;
}

// Calculate letter grade from score
function getLetterGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

// Calculate average from array of scores
function calculateAverage(scores: number[]): number {
  const sum = scores.reduce((a, b) => a + b, 0);
  return sum / scores.length;
}

// Print student report
function printReport(student: StudentGrade): void {
  const letterGrade = getLetterGrade(student.score);
  console.log(`${student.name} in ${student.subject}: ${student.score}/100`);
  console.log(`Letter Grade: ${letterGrade}`);
}

// Main program
const alice: StudentGrade = {
  name: "Alice",
  subject: "TypeScript",
  score: 95
};

const bob: StudentGrade = {
  name: "Bob",
  subject: "JavaScript",
  score: 87
};

const allScores = [alice.score, bob.score];
const avgScore = calculateAverage(allScores);

printReport(alice);
console.log("---");
printReport(bob);
console.log(`Average Score: ${avgScore.toFixed(2)}`);
```

---

## 🔍 Breaking It Down

### Part 1: Interface
```typescript
interface StudentGrade {
  name: string;    // Student's name
  subject: string; // What they studied
  score: number;   // Their numerical score
}
```
**This says:** "A StudentGrade object MUST have these 3 properties with these types."

---

### Part 2: Functions
```typescript
function getLetterGrade(score: number): string {
  // Takes a number (0-100)
  // Returns a string letter (A, B, C, D, F)
}
```

**Reading the signature:**
- `(score: number)` - Takes 1 parameter: a number
- `: string` - Returns a string

---

### Part 3: Using Arrays
```typescript
function calculateAverage(scores: number[]): number {
  const sum = scores.reduce((a, b) => a + b, 0);
  return sum / scores.length;
}
```

**What's happening:**
- `number[]` means "an array of numbers"
- `.reduce()` sums all scores
- Divide by length to get average

---

### Part 4: Objects with Interfaces
```typescript
const alice: StudentGrade = {
  name: "Alice",
  subject: "TypeScript",
  score: 95
};
```

**TypeScript checks:** Does this object match StudentGrade interface? ✅ Yes!

---

## 🏷️ Important Terms
- **Interface**
- **Function Signature**
- **Return Type**
- **Array Type (`number[]`)**
- **Type Checking**

---

## 📚 Resources
- [TypeScript Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [Functions in TypeScript](https://www.typescriptlang.org/docs/handbook/2/functions.html)

---

## ✅ What You Learned
✓ Defined an interface
✓ Wrote functions with types
✓ Used arrays of specific types
✓ Created objects matching interfaces
✓ Called functions and used results

