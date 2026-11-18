
// Задание 1. 
class Animal {
  constructor(public name: string, public species: string) {}

  sound(): void {
    console.log("The animal makes a sound");
  }
}

class Dog extends Animal {
  constructor(name: string, species: string, public breed: string) {
    super(name, species);
  }

  override sound(): void {
    console.log("The dog barks");
  }
}

console.log("Задание 1:");
const animal = new Animal("Milo", "Cat");
animal.sound();
const dog = new Dog("Buddy", "Dog", "Labrador");
dog.sound();
console.log(dog.name, dog.species, dog.breed);

// Задание 2. 
class Library {
  static totalBooks: number = 0;

  addBook(): void {
    Library.totalBooks++;
  }
}

console.log("\nЗадание 2:");
const firstLibrary = new Library();
const secondLibrary = new Library();
firstLibrary.addBook();
console.log("Всего книг:", Library.totalBooks); // 1
secondLibrary.addBook();
secondLibrary.addBook();
console.log("Всего книг:", Library.totalBooks); // 3

// Задание 3. 
class Vehicle {
  constructor(public make: string, public model: string) {}
}

class Motorcycle extends Vehicle {
  constructor(make: string, model: string, public type: string) {
    super(make, model);
  }
}

console.log("\nЗадание 3:");
const motorcycle = new Motorcycle("Honda", "CBR500R", "Sport");
console.log("Марка:", motorcycle.make);
console.log("Модель:", motorcycle.model);
console.log("Тип:", motorcycle.type);
