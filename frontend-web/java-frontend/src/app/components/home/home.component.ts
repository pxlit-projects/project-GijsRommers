import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post/post.service';
import { Post } from '../../models/post.model';
import { DatePipe } from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    DatePipe,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatCardSubtitle,
    MatCardHeader,
    MatButton
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
    });
  }

  trackByPost(index: number, post: Post): number {
    return post.id;
  }
}
