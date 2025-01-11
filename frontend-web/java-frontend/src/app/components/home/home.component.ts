
import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { PostService } from '../../service/post/post.service';
import { Post } from '../../models/post.model';
import {MatButton} from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {DatePipe} from '@angular/common';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    MatButton,
    MatCardActions,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    RouterLink,
    DatePipe,
    HeaderComponent
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
    });
  }

  trackByPost(index: number, post: Post): number | undefined {
    return post.id;
  }
}
