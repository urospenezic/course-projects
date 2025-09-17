import {
  Component,
  OnDestroy,
  OnInit,
  inject,
  DestroyRef,
  signal,
  effect,
} from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('unknown'); //ts notation for a union type, currentStatus can be one of the three values
  private interval?: ReturnType<typeof setInterval>; //NodeJS.Timeout is the return type of setInterval, but npm might complain about it, so we use ReturnType to specify the return type of setInterval
  private destroyRef = inject(DestroyRef); // we can setup a listener via this object that will trigger right before the component is destroyed. it is useful for when i do not want to declare properties for the component, but rather watch the lifecycle and kill something i declared in a method
  constructor() {
    effect(() => {
      //IMPORTANT: EFFECT TRIGGERS ON EVERY CHANGE OF THE SIGNAL, SO IT'S A WAY TO LISTEN TO SIGNAL CHANGES IN CODE BEHIND
      console.log('currentStatus', this.currentStatus());
    });
    //for cleanup after on effect, we can return a function that will be called when the effect is destroyed. so this will cleanup before the next effect is called
    effect((onCleanup) => {
      //const tasks = getTasks(); call some function here
      const timer = setTimeout(() => {
        //console.log(`Current number of tasks: ${tasks().length}`);
      }, 1000);
      onCleanup(() => {
        clearTimeout(timer);
      });
    });
  } //its good practice to keep the constructor minimal and clean, only doing base initialization stuff

  ngOnInit() {
    //will be called when the component is initialized by default
    console.log('Component and its @inputs have been initialized!');
    const interval = setInterval(() => {
      //simulate a server status change
      const statuses = ['online', 'offline', 'unknown'];
      this.currentStatus.set(
        statuses[Math.floor(Math.random() * statuses.length)] as
          | 'online'
          | 'offline'
          | 'unknown'
      );
    }, 2000);
    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });

    // this.interval = interval;

    this.destroyRef.onDestroy(() => {
      clearTimeout(interval);
    });
  }

  ngOnDestroy() {
    // if (this.interval) {
    //   clearTimeout(this.interval);
    // }
    console.log('Component and its @inputs have been destroyed!');
  }
}
