import { Component, computed, inject, input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterStateSnapshot,
} from '@angular/router';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  //without input binding for route segments, we can use:
  //private route = inject(ActivatedRoute);
  //private destroyRef = inject(DestroyRef);
  //order?: 'asc' | 'desc';
  //ngOnInit() {
  //  this.route.queryParams.subscribe((params) => {
  //    this.order = params['order'];
  //  });
  //  destroyRef.onDestroy(() => {
  //    subscription.unsubscribe();
  //  });
  //}

  //input binding:
  // order = input<'asc' | 'desc'>('desc'); //default value is desc
  // private tasksService = inject(TasksService);
  // //child routes do not get the id value from parent route for input route segmentation (you can only get path segments for the route that's directly linked to the component)
  // //if we want this behavior to be set by default (child routes to have parent segment access), we have to set that in config by adding withRouterConfig() to provideRouter() function
  // //tasks = input.required<Task[]>();
  // userId = input.required<string>();
  // tasks = computed(() => {
  //   const tasks = this.tasksService
  //     .allTasks()
  //     .filter((task) => task.userId === this.userId());
  //   return tasks.sort((a, b) => {
  //     if (this.order() === 'asc') {
  //       return a.title.localeCompare(b.title);
  //     } else {
  //       return b.title.localeCompare(a.title);
  //     }
  //   });
  // });

  //resovler + input binding:
  //USER TASKS WILL NOT UPDATE THE UI WHEN A TASK IS MARKED AS COMPLETED, BECAUSE THERE IS NO NAVIGATION CHANGE THERE, SO THE RESOLVER DOES NOT TRIGGER
  userTasks = input.required<Task[]>();
  userId = input.required<string>();
  order = input<'asc' | 'desc' | undefined>();
}

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const order = activatedRoute.queryParams['order'];
  const tasksService = inject(TasksService);
  const tasks = tasksService
    .allTasks()
    .filter((task) => task.userId === activatedRoute.paramMap.get('userId'));

  if (order && order === 'asc') {
    return tasks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (order && order === 'desc') {
    return tasks.sort((a, b) => b.title.localeCompare(a.title));
  }

  return tasks;
};
