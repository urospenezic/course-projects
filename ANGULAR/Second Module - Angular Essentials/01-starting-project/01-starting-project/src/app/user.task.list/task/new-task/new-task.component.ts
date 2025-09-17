import { Component, input, output } from '@angular/core';
import { Task, TaskData } from '../tasks.model';
import { User } from '../../../user/user.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],//FormsModule is a module that provides the Forms API, it allows us to two way bind the input fields to the component
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  onCancel() {
    this.cancel.emit();
  }
  user = input.required<User>();
  enteredTitle = '';
  enteredSummary = '';
  enteredDueDate = '';
  newTask = output<TaskData>();
  cancel = output();

  onAddTask() {
    let task = this.generateTask(this.enteredTitle, this.enteredSummary, new Date(this.enteredDueDate), this.user().id);
    this.newTask.emit(task);
  }

  generateTask(title: string, summary: string, dueDate: Date, userId: string): TaskData{
    return {
      title: title,
      summary: summary,
      dueDate: dueDate,
      userId: userId
    }
  }

  generateTaskId(): string{
    return Math.random().toString();
  }
}
