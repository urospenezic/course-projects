import { HttpEvent, HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { BusyService } from '../services/busy-service';
import { inject } from '@angular/core';
import { delay, finalize, of, tap } from 'rxjs';

const cache = new Map<string, HttpEvent<unknown>>();

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  const generateCacheKey = (url: string, params: HttpParams) => {
    return params
      ? url +
          '?' +
          params
            .keys()
            .map((key) => `${key}=${params.get(key)}`)
            .join('&')
      : url;
  };
  const cacheKey = generateCacheKey(req.url, req.params);

  if (req.method === 'GET') {
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
      // Return cached response with proper Observable timing to trigger async pipes
      return of(cachedResponse).pipe(delay(1));
    }
  }

  busyService.busy();
  return next(req).pipe(
    delay(500),
    tap((response) => {
      if (req.method === 'GET' && response) {
        cache.set(cacheKey, response);
      }
    }),
    finalize(() => busyService.idle())
  );
};

export function clearInterceptorCache(): void {
  cache.clear();
}
