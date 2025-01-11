import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [
    HeaderComponent,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatButton,
    RouterLink,
    MatCardTitle
  ],
  templateUrl: './not-found.component.html',
  standalone: true,
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
