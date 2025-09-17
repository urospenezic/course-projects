import { Component, input, output, signal, inject } from '@angular/core';
import { InvestmentCalculatorService } from './investment.calculator.service';
import { InvestmentResult } from '../../investment.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculator-form.component.html',
  styleUrl: './calculator-form.component.css',
})
export class CalculatorFormComponent {
  initialInvestment : number = 5000;
  yearlyContribution : number = 1200;
  expectedReturn : number = 7;
  duration : number = 10;
  investmentCalculatorService = inject(InvestmentCalculatorService);

  onSubmit() {
    this.investmentCalculatorService.calculateInvestmentResults(this.initialInvestment, this.yearlyContribution, this.expectedReturn, this.duration);
  }
}
