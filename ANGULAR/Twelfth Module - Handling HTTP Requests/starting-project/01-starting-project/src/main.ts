import { bootstrapApplication } from '@angular/platform-browser';
import {
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { tap } from 'rxjs';

//HTTP INTERCEPTORS (called whenever a requst is about to be sent out)
function loggingInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  console.log('[OUTGOING REQUEST]', {
    url: request.url,
    method: request.method,
    body: request.body,
    headers: request.headers,
  });
  //we can clone and mutate the request here, like adding a header
  // const req = request.clone({
  //   headers: request.headers.set('X-DEBUG-HEADER', 'TESTING!'),
  // });
  // console.log('[MODIFIED REQUEST]', {
  //   url: req.url,
  //   method: req.method,
  //   body: req.body,
  //   headers: req.headers,
  // });
  return next(request).pipe(
    //tap into observable so that we can log the response as well
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log('[INCOMING RESPONSE]', {
          status: event.status,
          statusText: event.statusText,
          body: event.body,
        });
      }
    })
  );
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor]))],
}).catch((err) => console.error(err));
