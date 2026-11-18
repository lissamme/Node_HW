
function toUpperCaseAsync(value: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value.toUpperCase()), 300);
  });
}

export async function processStrings(values: string[]): Promise<void> {
  const results: string[] = await Promise.all(values.map((value) => toUpperCaseAsync(value)));
  console.log('Результаты обработки:', results);
}
