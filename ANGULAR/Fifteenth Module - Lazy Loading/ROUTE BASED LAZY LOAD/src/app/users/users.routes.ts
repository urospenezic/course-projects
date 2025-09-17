import { Routes } from '@angular/router';
//EVERY IMPORT ACTUALLY JUST LOADS UP THE CODE UPFRONT, EVEN IF WE DON'T USE IT (so we remove tasks component from here)
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
import {
  NewTaskComponent,
  canLeaveEditPage,
} from '../tasks/new-task/new-task.component';
import { TasksService } from '../tasks/tasks.service';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tasks',
        providers: [TasksService], //PROVIDE THE SERVICE HERE, SO IT IS AVAILABLE FOR THE ENTIRE ROUTE GROUP LAZY LOADED (THIS WORKS BECAUSE WE ARE LAZY LOADING THE ENTIRE ROUTE GROUP (THIS FILE))
        component: TasksComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage],
      },
    ],
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  //INSTEAD OF THIS, WE CAN LAZY LOAD THE SUBTEE WITH PROVIDERS SET SO THAT WE LAZY LOAD THE SERVICE TOO
  // {
  //   //EVERY COMPONENT REFERENCE ACTUALLY JUST LOADS UP THE CODE UPFRONT, EVEN IF WE DON'T USE IT
  //   //lazy load the tasks component
  //   path: 'tasks', // <your-domain>/users/<uid>/tasks
  //   component: TasksComponent,
  //   //WE ARE LAZY LOADING THE ENTIRE ROUTE GROUP (THIS FILE)
  //   // loadComponent: () =>
  //   //   import('../tasks/tasks.component').then(
  //   //     (module) => module.TasksComponent
  //   //   ),
  //   runGuardsAndResolvers: 'always',
  //   //resolver is still importing the tasks component file, so we have to work around it (we could just paste the code for the component here) (OR JUST LAZY LOAD THE ENTIRE ROUTE GROUP (THIS FILE))
  //   resolve: {
  //     userTasks: resolveUserTasks,
  //   },
  // },
  // {
  //   path: 'tasks/new',
  //   component: NewTaskComponent,
  //   canDeactivate: [canLeaveEditPage],
  // },
];
