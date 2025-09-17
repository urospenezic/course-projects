import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  //this is like wpf converter basically
  transform(
    value: string | number | null,
    inputType: 'C' | 'F', //input and output type are meant to be passed as parameters to this pipe in html via the syntax  "temperature: 'C'"
    outputType?: 'C' | 'F' //output type is optional because if input is not specified, it will default to C
  ): string | number | null {
    if (!value) {
      //will be true if null or undefined
      return value;
    }

    let val: number;
    if (typeof value === 'string') {
      val = parseFloat(value);
    } else {
      val = value;
    }
    let output: number;
    if (inputType === 'C' && outputType === 'F') {
      output = val * (9 / 5) + 32;
      return `${output}°F`;
    } else if (inputType === 'F' && outputType === 'C') {
      output = (val - 32) * (5 / 9);
      return `${output}°C`;
    } else {
      output = val;
    }
    let symbol: '°C' | '°F';
    if (!outputType) {
      symbol = inputType === 'C' ? '°C' : '°F';
    } else {
      symbol = outputType === 'C' ? '°C' : '°F';
    }
    return `${output.toFixed(2)}${symbol}`;
  }
}
