# Day 4: Your First TypeScript Program

## 🎯 Today's Learning Objectives

- ✅ Write a complete TypeScript program from scratch
- ✅ Understand basic syntax
- ✅ Use types in real code
- ✅ Compile and run your program
- ✅ See TypeScript catch an error

**Time to complete:** 30-45 minutes  
**Difficulty:** Beginner  
**Prerequisites:** Days 1-3

---

## 📚 Writing Your First Real Program

Let's write a complete program that calculates student grades. This will exercise everything you've learned:

### Requirements
- Define a student structure
- Calculate grade based on score
- Assign letter grade (A, B, C, D, F)
- Process multiple students
- Use proper types throughout

### TypeScript Solution

Create `src/grades.ts`:

```typescript
// Define what a student looks like
interface Student {
  id: number;
  name: string;
  score: number;
}

// Define grade information
interface GradeInfo {
  student: Student;
  letterGrade: string;
  feedback: string;
}

// Type for calculation
type ScoreToGrade = (score: number) => { letter: string; feedback: string };

// Function to convert numeric score to letter grade
const calculateGrade: ScoreToGrade = (score: number) => {
  if (score >= 90) {
    return { letter: "A", feedback: "Excellent work!" };
  } else if (score >= 80) {
    return { letter: "B", feedback: "Good job!" };
  } else if (score >= 70) {
    return { letter: "C", feedback: "Satisfactory" };
  } else if (score >= 60) {
    return { letter: "D", feedback: "Needs improvement" };
  } else {
    return { letter: "F", feedback: "Failed - please see instructor" };
  }
};

// Process a single student
function processStudent(student: Student): GradeInfo {
  const grade = calculateGrade(student.score);
  return {
    student: student,
    letterGrade: grade.letter,
    feedback: grade.feedback
  };
}

// Process multiple students
function processStudents(students: Student[]): GradeInfo[] {
  return students.map(student => processStudent(student));
}

// Display results
function displayResults(results: GradeInfo[]): void {
  console.log("=== Student Grade Report ===\n");
  
  results.forEach(result => {
    console.log(`Student: ${result.student.name}`);
    console.log(`Score: ${result.student.score}`);
    console.log(`Grade: ${result.letterGrade}`);
    console.log(`Feedback: ${result.feedback}`);
    console.log("---");
  });
}

// Main program
const students: Student[] = [
  { id: 1, name: "Alice", score: 92 },
  { id: 2, name: "Bob", score: 85 },
  { id: 3, name: "Charlie", score: 78 },
  { id: 4, name: "Diana", score: 65 },
  { id: 5, name: "Eve", score: 55 }
];

const results = processStudents(students);
displayResults(results);

// Calculate average score
const averageScore: number = students.reduce((sum, s) => sum + s.score, 0) / students.length;
console.log(`\nClass Average: ${averageScore.toFixed(2)}`);
```

### Run Your Program

```bash
# Compile to JavaScript
npx tsc

# Run with Node
node dist/grades.js

# Or run directly with ts-node
npx ts-node src/grades.ts
```

**Output:**
```
=== Student Grade Report ===

Student: Alice
Score: 92
Grade: A
Feedback: Excellent work!
---
Student: Bob
Score: 85
Grade: B
Feedback: Good job!
---
Student: Charlie
Score: 78
Grade: C
Feedback: Satisfactory
---
Student: Diana
Score: 65
Grade: D
Feedback: Needs improvement
---
Student: Eve
Score: 55
Grade: F
Feedback: Failed - please see instructor
---

Class Average: 75.00
```

---

## 🎯 Breaking Down the Code

### Interfaces (Structure)

```typescript
interface Student {
  id: number;
  name: string;
  score: number;
}
```

**This says:** "A Student must have an id (number), name (string), and score (number)."

### Type Annotations

```typescript
function processStudents(students: Student[]): GradeInfo[]
                        ↑ Input type     ↑ Output type
```

**This says:** "This function takes an array of Students and returns an array of GradeInfo."

### Type Guards

```typescript
if (score >= 90) {
  return { letter: "A", feedback: "Excellent work!" };
} else if (score >= 80) {
  // ...
}
```

TypeScript knows:
- `score` is a `number`
- Inside each branch, `score` is within certain ranges
- Return value matches `ScoreToGrade` type

---

## 💡 TypeScript Caught Errors

Let's see what TypeScript prevents. Try these (you'll get errors):

```typescript
// ❌ ERROR: Wrong type
const student: Student = {
  id: "1",      // ERROR: string is not number
  name: "Alice",
  score: 92
};

// ❌ ERROR: Missing property
const student: Student = {
  id: 1,
  name: "Alice"
  // ERROR: score is missing
};

// ❌ ERROR: Wrong function call
processStudents("Alice");  // ERROR: string is not Student[]

// ❌ ERROR: Non-existent property
const name = students[0].grade;  // ERROR: Student has no property 'grade'
```

**All caught BEFORE running!** 🎉

---

## ✨ Best Practices in This Code

1. **Interfaces at Top** - Define structures first
2. **Type Annotations** - Every function has input/output types
3. **Meaningful Names** - `processStudent` not `doThing`
4. **Single Responsibility** - Each function does one thing
5. **Comments** - Explain the "why"
6. **No `any` Types** - Actually specify types

---

## 🧠 Real-World Application

### For AI Engineering

This pattern is used in LLM applications:

```typescript
interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface LLMResponse {
  message: Message;
  tokensUsed: number;
}

async function chat(messages: Message[]): Promise<LLMResponse> {
  // Implementation
}
```

### For Frontend Development

This pattern is used in React components:

```typescript
interface UserProps {
  userId: number;
  onUpdate: (userId: string) => void;
}

function UserProfile({ userId, onUpdate }: UserProps) {
  // Implementation
}
```

---

## 🎯 Practice Exercises

### Exercise 1: Modify the Program (Beginner)

1. Copy `src/grades.ts`
2. Add a new student: `{ id: 6, name: "Frank", score: 88 }`
3. Run the program
4. What changed in the output?

### Exercise 2: Add More Functionality (Intermediate)

Add this to your program:

```typescript
// Function to find highest scoring student
function getTopStudent(students: Student[]): Student | undefined {
  if (students.length === 0) return undefined;
  return students.reduce((max, student) =>
    student.score > max.score ? student : max
  );
}

// Call it
const topStudent = getTopStudent(students);
if (topStudent) {
  console.log(`Top Student: ${topStudent.name} with ${topStudent.score}`);
}
```

### Exercise 3: Create New Type (Intermediate)

Create a `ClassStats` interface that tracks:
- Number of students
- Average score
- Highest score
- Lowest score
- Number of A's, B's, C's, etc.

Then create a function to calculate it!

---

## ✅ Solutions

### Exercise 1
Just add the student to the array - the output expands automatically!

### Exercise 2
The function finds the student with highest score. Try it!

### Exercise 3
```typescript
interface ClassStats {
  totalStudents: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  gradeDistribution: {
    A: number;
    B: number;
    C: number;
    D: number;
    F: number;
  };
}

function calculateClassStats(students: Student[]): ClassStats {
  const grades = students.map(s => calculateGrade(s.score).letter);
  
  return {
    totalStudents: students.length,
    averageScore: students.reduce((sum, s) => sum + s.score, 0) / students.length,
    highestScore: Math.max(...students.map(s => s.score)),
    lowestScore: Math.min(...students.map(s => s.score)),
    gradeDistribution: {
      A: grades.filter(g => g === "A").length,
      B: grades.filter(g => g === "B").length,
      C: grades.filter(g => g === "C").length,
      D: grades.filter(g => g === "D").length,
      F: grades.filter(g => g === "F").length,
    }
  };
}
```

---

## 📝 Key Takeaways

1. **Interfaces define structures** - What data looks like
2. **Type annotations guarantee contracts** - Everyone knows what's expected
3. **Functions have input and output types** - No surprises
4. **TypeScript catches errors** - Before they reach users
5. **Code is self-documenting** - Types tell the story

---

## 🎯 What's Next?

Day 5: **Understanding the TypeScript Compiler** - The final piece!

**Next:** [Day 5: Understanding The TypeScript Compiler](./Day_5_Understanding_The_Compiler.md)
