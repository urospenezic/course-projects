import { Routes } from '@angular/router';
import {
  canLeaveEditPage,
  NewTaskComponent,
} from '../tasks/new-task/new-task.component';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';

export const userRoutes: Routes = [
  {
    path: '', //domain/users/u1 (if no path is provided, it will redirect to tasks)
    redirectTo: 'tasks',
    pathMatch: 'prefix', //tell angular how to parse the redirect. prefix - takes a look at the path, combined with parent path and checks if the the url entered into a browser STARTS WITH the combined path. with full it checks that the entire url MATCHES that path.
    //so if we, for example, change the main domain route to redirect to users/u1 instead of showing no tasks component and set to prefix, we will get an error because every path starts with '', so its possible infinite redirect loop
    //so we set it to full, meaning that nothing can come after the ''  for that route to become active.
  },
  {
    path: 'tasks', //domain/users/u1/tasks
    component: TasksComponent,
    runGuardsAndResolvers: 'always', //this will make the resolver trigger on query params change, as well as running the resolvers if nothing in the route changes, but we have a navigation change trigger
    resolve: {
      //we will get userId from the route by input binding
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new', //domain/users/u1/tasks/new
    canDeactivate: [canLeaveEditPage],
    component: NewTaskComponent,
  },
];
