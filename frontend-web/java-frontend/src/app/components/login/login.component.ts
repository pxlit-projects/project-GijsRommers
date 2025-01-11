import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { MatOption, MatSelect } from '@angular/material/select';
import { LoginModel } from '../../models/login.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css'],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelect,
    MatOption
]
})
export class LoginComponent {
  loginData: LoginModel = { username: '', role: '' };

  constructor(protected authService: AuthService, private router: Router) {}

  login() {
    if (this.loginData.username && this.loginData.role) {
      this.authService.login(this.loginData.username, this.loginData.role);
      this.router.navigate(['/']);
    } else {
      console.error('Username and role must not be empty');
    }
  }
}
