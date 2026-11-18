"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processNumbers = processNumbers;

function waitForNumber(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Завершена задержка ${milliseconds} мс`), milliseconds);
    });
}
async function processNumbers(numbers) {
    const results = await Promise.all(numbers.map((number) => waitForNumber(number)));
    console.log('Результаты в порядке исходного массива:');
    results.forEach((result) => console.log(result));
}
