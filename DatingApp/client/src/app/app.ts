import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('Dating app');
  private readonly httpClient = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  protected members = signal<any[]>([]);

  ngOnInit() : void {
    //this.members.set(await this.getMembers() as any[]);
    const request = this.httpClient.get('https://localhost:7241/api/members').subscribe({
      next: (response) => this.members.set(response as any[]),
      error: (err) => console.log(err),
      complete: () => console.log('Request completed'),
    });

    this.destroyRef.onDestroy(() => {
      request.unsubscribe();
    });
  }

  // async getMembers() {
  //   try{
  //     return lastValueFrom(this.httpClient.get('https://localhost:7241/api/members'));
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  // }
}
