import { interval, map, Observable } from 'rxjs'; //https://rxjs.dev/api
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import {
  Component,
  inject,
  DestroyRef,
  OnInit,
  signal,
  effect,
  computed,
} from '@angular/core';
//rxJs operators are functions that transform the data emitted by an observable, we can pipe them into observable to manipulate the data
//subjects, unlike observables have to manually emit values

/*signals are values in containers. observables are values over time (streams of values)
you have to subsribe to observables and read all of the value changes, whilst that is optional for signals, you can just read em once if you want (or use computed to setup a subscription)
SO IN SHORT: OBSERVABLES ARE FOR MANAGING EVENTS, STREAMED DATA AND REQUESTS. SIGNALS ARE GREAT FOR APP STATE MANAGEMENT.

we can also convert between the two, for example, we can convert an observable to a signal by using the toSignal operator (or wise versa via toObservable)
*/
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  //custom observable
  customInterval$ = new Observable((subscriber) => {
    let timesExectued = 0;
    const interval = setInterval(() => {
      subscriber.next(Math.random()); //will invoke the next method the subscriber has passed in with any value we want
      timesExectued++;
      if (timesExectued > 5) {
        clearInterval(interval); //clear the interval
        subscriber.complete(); //will invoke the complete method the subscriber has passed in. subscribers can then unsubscribe from the observable
      }
    }, 1000);
  });

  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount); //convert signal to observable (we can subscribe to it in a constructor or onInit)
  doubleClickCount = computed(() => this.clickCount() * 2);
  interval$ = interval(1000); //setup an observable
  intervalSignal = toSignal(this.interval$, { initialValue: 0 }); //convert observable to signal. KEEP IN MIND THAT THIS WILL NOT HAVE AN INITIAL VALUE BY DEFAULT, YOU HAVE TO SET IT UP MANUALLY WITH A CONFIGURATION OBJECT
  //if using toSignal on an observable, the angular will automatically unsubscribe from the observable when the component is destroyed (we do not have to manually unsubscribe)

  constructor() {
    effect(() => {
      //as mentioned in the prev module, effect is a function that will be called when any of the signals change
      console.log(this.clickCount());
    });
  }

  ngOnInit(): void {
    //signal example

    //this will always start, no matter if we're using a signal anywhere or not (unlike an observable). also, we have manually keep track of multiple signals to make this work for this example, but map in observables does that for us
    setInterval(() => {
      this.clickCount.update((count) => count + 1);
    }, 1000);

    //signal as observable
    const signalSubscription = this.clickCount$.subscribe((count) => {
      console.log(count);
    });

    //observable example
    const intervalObservable = interval(1000); //this will lay dormant until we subscribe to it
    const subscription = intervalObservable
      .pipe(
        map((count) => count * 2) //map is an rxjs operator (will execute after each emmited value) in this case if you look at the console you will see the values are doubled after each tick
      )
      .subscribe((count) => {
        //subscribe takes up to 3 arguments: next, error, complete (by default, next is the only one)
        console.log(count);
      });

    //observable as signal
    const intervalSignal = computed(() => console.log(this.intervalSignal())); //this will be called when the intervalSignal changes

    this.destroyRef.onDestroy(() => {
      console.log('destroy');
      subscription.unsubscribe();
      signalSubscription.unsubscribe();
    });

    // intervalObservable.subscribe({
    //   next: (value) => {
    //     console.log(value);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    //   complete: () => {
    //     console.log('complete');
    //   },
    // });
  }

  onClick() {
    this.clickCount.update((count) => count + 1);
  }
}
