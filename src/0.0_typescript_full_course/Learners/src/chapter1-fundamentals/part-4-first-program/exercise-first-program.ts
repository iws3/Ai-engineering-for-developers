/**
 * Chapter 1, Part 4: Your First TypeScript Program
 * 
 * Build a simple student grade calculator
 */

// PART A: Define the structure
interface StudentGrade {
  studentName: string;
  subject: string;
  score: number;  // 0-100
}

// PART B: Function to calculate letter grade
function getLetterGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

// PART C: Main program
const myGrade: StudentGrade = {
  studentName: "Alice",
  subject: "TypeScript",
  score: 92
};

// TODO: Try to break this
// myGrade.score = "ninety";  // What error do you see?

const letterGrade = getLetterGrade(myGrade.score);

console.log(`${myGrade.studentName} scored ${myGrade.score} on ${myGrade.subject}`);
console.log(`Grade: ${letterGrade}`);

// CHALLENGE: Extend this program
// 1. Create an array of 3 students
// 2. Calculate each student's grade
// 3. Find the highest score
// 4. Find the average score

export {};
