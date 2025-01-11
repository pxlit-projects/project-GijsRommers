import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  username = new BehaviorSubject<string | null>(null);
  role = new BehaviorSubject<string | null>(null);

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

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
