"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTasksWithError = runTasksWithError;

function successfulTask(message, delay) {
    return new Promise((resolve) => setTimeout(() => resolve(message), delay));
}
function failedTask() {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Вторая задача завершилась с ошибкой')), 200);
    });
}
async function runTasksWithError() {
    try {
        const results = await Promise.all([
            successfulTask('Первая задача выполнена', 100),
            failedTask(),
            successfulTask('Третья задача выполнена', 300),
        ]);
        console.log('Результаты:', results);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Ошибка при параллельном выполнении:', error.message);
        }
        else {
            console.error('Неизвестная ошибка:', error);
        }
    }
}
