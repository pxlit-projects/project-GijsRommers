import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../service/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout'], {
      username: new BehaviorSubject<string | null>('testUser'),
      role: new BehaviorSubject<string | null>('admin'),
    });
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: { params: {}, queryParams: {} },
    });

    await TestBed.configureTestingModule({
      imports: [MatButtonModule, MatToolbarModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set username and role on init', () => {
    expect(component.username).toBe('testUser');
    expect(component.role).toBe('admin');
  });

  it('should navigate to login on logout', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle null username and role', () => {
    authService.username.next(null);
    authService.role.next(null);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.username).toBeNull();
    expect(component.role).toBeNull();
  });
});
