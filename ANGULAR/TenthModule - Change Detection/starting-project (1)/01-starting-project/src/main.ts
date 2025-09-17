import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch((err) => console.error(err));

//for ZONELESS:
/*
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

at this point (after angular 18) it might be provideZonelessChangeDetection

bootstrapApplication(AppComponent, {
  providers: [provideExperimentalZonelessChangeDetection()],
}).catch((err) => console.error(err));
*/
