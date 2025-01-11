import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | import('@angular/router').UrlTree> {
    return this.authService.role.pipe(
      map(role => {
        if (role === 'admin') {
          return true;
        } else {
          return this.router.createUrlTree(['/']);
        }
      })
    );
  }
}
