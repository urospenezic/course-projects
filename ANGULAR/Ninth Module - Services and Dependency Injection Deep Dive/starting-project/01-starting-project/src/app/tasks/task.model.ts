import { InjectionToken, Provider } from '@angular/core';

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export const TaskStatusOptions: {
  //we want to be able to inject this into components, like we would inject a service.
  //for this, we need the justom injector with DI Token (like the one in main ts thats commented out), but we need this one to be available to only those components that need it, which are just task components, so not the entire app.
  //the top level component for tasks  is tasks-list component
  taskStatus: TaskStatus;
  value: 'open' | 'in-progress' | 'done';
  text: string;
}[] = [
  { taskStatus: 'OPEN', value: 'open', text: 'Open' },
  { taskStatus: 'IN_PROGRESS', value: 'in-progress', text: 'In-Progress' },
  { taskStatus: 'DONE', value: 'done', text: 'Completed' },
];

//token thats going to be used for injection. NOTE THE NAMING CONVENTION.
export const TASK_STATUS_OPTIONS = new InjectionToken<{
  taskStatus: TaskStatus;
  value: 'open' | 'in-progress' | 'done';
  text: string;
}[]>('task-status-options');

export const taskStatusOptionsProvider: Provider = {
  //provider that can be passed into providers array of a component
  provide: TASK_STATUS_OPTIONS,
  useValue: TaskStatusOptions,
};
