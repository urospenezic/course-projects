import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { InitService } from '../core/services/init-service';
import { lastValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),
    provideAppInitializer(async () => {
      const initService = new InitService();
      return new Promise<void>((resolve) => {
        setTimeout(async () => {
          try {
            await lastValueFrom(initService.init());
          } catch (error) {
            console.error('Error during app initialization:', error);
          } finally {
            const splash = document.getElementById('initial-splash');
            if (splash) {
              splash.remove();
              resolve();
            }
          }
        }, 1000);
      });
    }),
  ],
};
