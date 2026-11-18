
function waitForNumber(milliseconds: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Завершена задержка ${milliseconds} мс`), milliseconds);
  });
}

export async function processNumbers(numbers: number[]): Promise<void> {
  const results = await Promise.all(numbers.map((number) => waitForNumber(number)));
  console.log('Результаты в порядке исходного массива:');
  results.forEach((result) => console.log(result));
}
