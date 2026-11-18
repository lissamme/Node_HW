"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSequentialTasks = runSequentialTasks;

function firstTask() {
    return new Promise((resolve) => setTimeout(() => resolve('Первая задача завершена (500 мс)'), 500));
}
function secondTask() {
    return new Promise((resolve) => setTimeout(() => resolve('Вторая задача завершена (300 мс)'), 300));
}
function thirdTask() {
    return new Promise((resolve) => setTimeout(() => resolve('Третья задача завершена (200 мс)'), 200));
}
async function runSequentialTasks() {
    console.log('Начинаем последовательное выполнение');
    try {
        console.log(await firstTask());
        console.log(await secondTask());
        console.log(await thirdTask());
        console.log('Все задачи выполнены по очереди');
    }
    catch (error) {
        console.error('Ошибка:', error);
    }
}
