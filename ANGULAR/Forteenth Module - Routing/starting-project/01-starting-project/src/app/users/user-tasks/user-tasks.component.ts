import { Component, computed, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { TasksService } from '../../tasks/tasks.service';
import { TasksComponent } from '../../tasks/tasks.component';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

//RESOLVER IS CALLED FOR EVERY NAVIGATION ACTION (because of that for example, we use the route snapshot instead of the real route, no need to subscribe to it)
//IT HAS TO BE OF TYPE RESOLVEFN AND TAKE EXACLTY THESE PARAMS TO BE CONSIDERED VALID
export const resolveUsername: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService); //WE CAN INJECT SERVICES INTO FUNCTIONS
  const username =
    usersService.users.find(
      (user) => user.id === activatedRoute.paramMap.get('userId')
    )?.name || '';
  return username;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const username = resolveUsername(activatedRoute, routerState);
  return `${username}'s Tasks`;
};

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  //SECOND WAY OF ACCESSING DATA FROM ROUTES (VIA ACTIVATED ROUTE):
  //NOTE THAT ACTIVATED ROUTE HAS A PROPERTY OF DATA, WHICH WE CAN USE TO EFFECTIVELY GET THE STATIC AND RESOLVER DATA VIA THIS METHOD IF NEEDED
  //another way of getting userId, if for some reason we cannot use input based route segmentation
  //we can use the route service to get the userId (activated route consists of a bunch of observables)
  //private route = inject(ActivatedRoute);
  //use the observable in ngOnInit, like:
  //const subscription = this.route.paramMap.subscribe((params) => {
  //  this.userId = params.get('userId');
  //});
  //subscription.unsubscribe() via destroyRef
  //NOTE THAT THIS route WE INJECTED HAS A SNAPSHOT AS WELL, NOT JUST PARAM MAP. DIFFERENCE IS THAT SNAPSHOP IS A SINGLE VALUE, NOT AN OBSERVABLE AND IT PROVIDES NORMAL VALUES INSTEAD OF OBSERVABLES, BUT THE DOWNSIDE IS THAT ITS NOT REACTIVE AT ALL

  //FIRST WAY OF ACCESSING DATA FROM ROUTES (INPUT BINDING):
  // private usersService = inject(UsersService);
  // userId = input.required<string>(); //in case the name matches the routed segment, and we've setup the input based route segmentation (CHECK app.config.ts). this will automatically be set to the value of the routed segment

  // username = computed(
  //   () =>
  //     this.usersService.users.find((user) => user.id === this.userId())?.name
  // );

  //THIRD WAY OF ACCESSING DATA FROM ROUTES (VIA RESOLVER + INPUT BINDING):
  message = input.required<string>(); //will be automatically set via the route data property specified in the routes config
  username = input.required<string>(); //will be automatically set via the route data property specified in the routes config

  //THIRD WAY OF ACCESSING DATA FROM ROUTES (SEE ROUTES.TS FOR SPECIFYING DATA):
  //via input binding:
  //userData = input.required<{ userId: string }>(); //this will be set to the value of the data property specified in the routes config

  //WITHOUT NESTED ROUTES:
  // private tasksService = inject(TasksService);
  // tasks = computed(() => {
  //   const tasks = this.tasksService.allTasks();
  //   return tasks.filter((task) => task.userId === this.userId());
  // });
}
