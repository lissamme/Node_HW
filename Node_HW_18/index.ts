
// Task 1
type Admin = {
  name: string;
  permissions: string[];
};

type User = {
  name: string;
  email: string;
};

type AdminUser = Admin & User;

const adminUser: AdminUser = {
  name: "Anna",
  permissions: ["read", "write", "delete"],
  email: "anna@example.com"
};
console.log("Task 1:", adminUser);

// Task 2
interface Car {
  make: string;
  model: string;
  engine: {
    type: string;
    horsepower: number;
  };
  year?: number;
}

const car: Car = {
  make: "Toyota",
  model: "Camry",
  engine: { type: "Gasoline", horsepower: 203 },
  year: 2022
};

function printCarInfo(car: Car): void {
  console.log(`Марка: ${car.make}, Модель: ${car.model}, Двигатель: ${car.engine.type}, Мощность: ${car.engine.horsepower} л.с., Год: ${car.year ?? "не указан"}`);
}
printCarInfo(car);

// Task 3
interface Product {
  name: string;
  price: number;
}

interface CalculateDiscount {
  (product: Product, discount: number): number;
}

const calculateDiscount: CalculateDiscount = (product, discount) => {
  return product.price * (1 - discount / 100);
};

console.log("Task 3:", calculateDiscount({ name: "Laptop", price: 1000 }, 20));

// Task 4 
interface Employee {
  name: string;
  salary: number;
}

const employees: Employee[] = [
  { name: "Ivan", salary: 50000 },
  { name: "Maria", salary: 65000 },
  { name: "Alex", salary: 70000 }
];

function getEmployeeSalaries(employees: Employee[]): number[] {
  return employees.map((employee) => employee.salary);
}

console.log("Task 4:", getEmployeeSalaries(employees));

// Task 5
interface Person {
  firstName: string;
  lastName: string;
}

interface Student extends Person {
  grade: number;
}

const student: Student = {
  firstName: "Anna",
  lastName: "Ivanova",
  grade: 5
};

function printStudentInfo(student: Student): void {
  console.log(`Студент: ${student.firstName} ${student.lastName}, Оценка: ${student.grade}`);
}
printStudentInfo(student);

// Task 6
interface ConcatStrings {
  (str1: string, str2: string): string;
}

const concatStrings: ConcatStrings = (str1, str2) => {
  return str1 + str2;
};

console.log("Task 6:", concatStrings("Hello, ", "world!"));
