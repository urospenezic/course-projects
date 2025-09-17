import { Component, computed, input, output } from '@angular/core';
import { User } from '../user/user.model';
import { TaskComponent } from './task/task.component';
import { Task, TaskData } from './task/tasks.model';
import { NewTaskComponent } from './task/new-task/new-task.component';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './user.task.list.component.html',
  styleUrl: './user.task.list.component.css',
})
export class UserTaskListComponent {
  isAddingTask = false;
  taskCompleted = output<Task>();
  taskAdded = output<TaskData>();

  onAddTask($event: TaskData) {
    let task = $event as TaskData;
    if (task) {
      this.taskAdded.emit(task);
    }
    this.isAddingTask = false;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }
  
  onCompleteTask(task: Task) {
    this.taskCompleted.emit(task);
  }
  user = input.required<User>();
  tasks = input.required<Task[]>();
}
