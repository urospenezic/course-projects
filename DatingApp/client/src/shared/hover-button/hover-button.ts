import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-hover-button',
  imports: [],
  templateUrl: './hover-button.html',
  styleUrl: './hover-button.css',
})
export class HoverButton {
  disabled = input.required<boolean>();
  selected = input.required<boolean>();
  positionClasses = input<string>('right-1 top-1');
  pathData = input.required<string>(); // SVG path data

  selectedColor = input<string>('text-yellow-200');
  unselectedColor = input<string>('stroke-white');
  selectedFill = input<string>('currentColor');
  unselectedFill = input<string>('none');

  clickEvent = output<Event>();

  onClick(event: Event) {
    this.clickEvent.emit(event);
  }
}
