# Part 4: Your First TypeScript Program — Exercises

## Exercise 1: Run the Grade Calculator (Beginner)
1. Copy the complete program from concepts.md
2. Save it as `grades.ts`
3. Compile: `tsc grades.ts`
4. Run: `node grades.js`
5. What was the average score?

---

## Exercise 2: Modify the Program (Beginner)
1. Add a new student "Charlie" with score 78
2. Add Charlie's score to the allScores array
3. Recompile and run
4. What's the new average?

---

## Exercise 3: Create Your Own Interface (Intermediate)
Create an interface for a Book with:
- title (string)
- author (string)
- pages (number)

Then create 2 book objects that match this interface.

---

## Exercise 4: Write Your Own Function (Intermediate)
Create a function that:
- Takes a StudentGrade as input
- Returns whether they passed (score >= 60)

```typescript
function hasPassed(student: StudentGrade): boolean {
  // Your code here
}
```

---

## Challenge: Full Program (Advanced)
Write a program that:
1. Has a StudentGrade interface
2. Creates 5 students with different scores
3. A function to find the highest score
4. A function to find the lowest score
5. Prints all results

---

## 📝 Submission
- Submit your modified `grades.ts`
- Show all output from running the program
- Explain the interface you created in Exercise 3
