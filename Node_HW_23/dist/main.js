"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task1_1 = require("./task1");
const task2_1 = require("./task2");
const task3_1 = require("./task3");
const task4_1 = require("./task4");
async function main() {
    console.log('\n--- Задание 1 ---');
    await (0, task1_1.runSequentialTasks)();
    console.log('\n--- Задание 2 ---');
    await (0, task2_1.processStrings)(['hello', 'typescript', 'async await']);
    console.log('\n--- Задание 3 ---');
    await (0, task3_1.runTasksWithError)();
    console.log('\n--- Задание 4 ---');
    await (0, task4_1.processNumbers)([500, 100, 300]);
}
main().catch((error) => console.error('Ошибка программы:', error));
