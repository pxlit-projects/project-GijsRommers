import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
import { authGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let guard: authGuard;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        authGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    guard = TestBed.inject(authGuard);
  });

  it('allows access when user is logged in', (done) => {
    authService.isLoggedIn.and.returnValue(of(true));

    guard.canActivate().subscribe(result => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('redirects to login when user is not logged in', (done) => {
    authService.isLoggedIn.and.returnValue(of(false));
    const urlTree = router.createUrlTree(['/login']);
    router.createUrlTree.and.returnValue(urlTree);

    guard.canActivate().subscribe(result => {
      expect(result).toBe(urlTree);
      done();
    });
  });

  it('handles observable error by redirecting to login', (done) => {
    authService.isLoggedIn.and.returnValue(throwError(() => new Error('Error')));
    const urlTree = router.createUrlTree(['/login']);
    router.createUrlTree.and.returnValue(urlTree);

    guard.canActivate().subscribe(result => {
      expect(result).toBe(urlTree);
      done();
    });
  });
});
