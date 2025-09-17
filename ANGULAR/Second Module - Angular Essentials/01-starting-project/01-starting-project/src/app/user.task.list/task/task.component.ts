import { Component, input, output, EventEmitter } from '@angular/core';
import { Task } from './tasks.model';
import { CardComponent } from "../../shared/card/card.component";
import { DatePipe } from '@angular/common';

//CHECK OUT THE HTML FILE TO SEE HOW PIPES ARE USED. pipes are used to format data and display it in a specific way.
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  completeTask = output<Task>();
  task = input.required<Task>();

  onCompleteTask() {
    this.completeTask.emit(this.task());
  }
}
