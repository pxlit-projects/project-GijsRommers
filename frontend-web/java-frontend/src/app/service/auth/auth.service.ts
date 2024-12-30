// src/app/service/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string | null>(null);
  private role = new BehaviorSubject<string | null>(null);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get currentUsername() {
    return this.username.asObservable();
  }

  get currentRole() {
    return this.role.asObservable();
  }

  login(username: string, role: string) {
    this.loggedIn.next(true);
    this.username.next(username);
    this.role.next(role);
  }

  logout() {
    this.loggedIn.next(false);
    this.username.next(null);
    this.role.next(null);
  }
}
