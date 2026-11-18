export {};

// Homework 21 — Abstract classes and polymorphism in TypeScript

// Task 1: Animal
abstract class Animal {
  abstract makeSound(): string;
}

class Dog extends Animal {
  makeSound(): string {
    return "Bark";
  }
}

class Cat extends Animal {
  makeSound(): string {
    return "Meow";
  }
}

console.log("Task 1: Animal");
const animals: Animal[] = [new Dog(), new Cat()];
animals.forEach((animal) => console.log(animal.makeSound()));

// Task 2: Colored shapes
abstract class Shape {
  abstract name: string;
  abstract calculateArea(): number;
}

abstract class ColoredShape extends Shape {
  abstract color: string;
}

class ColoredCircle extends ColoredShape {
  name: string = "Circle";

  constructor(public radius: number, public color: string) {
    super();
  }

  calculateArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

class ColoredRectangle extends ColoredShape {
  name: string = "Rectangle";

  constructor(public width: number, public height: number, public color: string) {
    super();
  }

  calculateArea(): number {
    return this.width * this.height;
  }
}

console.log("\nTask 2: Colored shapes");
const shapes: ColoredShape[] = [
  new ColoredCircle(5, "Red"),
  new ColoredRectangle(4, 6, "Blue"),
];
shapes.forEach((shape) => {
  console.log(`${shape.name}: area = ${shape.calculateArea().toFixed(2)}, color = ${shape.color}`);
});

// Task 3: Appliances
abstract class Appliance {
  abstract turnOn(): void;
  abstract turnOff(): void;
}

class WashingMachine extends Appliance {
  turnOn(): void {
    console.log("Washing machine is on");
  }

  turnOff(): void {
    console.log("Washing machine is off");
  }
}

class Refrigerator extends Appliance {
  turnOn(): void {
    console.log("Refrigerator is on");
  }

  turnOff(): void {
    console.log("Refrigerator is off");
  }
}

console.log("\nTask 3: Appliances");
const appliances: Appliance[] = [new WashingMachine(), new Refrigerator()];
appliances.forEach((appliance) => {
  appliance.turnOn();
  appliance.turnOff();
});

// Task 4: Bank accounts
abstract class Account {
  protected balance: number;

  constructor(initialBalance: number = 0) {
    if (initialBalance < 0) {
      throw new Error("Initial balance cannot be negative");
    }
    this.balance = initialBalance;
  }

  abstract deposit(amount: number): void;
  abstract withdraw(amount: number): void;

  getBalance(): number {
    return this.balance;
  }
}

class SavingsAccount extends Account {
  constructor(initialBalance: number, private interestRate: number) {
    super(initialBalance);
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) throw new Error("Withdrawal must be positive");
    if (amount > this.balance) throw new Error("Insufficient funds");
    this.balance -= amount;
  }

  addInterest(): void {
    this.balance += this.balance * this.interestRate;
  }
}

class CheckingAccount extends Account {
  constructor(initialBalance: number, private withdrawalFee: number) {
    super(initialBalance);
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) throw new Error("Withdrawal must be positive");
    if (amount + this.withdrawalFee > this.balance) {
      throw new Error("Insufficient funds including fee");
    }
    this.balance -= amount + this.withdrawalFee;
  }
}

console.log("\nTask 4: Accounts");
const savings = new SavingsAccount(1000, 0.05); // 5% per interest calculation
savings.deposit(500);
savings.withdraw(200);
savings.addInterest();
console.log(`Savings balance after interest: ${savings.getBalance().toFixed(2)}`);

const checking = new CheckingAccount(1000, 10); // fixed fee of 10 per withdrawal
checking.deposit(200);
checking.withdraw(300);
console.log(`Checking balance after withdrawal and fee: ${checking.getBalance().toFixed(2)}`);

// Task 5: Media
abstract class Media {
  abstract play(): void;
}

class Audio extends Media {
  play(): void {
    console.log("Playing audio");
  }
}

class Video extends Media {
  play(): void {
    console.log("Playing video");
  }
}

console.log("\nTask 5: Media");
const mediaItems: Media[] = [new Audio(), new Video()];
mediaItems.forEach((item) => item.play());
