import { runSequentialTasks } from './task1';
import { processStrings } from './task2';
import { runTasksWithError } from './task3';
import { processNumbers } from './task4';

async function main(): Promise<void> {
  console.log('\n--- Задание 1 ---');
  await runSequentialTasks();

  console.log('\n--- Задание 2 ---');
  await processStrings(['hello', 'typescript', 'async await']);

  console.log('\n--- Задание 3 ---');
  await runTasksWithError();

  console.log('\n--- Задание 4 ---');
  await processNumbers([500, 100, 300]);
}

main().catch((error: unknown) => console.error('Ошибка программы:', error));
