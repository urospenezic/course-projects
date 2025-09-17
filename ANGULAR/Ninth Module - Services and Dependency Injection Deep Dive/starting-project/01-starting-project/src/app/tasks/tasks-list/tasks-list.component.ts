import { Component, computed, inject, signal } from '@angular/core';
import { TasksService } from '../tasks.service';
import { TaskItemComponent } from './task-item/task-item.component';
import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider, TaskStatus } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider],//inject the token, so that this component can use the option values. these providers will be available to all child components, so we can inject them in task-item component.
})
export class TasksListComponent {
  private selectedFilter = signal<string>('all');
  private tasksService = inject(TasksService);
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'all':
        return this.tasksService.allTasks();
      case 'open':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'OPEN');
      case 'inProgress':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'DONE');
      default:
        return this.tasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
