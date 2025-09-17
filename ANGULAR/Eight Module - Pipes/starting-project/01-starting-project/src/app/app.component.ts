import { Component } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TemperaturePipe } from './temperature.pipe';
import { SortPipe } from './sort.pipe';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [DatePipe, DecimalPipe, TemperaturePipe, SortPipe],
})
export class AppComponent {
  currentDate = new Date();
  currentTemperaturs = {
    berlin: 4.2749812,
    newYork: 18.1214,
    paris: 72.1209001,
    chicago: 65.0775238,
  };

  historicTemperatures = [
    25, 37, 19, -4, 28, 21, 19, 28, 33, 31, 9, 11, 5, -12, -5,
  ];

  onReset(index: number) {
    //this.historicTemperatures[index] = 18;
    // const temp = [...this.historicTemperatures];//THIS HAS TO BE DONE BECAUSE ANGULAR CACHES THE RETURNED VALUE OF THE PIPE, SO IF WE JUST DO INDEXED CHANGE, IT WILL NOT REFLECT ON THE UI
    // temp[index] = 18;
    // this.historicTemperatures = temp;
    //alternative approach to this shenanigans is to make the pipe unpure, so set pure: false in the pipe metadata. that disables caching, so perfomance will take a hit
    //ULTIMATELY PIPES NOT MIGHT BE THE BEST TOOL FOR THE JOB FOR SORTING SETS
  }
}
