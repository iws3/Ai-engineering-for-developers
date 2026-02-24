# Part 3: Extending Interfaces & Inheritance — Exercises

## Exercise 1 (Beginner): Extend a Base Interface

Create an Employee interface that extends Person interface.

\`\`\`typescript
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  // Add employeeId and department
}

const emp: Employee = {
  name: "Alice",
  age: 30,
  employeeId: "E001",
  department: "Engineering"
};
\`\`\`

**Solution**:
\`\`\`typescript
interface Employee extends Person {
  employeeId: string;
  department: string;
}
\`\`\`

---

## Exercise 2 (Intermediate): Multiple Interface Extension

Create a Programmer interface using both Employee and multiple other interfaces.

## Challenge (Advanced): Complex Type Composition

Use interface composition to create a complete system type.

