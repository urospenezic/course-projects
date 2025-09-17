import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksService } from './tasks.service';
@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  //providers: [TasksService],//by doing this, the TasksService will be available to the Tasks component and all its children, but not to the root component or other components that are not children of the Tasks component
  //NOTE THAT THIS DOES NOT INJECT THE SAME SERVICE TO EACH COMPONENT, IT MAKES DUPLICATES
})
export class TasksComponent {}
