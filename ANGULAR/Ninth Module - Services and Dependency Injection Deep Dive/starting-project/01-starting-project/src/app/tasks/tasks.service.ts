import { computed, inject, Injectable, signal } from '@angular/core';
import { Task } from './task.model';
import { LoggingService } from '../logging.service';

// Define which properties can be updated
type UpdatableTaskProperties = Pick<Task, 'title' | 'description' | 'status'>;

@Injectable({
  providedIn: 'root', //there are multiple injectors: root, platform, any (EnvironmentInjector (component reaches out first to this one, then moves to root EnvironmentInjector, then to Module, then to Platform), PlatformInjector, ModuleInjector)
})
//CHECK THE TAKS.COMPONENT.TS FILE FOR MORE INFO, SPECIFICALLY THE PROVIDERS ARRAY (EXAMPE OF ENVIRONMENT INJECTOR)
//check main.ts for alternative way of DI
//OPEN DEVELOPER TOOLS AND GO TO ANGULAR DEV TOOLS AND SEE INJECTOR TREE. THERE WE CAN ALSO SEE THE ENTIRE APP ARCHITECTURE IN TERMS OF COMPONENTS
export class TasksService {
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly(); // a way to make the signal readonly
  private loggingService = inject(LoggingService);

  addTask(taskData: { title: string; description: string }) {
    const task: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };
    this.tasks.update((tasks) => [...tasks, task]);
    this.loggingService.log(`Task added: ${task.title}`);
  }

  updateTask(taskId: string, taskData: Partial<UpdatableTaskProperties>) {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, ...taskData } : task
      )
    );
    this.loggingService.log(
      `Task updated: ${taskId} ${JSON.stringify(taskData)}`
    );
  }
}
