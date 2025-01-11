import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../service/auth/auth.service';
import {provideRouter, Router} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatSelectModule,
        MatOptionModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home on successful login', () => {
    component.loginData = { username: 'testUser', role: 'admin' };
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call authService login with correct parameters', () => {
    component.loginData = { username: 'testUser', role: 'admin' };
    component.login();
    expect(authService.login).toHaveBeenCalledWith('testUser', 'admin');
  });

  it('should not navigate if loginData is empty', () => {
    component.loginData = { username: '', role: '' };
    component.login();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not call authService login if loginData is empty', () => {
    component.loginData = { username: '', role: '' };
    component.login();
    expect(authService.login).not.toHaveBeenCalled();
  });
});
