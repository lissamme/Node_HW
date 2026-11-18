"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processStrings = processStrings;

function toUpperCaseAsync(value) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(value.toUpperCase()), 300);
    });
}
async function processStrings(values) {
    const results = await Promise.all(values.map((value) => toUpperCaseAsync(value)));
    console.log('Результаты обработки:', results);
}
