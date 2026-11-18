// Возвращает все числа Фибоначчи, не превышающие limit.
export function generateFibonacci(limit: number): number[] {
  if (!Number.isFinite(limit) || limit < 0) return [];
  const result: number[] = [0];
  if (limit < 1) return result;
  result.push(1);
  let a = 0;
  let b = 1;
  while (a + b <= limit) {
    const next = a + b;
    result.push(next);
    a = b;
    b = next;
  }
  return result;
}

// Возвращает все простые числа от 2 до limit включительно.
export function generatePrimeNumbers(limit: number): number[] {
  const primes: number[] = [];
  for (let number = 2; number <= Math.floor(limit); number++) {
    let isPrime = true;
    for (let divisor = 2; divisor * divisor <= number; divisor++) {
      if (number % divisor === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(number);
  }
  return primes;
}
