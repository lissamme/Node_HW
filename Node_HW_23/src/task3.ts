
function successfulTask(message: string, delay: number): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve(message), delay));
}
function failedTask(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Вторая задача завершилась с ошибкой')), 200);
  });
}

export async function runTasksWithError(): Promise<void> {
  try {
    const results = await Promise.all([
      successfulTask('Первая задача выполнена', 100),
      failedTask(),
      successfulTask('Третья задача выполнена', 300),
    ]);
    console.log('Результаты:', results);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Ошибка при параллельном выполнении:', error.message);
    } else {
      console.error('Неизвестная ошибка:', error);
    }
  }
}
