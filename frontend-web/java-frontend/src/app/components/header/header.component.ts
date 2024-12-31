import { Component } from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    MatButton,
    MatToolbar
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username: string | null = "";
  role: string | null = "";
  constructor(private authService: AuthService, private router: Router) {
  }



  ngOnInit(): void {
    this.authService.username.subscribe(username => {
      this.username = username;
    });
    this.authService.role.subscribe(role => {
      this.role = role;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
