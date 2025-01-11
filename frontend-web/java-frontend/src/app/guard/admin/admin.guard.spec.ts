import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';
import { adminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let guard: adminGuard;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], { role: new BehaviorSubject<string | null>(null) });
    const routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        adminGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    guard = TestBed.inject(adminGuard);
  });

  it('allows access for admin role', (done) => {
    authService.role.next('admin');

    guard.canActivate().subscribe(result => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('redirects non-admin role to root', (done) => {
    authService.role.next('user');
    const urlTree = router.createUrlTree(['/']);
    router.createUrlTree.and.returnValue(urlTree);

    guard.canActivate().subscribe(result => {
      expect(result).toBe(urlTree);
      done();
    });
  });

  it('handles empty role', (done) => {
    authService.role.next('');

    guard.canActivate().subscribe(result => {
      expect(result).toBe(router.createUrlTree(['/']));
      done();
    });
  });

  it('handles null role', (done) => {
    authService.role.next(null);

    guard.canActivate().subscribe(result => {
      expect(result).toBe(router.createUrlTree(['/']));
      done();
    });
  });
});
