# Part 2: Classes and OOP (Intermediate)

## ÌæØ Learning Objectives
- Write TypeScript classes with type safety
- Understand constructors, methods, and properties
- Use inheritance to create class hierarchies
- Implement polymorphism in TypeScript
- Apply OOP patterns to real-world problems

## Ìø∑Ô∏è Key Terms
- **Class**: A blueprint for creating objects
- **Constructor**: A special method that initializes objects
- **Inheritance**: Extending classes to reuse code
- **Override**: Re-implementing a parent method in a child class
- **Instance**: A specific object created from a class

## Ìæì Deep Concepts

### 1. Basic Classes
Classes provide a way to create reusable object templates with type safety.

\`\`\`typescript
class Dog {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  bark(): void {
    console.log(\`\${this.name} says Woof!\`);
  }
}

const myDog = new Dog("Buddy", 3);
myDog.bark();  // "Buddy says Woof!"
\`\`\`

### 2. Inheritance
Extend classes to build hierarchies of related types.

\`\`\`typescript
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  move(): void {
    console.log(\`\${this.name} is moving\`);
  }
}

class Cat extends Animal {
  meow(): void {
    console.log(\`\${this.name} says Meow!\`);
  }
}

const cat = new Cat("Whiskers");
cat.move();   // Inherited method
cat.meow();   // New method
\`\`\`

### 3. Method Overriding
Override parent methods in child classes.

\`\`\`typescript
class Bird extends Animal {
  move(): void {
    console.log(\`\${this.name} is flying\`);
  }
}

const bird = new Bird("Tweety");
bird.move();  // "Tweety is flying" (overridden)
\`\`\`

### 4. Access Modifiers
Control visibility of class members (public, private, protected).

\`\`\`typescript
class BankAccount {
  public accountNumber: string;
  private balance: number;
  protected accountType: string;

  constructor(accountNum: string, initialBalance: number) {
    this.accountNumber = accountNum;
    this.balance = initialBalance;
    this.accountType = "Savings";
  }

  withdraw(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount;
    }
  }

  getBalance(): number {
    return this.balance;
  }
}
\`\`\`

### Real-World Example: AI Assistant Classes

\`\`\`typescript
abstract class AIAssistant {
  modelName: string;

  constructor(modelName: string) {
    this.modelName = modelName;
  }

  abstract generateResponse(prompt: string): Promise<string>;
}

class ChatGPTAssistant extends AIAssistant {
  async generateResponse(prompt: string): Promise<string> {
    return \`Response from \${this.modelName}: Processing '\${prompt}'\`;
  }
}
\`\`\`

## Ì≥ö Resources
- TypeScript Handbook: Classes
- OOP Fundamentals

## ‚úÖ Checklist
- [ ] Create basic classes
- [ ] Use inheritance
- [ ] Override methods
- [ ] Apply access modifiers
