import { Component, computed, inject } from '@angular/core';
import { InvestmentResult } from '../../investment.model';
import { CurrencyPipe } from '@angular/common';
import { InvestmentCalculatorService } from '../calculator-form/investment.calculator.service';
@Component({
  selector: 'app-investment-table',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-table.component.html',
  styleUrl: './investment-table.component.css',
})
export class InvestmentTableComponent {
  investmentCalculatorService = inject(InvestmentCalculatorService);
  investmentResults = computed(() => this.investmentCalculatorService.result());
}
