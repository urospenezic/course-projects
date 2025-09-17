import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUsername,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { userRoutes } from './users/user.routes';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = () => {
  //we can inject services into guards as well. they have to return a boolean value
  const router = inject(Router);
  const shouldGetAccess = Math.random() > 0.5;
  if (shouldGetAccess) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized')); //this will redirect to the unauthorized page
};
//by default, angular does not just load the component into the template, we have to define where to render routed components (CHECK APP COMPONENT HTML)
export const routes: Routes = [
  {
    path: '', //domain/
    component: NoTaskComponent,
    title: 'No tasks selected',
  },
  {
    path: 'users/:userId', //domain/users/u1 (:userId is a dynamic segment that can be used to access the user id, CHECK USER COMPONENT TO SEE HOW TO ACCESS IT)
    component: UserTasksComponent, //NOTE THE HTML OF USER TASKS COMPONENT HAS BEEN CHANGED TO USE NESTED ROUTES VIA ROUTER OUTLET
    //child routes do not get the id value from parent route for input route segmentation (you can only get path segments for the route that's directly linked to the component)
    //if we want this behavior to be set by default (child routes to have parent segment access), we have to set that in config by adding withRouterConfig() to provideRouter() function
    children: userRoutes,
    //guards:
    canMatch: [dummyCanMatch], //THERE ARE MULTIPLE OF THESE CAN DO SOMETHING GUARDS. THEY ALL SERVE A PURPOSE OF FORBIDDING CERTAIN ACTIONS
    title: resolveTitle, //dynamic title (that's the text displayed in the browser tab)
    data: {
      message: 'Some static data', //this is a static value that will be passed to the user tasks component
    },
    resolve: {
      //resolve can take up as many kvp as needed, so we can pass in multiple data properties with multiple resolvers
      //FOR DYNAMIC DATA, YOU PASS IN A FUNCTION THAT RESOLVES THE DATA (IF INPUT BINDING IS ENABLED, WE WILL AUTOMATICALLY GET THE DATA FROM THE RESOLVER IN OUR COMPONENT THAT HAS THE SAME INPUT NAME AS THIS KEY (username))
      //NOTE THAT RESOLVER WILL NOT TRIGGER ON QUERY PARAMS CHANGE, ONLY ROUTE CHANGES (WE HAVE TO CHANGE THAT BEHAVIOR, SEE USERS.ROUTES.TS)
      username: resolveUsername,
    },
    //EXPORTED TO USER ROUTES FILE FOR EASY MAINTENANCE
    //   {
    //     path: '', //domain/users/u1 (if no path is provided, it will redirect to tasks)
    //     redirectTo: 'tasks',
    //     pathMatch: 'prefix',//tell angular how to parse the redirect. prefix - takes a look at the path, combined with parent path and checks if the the url entered into a browser STARTS WITH the combined path. with full it checks that the entire url MATCHES that path.
    //     //so if we, for example, change the main domain route to redirect to users/u1 instead of showing no tasks component and set to prefix, we will get an error because every path starts with '', so its possible infinite redirect loop
    //     //so we set it to full, meaning that nothing can come after the ''  for that route to become active.
    //   },
    //   {
    //     path: 'tasks', //domain/users/u1/tasks
    //     component: TasksComponent,
    //   },
    //   {
    //     path: 'tasks/new', //domain/users/u1/tasks/new
    //     component: NewTaskComponent,
    //   },
    // ],
  },
  {
    path: '**', //domain/users/u1/tasks/new WILL BE SET IF NO OTHER ROUTE MATCHES THE URL
    component: NotFoundComponent,
  },
];
