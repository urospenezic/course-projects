import { InvestmentResult } from '../../investment.model';
import { Injectable, signal } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class InvestmentCalculatorService {
  result = signal<InvestmentResult[] | undefined>(undefined);

  calculateInvestmentResults(
    initialInvestment: number,
    yearlyContribution: number,
    expectedReturn: number,
    duration: number
  ) {
    const annualData: InvestmentResult[] = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + yearlyContribution;
      const totalInterest =
        investmentValue - yearlyContribution * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: yearlyContribution,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + yearlyContribution * year,
      });
    }

    this.result.set(annualData);
  }
}
