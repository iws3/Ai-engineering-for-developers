# Part 3: Extending Interfaces & Inheritance (Intermediate)

## ÌæØ Learning Objectives
- Extend interfaces to build type hierarchies
- Understand interface inheritance
- Combine multiple interfaces
- Apply to complex type systems

## Ìø∑Ô∏è Key Terms
- **Interface Inheritance**: Extending one interface from another
- **Interface Composition**: Combining multiple interfaces
- **Mixin**: A pattern for composing behaviors
- **Base Interface**: The parent interface being extended

## Ìæì Deep Concepts

### 1. Extending Interfaces

\`\`\`typescript
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const myDog: Dog = {
  name: "Buddy",
  age: 5,
  breed: "Golden Retriever",
  bark() {
    console.log("Woof!");
  }
};
\`\`\`

### 2. Multiple Interface Inheritance

\`\`\`typescript
interface Swimmer {
  swim(): void;
}

interface Flyer {
  fly(): void;
}

interface Duck extends Swimmer, Flyer {
  quack(): void;
}

const duck: Duck = {
  swim() { console.log("Swimming"); },
  fly() { console.log("Flying"); },
  quack() { console.log("Quack!"); }
};
\`\`\`

### 3. Interface Composition

\`\`\`typescript
type Human = {
  name: string;
  age: number;
} & {
  speak(): void;
};
\`\`\`

## Ì≥ö Resources
- TypeScript Handbook: Interface Inheritance

## ‚úÖ Checklist
- [ ] Extend basic interfaces
- [ ] Use multiple inheritance
- [ ] Combine interfaces effectively
