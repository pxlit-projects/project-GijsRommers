import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostService } from '../../service/post/post.service';
import { Post } from '../../models/post.model';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions, MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

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
    HeaderComponent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatLabel,
    MatCardContent
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  filterForm: FormGroup;

  constructor(private postService: PostService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      content: [''],
      author: [''],
      date: ['']
    });
  }

  ngOnInit(): void {
    this.loadAllPosts();
  }

  loadAllPosts(): void {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
    });
  }

  onFilter(): void {
    const { content, author, date } = this.filterForm.value;
    if (content || author || date) {
      this.postService.getFilteredPosts(content, author, date).subscribe((data: Post[]) => {
        this.posts = data;
      });
    } else {
      this.loadAllPosts();
    }
  }

  clearFilter(): void {
    this.filterForm.setValue({
      content: '',
      author: '',
      date: ''
    });
    this.loadAllPosts();
  }

  trackByPost(index: number, post: Post): number | undefined {
    return post.id;
  }
}
