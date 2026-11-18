// Task 1
function greetUser(name: string): void {
  console.log(`Привет, ${name}!`);
}
greetUser("Анна");

// Task 2
interface Person {
  name: string;
  age: number;
  city: string;
}

function printPersonInfo(person: Person): void {
  console.log(`Имя: ${person.name}, Возраст: ${person.age}, Город: ${person.city}`);
}
printPersonInfo({ name: "Анна", age: 25, city: "Москва" });

// Task 3
function squareNumber(number: number): number {
  return number * number;
}
console.log(squareNumber(5));

// Task 4
function isEven(number: number): boolean {
  return number % 2 === 0;
}
console.log(isEven(8));
console.log(isEven(7));

// Task 5
interface Student {
  name: string;
  grade: number;
}

function printStudentInfo(student: Student): void {
  console.log(`Студент: ${student.name}, Оценка: ${student.grade}`);
}
printStudentInfo({ name: "Иван", grade: 5 });

// Task 6
function logMessage(message: string): void {
  console.log(message);
}
logMessage("Домашняя работа 16 выполнена!");
