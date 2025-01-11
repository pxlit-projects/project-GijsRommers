import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login a user', () => {
    const username = 'testUser';
    const role = 'admin';

    service.login(username, role);

    service.isLoggedIn().subscribe(loggedIn => {
      expect(loggedIn).toBeTrue();
    });

    service.username.subscribe(name => {
      expect(name).toBe(username);
    });

    service.role.subscribe(userRole => {
      expect(userRole).toBe(role);
    });
  });

  it('should logout a user', () => {
    service.logout();

    service.isLoggedIn().subscribe(loggedIn => {
      expect(loggedIn).toBeFalse();
    });

    service.username.subscribe(name => {
      expect(name).toBeNull();
    });

    service.role.subscribe(userRole => {
      expect(userRole).toBeNull();
    });
  });

  it('should return the logged in status', () => {
    const loggedIn$ = service.isLoggedIn();
    expect(loggedIn$).toBeInstanceOf(Observable);
  });
});
