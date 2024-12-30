import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string | null>(null);
  private role = new BehaviorSubject<string | null>(null);

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
