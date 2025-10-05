import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Nav } from '../layout/nav/nav';
import { AccountService } from '../core/services/account-service';
import { User } from '../types/user';
import { Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Nav, RouterOutlet, NgClass],
})
export class App implements OnInit {
  protected router = inject(Router);
  private readonly accountService = inject(AccountService);
  protected readonly title = signal('Dating app');
  private readonly httpClient = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  protected members = signal<User[]>([]);

  ngOnInit(): void {
    this.setCurrentUser();
    //this.members.set(await this.getMembers() as any[]);
    const request = this.httpClient.get<User[]>('https://localhost:7241/api/members').subscribe({
      next: (response) => this.members.set(response),
      error: (err) => console.log(err),
      complete: () => console.log('Request completed'),
    });

    this.destroyRef.onDestroy(() => {
      request.unsubscribe();
    });
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) {
      return;
    }
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
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
