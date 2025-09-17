import { Component, computed, inject, signal } from '@angular/core';
//import { HeaderComponent } from './header/header.component';
//import { UserComponent } from './user/user.component';
//import { UserTaskListComponent } from './user.task.list/user.task.list.component';
import { DUMMY_USERS } from './dummy.users';
//import { DUMMY_TASKS } from './dummy-tasks';
import { Task, TaskData } from './user.task.list/task/tasks.model';
import { TasksService } from './user.task.list/tasks.service';
@Component({
  //this is a decorator, it is a function that takes a metadata object
  selector: 'app-root', //this is the selector, it is the name of html tag that will be used to use this component
  standalone: false, //this is a boolean that indicates if the component is standalone
  //imports: [HeaderComponent, UserComponent, UserTaskListComponent], //this is an array of modules that are imported into the component
  templateUrl: './app.component.html', //this is the HTML template for the component
  styleUrl: './app.component.css', //this is the CSS style for the component
})
export class AppComponent {
  private tasksService = inject(TasksService);
  users = DUMMY_USERS;
  tasks = this.tasksService.tasks;
  selectedUser = signal(this.users[0]);
  selectedUserTasks = computed(() =>
    this.tasks().filter((task) => task.userId === this.selectedUser().id)
  );

  onUserSelected(id: string) {
    let foundUser = this.users.find((user) => user.id === id);
    if (foundUser) {
      this.selectedUser.set(foundUser);
    }
  }

  onTaskCompleted(task: Task) {
    this.tasksService.completeTask(task);
  }

  onTaskAdded(data: TaskData) {
    this.tasksService.addTask(data.title, data.summary, data.dueDate, data.userId);
  }

  onTaskRemoved(task: Task) {
    this.tasksService.removeTask(task);
  }

  onTaskRemovedById(id: string) {
    this.tasksService.removeTaskById(id);
  }
}
