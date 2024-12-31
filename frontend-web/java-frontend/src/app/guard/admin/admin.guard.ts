import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { map } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.role.pipe(
    map(role => {
      if (role === 'admin') {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};
