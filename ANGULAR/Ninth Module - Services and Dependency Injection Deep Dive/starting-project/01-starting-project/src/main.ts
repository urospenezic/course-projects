import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
//import { TasksService } from './app/tasks/tasks.service';
//import { InjectionToken } from '@angular/core';

//const TaskServiceToken = new InjectionToken<TasksService>('task-service-token');//by default, the DI token used for inject(TokenName) is the class name itself, but we can change it to anything we want
bootstrapApplication(AppComponent).catch((err) => console.error(err));
// bootstrapApplication(AppComponent, {
//   providers: [{provide: TaskServiceToken, useClass: TasksService}],//without the custom token, we would just use [TasksService]. but we can specify the entire DI stuff by creating an object that angular would either way create for us.
// }).catch((err) => console.error(err));