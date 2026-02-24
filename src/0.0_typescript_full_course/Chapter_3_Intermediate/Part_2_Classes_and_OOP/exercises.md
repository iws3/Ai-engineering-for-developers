# Part 2: Classes and OOP — Exercises

## Exercise 1 (Beginner): Create a Vehicle Class

Create a Vehicle class with:
- name and maxSpeed properties
- Constructor
- describe() method

**Starter**:
\`\`\`typescript
class Vehicle {
  // TODO: Add properties and methods
}

const car = new Vehicle("Tesla", 250);
car.describe();  // "Tesla can go up to 250 km/h"
\`\`\`

**Solution**:
\`\`\`typescript
class Vehicle {
  name: string;
  maxSpeed: number;

  constructor(name: string, maxSpeed: number) {
    this.name = name;
    this.maxSpeed = maxSpeed;
  }

  describe(): void {
    console.log(\`\${this.name} can go up to \${this.maxSpeed} km/h\`);
  }
}
\`\`\`

---

## Exercise 2 (Intermediate): Inheritance with Cars and Motorcycles

Extend Vehicle to create Car and Motorcycle classes with unique methods.

**Starter**:
\`\`\`typescript
class Car extends Vehicle {
  // TODO: Add Car-specific properties/methods
  topazSeats: number;
}

const myCar = new Car("BMW", 280, 5);
myCar.describe();        // "BMW can go up to 280 km/h"
myCar.showSeats();       // "BMW has 5 seats"
\`\`\`

**Solution**:
\`\`\`typescript
class Car extends Vehicle {
  seats: number;

  constructor(name: string, maxSpeed: number, seats: number) {
    super(name, maxSpeed);
    this.seats = seats;
  }

  showSeats(): void {
    console.log(\`\${this.name} has \${this.seats} seats\`);
  }
}
\`\`\`

---

## Challenge (Advanced): Banking System with Access Modifiers

Create a BankAccount class with:
- Public accountId
- Private balance
- Methods: deposit(), withdraw(), getBalance()

\`\`\`typescript
class BankAccount {
  // TODO: Implement with access modifiers
}

const account = new BankAccount("ACC001", 1000);
account.deposit(500);
console.log(account.getBalance());  // 1500
// account.balance;  // Error - private!
\`\`\`

**Solution**:
\`\`\`typescript
class BankAccount {
  public accountId: string;
  private balance: number;

  constructor(accountId: string, initialBalance: number) {
    this.accountId = accountId;
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): boolean {
    if (amount <= this.balance) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  getBalance(): number {
    return this.balance;
  }
}
\`\`\`

