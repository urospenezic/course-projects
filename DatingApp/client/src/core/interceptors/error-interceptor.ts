import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core/primitives/di';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ToastService } from '../services/toast-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastService);
  return next(req).pipe(
    catchError((error) => {
      if (error) {
        switch (error.status) {
          case 400: //validation error
            if (error.error.errors) {
              //server returns errors like this (array of key/value pairs):
              const modalStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modalStateErrors.push(error.error.errors[key]);
                }
              }
              throw modalStateErrors.flat();
            } else {
              toast.error(error.error);
            }
            break;
          case 401:
            console.error(error);
            toast.error('Unauthorized access');
            break;
          case 404:
            console.error(error);
            toast.error('Not found');
            break;
          case 500:
            console.error(error);
            const navigationExtras = { state: { error: error.error } };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            console.error(error);
            toast.error('Something unexpected went wrong');
            break;
        }
      }
      return throwError(() => new Error('Something bad happened; please try again later.'));
    })
  );
};
