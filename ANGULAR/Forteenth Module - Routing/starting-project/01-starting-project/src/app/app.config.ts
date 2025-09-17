import { ApplicationConfig } from '@angular/core';
import { routes } from './routes';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always', //setting this to always will make child routes inherit the parent route's parameters (NOW IN THE TASKS COMPONENT, WE CAN ACCESS THE USER ID FROM THE PARENT ROUTE)
      })
    ), //component input binding is a feature that allows us to bind component inputs to the route segment. it is the most straight forward way to do it.
  ],
};
