
function firstTask(): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve('Первая задача завершена (500 мс)'), 500));
}
function secondTask(): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve('Вторая задача завершена (300 мс)'), 300));
}
function thirdTask(): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve('Третья задача завершена (200 мс)'), 200));
}

export async function runSequentialTasks(): Promise<void> {
  console.log('Начинаем последовательное выполнение');
  try {
    console.log(await firstTask());
    console.log(await secondTask());
    console.log(await thirdTask());
    console.log('Все задачи выполнены по очереди');
  } catch (error) {
    console.error('Ошибка:', error);
  }
}
