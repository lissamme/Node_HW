import { capitalize, reverseString } from './stringUtils';
import { Finance } from './finance';
import { UserManagement } from './userManagement';
import { generateFibonacci, generatePrimeNumbers } from './sequenceUtils';

console.log('=== Задание 1: Строки ===');
console.log('capitalize("hello world"):', capitalize('hello world'));
console.log('reverseString("TypeScript"):', reverseString('TypeScript'));
console.log('capitalize("привет"):', capitalize('привет'));

console.log('\n=== Задание 2: Финансы ===');
const loanCalculator = new Finance.LoanCalculator();
const taxCalculator = new Finance.TaxCalculator();
const payment = loanCalculator.calculateMonthlyPayment(1000000, 12, 5);
console.log('Кредит 1 000 000 под 12% на 5 лет. Платёж в месяц:', payment.toFixed(2));
console.log('Налог с дохода 100 000 по ставке 13%:', taxCalculator.calculateIncomeTax(100000, 13).toFixed(2));

console.log('\n=== Задание 3: Администратор ===');
const admin = new UserManagement.Admin.AdminUser('Anna', 'anna@example.com');
console.log('Администратор:', admin.name, admin.email, 'Суперадмин:', admin.isSuperAdmin);
admin.grantSuperAdmin();
console.log('После выдачи прав:', admin.isSuperAdmin);
admin.revokeSuperAdmin();
console.log('После отзыва прав:', admin.isSuperAdmin);

console.log('\n=== Задание 4: Последовательности ===');
console.log('Числа Фибоначчи до 50:', generateFibonacci(50));
console.log('Простые числа до 30:', generatePrimeNumbers(30));
