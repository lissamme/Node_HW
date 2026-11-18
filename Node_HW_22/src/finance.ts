export namespace Finance {
  export class LoanCalculator {
    calculateMonthlyPayment(principal: number, annualRatePercent: number, years: number): number {
      if (principal <= 0 || annualRatePercent < 0 || years <= 0) {
        throw new Error('Укажите положительную сумму и срок, а ставку — неотрицательную.');
      }
      const months = years * 12;
      const monthlyRate = annualRatePercent / 100 / 12;
      if (monthlyRate === 0) return principal / months;
      const factor = Math.pow(1 + monthlyRate, months);
      return principal * monthlyRate * factor / (factor - 1);
    }
  }

  export class TaxCalculator {
    calculateIncomeTax(income: number, taxRatePercent: number): number {
      if (income < 0 || taxRatePercent < 0 || taxRatePercent > 100) {
        throw new Error('Доход должен быть неотрицательным, ставка — от 0 до 100%.');
      }
      return income * taxRatePercent / 100;
    }
  }
}
