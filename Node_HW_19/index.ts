
// Задание 1
const sumEvenNumbers = (numbers: number[]): number => {
  return numbers.filter((number) => number % 2 === 0)
    .reduce((sum, number) => sum + number, 0);
};
console.log('Задание 1:', sumEvenNumbers([1, 2, 3, 4, 5, 6])); 

// Задание 2
interface StringToBooleanFunction {
  (input: string): boolean;
}
const isEmptyString: StringToBooleanFunction = (input) => input.length === 0;
console.log('Задание 2 (пустая строка):', isEmptyString('')); 
console.log('Задание 2 (текст):', isEmptyString('Hello'));

// Задание 3
type CompareStrings = (str1: string, str2: string) => boolean;
const compareStrings: CompareStrings = (str1, str2) => str1 === str2;
console.log('Задание 3:', compareStrings('hello', 'hello')); 
console.log('Задание 3:', compareStrings('hello', 'world')); 

// Задание 4
function getLastElement<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
console.log('Задание 4 (числа):', getLastElement([10, 20, 30])); 
console.log('Задание 4 (строки):', getLastElement(['apple', 'banana'])); 
console.log('Задание 4 (пустой массив):', getLastElement<number>([])); 

// Задание 5
function makeTriple<T>(a: T, b: T, c: T): T[] {
  return [a, b, c];
}
console.log('Задание 5 (числа):', makeTriple<number>(1, 2, 3));
console.log('Задание 5 (строки):', makeTriple<string>('red', 'green', 'blue'));
