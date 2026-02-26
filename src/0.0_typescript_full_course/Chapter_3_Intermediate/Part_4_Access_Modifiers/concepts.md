# Part 4: Access Modifiers (Intermediate Deep Dive)

## 🎯 Learning Objectives

After this part, you'll understand:
- public, private, and protected keywords
- Encapsulation and why it matters
- Private fields and class privacy
- Property getters and setters
- Access patterns in inheritance
- Real-world encapsulation patterns
- When and how to use each modifier

---

## 📝 Key Terms

- **public**: Accessible from anywhere (default, can omit)
- **private**: Accessible only inside the class
- **protected**: Accessible in class and subclasses
- **Encapsulation**: Hiding internal details, exposing clean interface
- **Getter/Setter**: Methods for controlled property access
- **Private Field**: ES2022 `#field` syntax for true privacy

---

## 🎭 Understanding Access Modifiers

Access modifiers control who can access class properties and methods:

```typescript
class BankAccount {
  // ✅ Public - Anyone can access (default)
  public accountNumber: string;

  // 🔒 Private - Only BankAccount can access
  private balance: number;

  // 🔐 Protected - BankAccount and subclasses can access
  protected owner: string;

  constructor(accountNumber: string, owner: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.owner = owner;
    this.balance = initialBalance;
  }

  // ✅ Public method - Anyone can call
  public getBalance(): number {
    return this.balance;
  }

  // 🔒 Private method - Only BankAccount can call
  private calculateInterest(): number {
    return this.balance * 0.02;
  }

  // 🔐 Protected method - BankAccount and subclasses can call
  protected applyInterest(): void {
    this.balance += this.calculateInterest();
  }

  public withdraw(amount: number): boolean {
    if (amount > this.balance) {
      return false;
    }
    this.balance -= amount;
    return true;
  }
}

// Usage
const account = new BankAccount("12345", "Alice", 1000);

// ✅ Public - OK
console.log(account.accountNumber);    // "12345"
console.log(account.getBalance());     // 1000

// ❌ Private - ERROR
console.log(account.balance);          // ERROR: private property
account.calculateInterest();           // ERROR: private method

// ❌ Protected - ERROR (only accessible in subclass)
console.log(account.owner);            // ERROR: protected property
```

---

## 📊 Visibility Comparison

| Modifier | Own Class | Subclass | Outside |
|----------|-----------|----------|---------|
| `public` | ✅ Yes | ✅ Yes | ✅ Yes |
| `protected` | ✅ Yes | ✅ Yes | ❌ No |
| `private` | ✅ Yes | ❌ No | ❌ No |

---

## 🔒 Private Properties and Methods

Private members are only accessible within the class:

```typescript
class User {
  public id: number;
  public name: string;
  private password: string;
  private lastLogin: Date;

  constructor(id: number, name: string, password: string) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.lastLogin = new Date();
  }

  // ✅ Private method - can access private members
  private validatePassword(input: string): boolean {
    return input === this.password;
  }

  // ✅ Public method - can call private methods
  public login(password: string): boolean {
    if (!this.validatePassword(password)) {
      return false;
    }
    this.lastLogin = new Date();
    return true;
  }

  // ✅ Private method - returns private data safely
  private getLastLogin(): Date {
    return this.lastLogin;
  }
}

const user = new User(1, "Alice", "secret123");

// ✅ OK - public access
user.login("secret123");
console.log(user.id);    // 1

// ❌ ERROR - private access
user.password = "hacked";       // ERROR: private property
user.validatePassword("test");  // ERROR: private method
```

**Why use private?**
- Protect sensitive data
- Enforce validation
- Control state changes
- Hide implementation details

---

## 🔐 Protected Properties and Methods

Protected members are accessible in the class and subclasses:

```typescript
class Animal {
  protected name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  protected getInfo(): string {
    return `${this.name} is ${this.age} years old`;
  }
}

class Dog extends Animal {
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age);
    this.breed = breed;
  }

  // ✅ Can access protected members from parent
  public describe(): string {
    return `${this.getInfo()} and is a ${this.breed}`;
  }

  // ✅ Can override protected method
  protected getInfo(): string {
    return `Dog: ${super.getInfo()}`;
  }
}

const dog = new Dog("Buddy", 5, "Golden Retriever");

// ✅ OK - public method
console.log(dog.describe());  // "Dog: Buddy is 5 years old and is a Golden Retriever"

// ❌ ERROR - protected access
console.log(dog.name);        // ERROR: protected property
dog.getInfo();                // ERROR: protected method
```

---

## ⚙️ Getters and Setters

Provide controlled access to properties:

```typescript
class Temperature {
  private celsius: number;

  constructor(celsius: number) {
    this.celsius = celsius;
  }

  // Getter: read-only access
  get fahrenheit(): number {
    return (this.celsius * 9/5) + 32;
  }

  // Setter: controlled write access
  set fahrenheit(f: number) {
    this.celsius = (f - 32) * 5/9;
  }

  get celsius_value(): number {
    return this.celsius;
  }

  set celsius_value(c: number) {
    if (c < -273.15) {
      throw new Error("Temperature cannot be below absolute zero");
    }
    this.celsius = c;
  }
}

const temp = new Temperature(0);

// ✅ Using getter
console.log(temp.fahrenheit);    // 32
console.log(temp.celsius_value); // 0

// ✅ Using setter
temp.fahrenheit = 68;            // Converts to Celsius
console.log(temp.celsius_value); // ~20

// ❌ Can't set invalid temperature
temp.celsius_value = -300;       // ERROR: throws validation error
```

**Getter/Setter benefits:**
- Validation logic
- Computed properties
- Backwards compatibility (change implementation without API change)

---

## 📚 Resources

- [TypeScript Handbook: Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [Access Modifiers](https://www.typescriptlang.org/docs/handbook/2/classes.html#visibility-modifiers)
- [Getters and Setters](https://www.typescriptlang.org/docs/handbook/2/classes.html#getters--setters)

---

## ✅ Checklist

- [ ] Understand public, protected, and private modifiers
- [ ] Know visibility rules in inheritance
- [ ] Can use getters and setters for validation
- [ ] Understand encapsulation benefits
- [ ] Can apply access modifiers to real-world classes
- [ ] Able to protect sensitive data
- [ ] Know best practices for minimal exposure
