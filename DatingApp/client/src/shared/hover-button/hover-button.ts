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
  positionClasses = input<string>('right-1 top-1'); // Default positioning
  clickEvent = output<Event>();

  onClick(event: Event) {
    this.clickEvent.emit(event);
  }
}
