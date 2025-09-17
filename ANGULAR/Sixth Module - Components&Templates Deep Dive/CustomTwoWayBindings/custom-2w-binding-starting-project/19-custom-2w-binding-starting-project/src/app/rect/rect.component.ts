import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // Todo: Implement custom two-way binding
  // size = input<{ width: string; height: string }>({
  //   width: '100',
  //   height: '100',
  // });
  //BY PROVIDING THIS SPECFIC {NAME}+CHANGED NAME OF THE OUTPUT, WE'VE CREATED A CUSTOM TWO-WAY BINDING, SO WE IF YOU LOOK AT APP.COMPONENT.HTML, YOU'LL SEE THAT WE'VE USED [(size)] INSTEAD OF [size]
  //sizeChange = output<{ width: string; height: string }>();

  //A NEWER WAY OF SETTING UP A TWO-WAY BINDING IS BY USING model
  size = model<{ width: string; height: string }>({//models like inputs also have .required, so we do not need a default value
    width: '100',
    height: '100',
  });

  onReset() {
    this.size.set({ width: '200', height: '100' });
  }
}
