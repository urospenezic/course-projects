import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CalculatorFormComponent } from "./calculator-form/calculator-form.component";
import { InvestmentTableComponent } from "./investment-table/investment-table.component";
import { InvestmentResult } from '../investment.model';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, CalculatorFormComponent, InvestmentTableComponent],
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
  investmentResults = signal<InvestmentResult[]>([]);

  onInvestmentResults(results: InvestmentResult[]) {
    this.investmentResults.set(results);
  }
}
