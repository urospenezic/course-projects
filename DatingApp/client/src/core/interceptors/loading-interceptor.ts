import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { BusyService } from '../services/busy-service';
import { inject } from '@angular/core';
import { delay, finalize, of, tap } from 'rxjs';

const cache = new Map<string, HttpEvent<unknown>>();

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  if (req.method === 'GET' && shouldCache(req.url)) {
    const cachedResponse = cache.get(req.url);
    if (cachedResponse) {
      // Return cached response with proper Observable timing to trigger async pipes
      return of(cachedResponse).pipe(delay(1));
    }
  }

  busyService.busy();
  return next(req).pipe(
    delay(500),
    tap((response) => {
      if (req.method === 'GET' && shouldCache(req.url) && response) {
        cache.set(req.url, response);
      }
    }),
    finalize(() => busyService.idle())
  );
};

function shouldCache(url: string): boolean {
  return url.includes('/members') && !url.includes('/members/') && !url.includes('/photos');
}

export function clearInterceptorCache(): void {
  cache.clear();
}
