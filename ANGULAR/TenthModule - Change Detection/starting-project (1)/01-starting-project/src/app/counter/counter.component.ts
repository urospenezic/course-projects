import {
  ChangeDetectionStrategy,
  Component,
  inject,
  NgZone,
  OnInit,
  signal,
} from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';
//*** IMPORTANT: TO DISABLE ZONE IF USING SIGNALS ONLY, WE DO THAT IN ANGULAR.JSON BY MAKING SURE THAT POLYFILLS IS EMPTY AND THEN IN MAIN TS WE HAVE TO IMPORT provideExperimentalZonelessChangeDetection from @angular/core */

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,//signal changes will also cause change detection to run even with on push strategy, 
})
export class CounterComponent implements OnInit {
  count = signal(0);//signals notify angular if the value has changed, so there is no need to use a zone. SO IF WE ONLY EVER USE SIGNALS (and event binding like: (click)="onIncrement()" ih html), WE CAN GET RID OF ZONE AND GO ZONELESS
  private zone = inject(NgZone);

  ngOnInit(): void {
    setTimeout(() => {
      this.count.set(0);//with no zone, timers are no longer going to be tracked, but because we're setting a signal inside of this timer tick, it doesnt really matter, the code relying on this signal will still work
    }, 4000);

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        //this timer expiring should not trigger a change detection cycle because the count is not changing - but it does
        //zone detection does not know what's in this timeout - it only knows that the timer expired and thus it will trigger a change detection cycle
        //so we have to run this outside the angular zone to avoid this
        console.log('timer expired');
      }, 5000);
    });
  }

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
