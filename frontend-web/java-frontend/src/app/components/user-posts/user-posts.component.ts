import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post/post.service';
import { Post } from '../../models/post.model';
import { RouterLink} from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardSubtitle,
    MatCardTitle,
    RouterLink,
    DatePipe
  ],
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  posts: Post[] = [];
  currentUserName: string | null = '';

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.username.subscribe(username => {
      if (username) {
        this.currentUserName = username;
        this.postService.getUserPosts(username).subscribe((data: Post[]) => {
          this.posts = data;
        });
      }
    });
  }

replaceUnderscoreWithSpace(status: string | undefined): string {
  return (status || '').replace(/_/g, ' ');
}
}
