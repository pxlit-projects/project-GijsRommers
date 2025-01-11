import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../service/post/post.service';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../service/comment/comment.service';
import { AuthService } from '../../service/auth/auth.service';
import {HeaderComponent} from '../header/header.component';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    DatePipe,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatLabel
  ],
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  comments: Comment[] = [];
  newComment: Comment = { id: 0, userName: '', content: '', postId: 0, createdAt: new Date(), updatedAt: new Date() };
  currentUserName: string | null = '';
  editingComment: Comment | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    if (postId) {
      this.newComment.postId = postId;
      this.postService.getPostById(postId.toString()).subscribe((data: Post) => {
        this.post = data;
      });
      this.commentService.getCommentsByPostId(postId.toString()).subscribe((data: Comment[]) => {
        this.comments = data;
      });
    }

    this.authService.username.subscribe(username => {
      if (username) {
        this.currentUserName = username;
        this.newComment.userName = username;
      }
    });
  }

  trackByComment(index: number, comment: Comment | null): number {
    return comment ? comment.id : index;
  }

  onSubmit(): void {
    this.commentService.addComment(this.newComment).subscribe(() => {
      this.newComment.content = '';
      this.commentService.getCommentsByPostId(this.newComment.postId.toString()).subscribe((data: Comment[]) => {
        this.comments = data;
      });
    });
  }

  editComment(comment: Comment): void {
    this.editingComment = { ...comment };
  }

  isEditing(comment: Comment): boolean {
    return this.editingComment?.id === comment.id;
  }

  cancelEdit(): void {
    this.editingComment = null;
  }

  onEditSubmit(comment: Comment): void {
    this.commentService.updateComment(comment).subscribe(() => {
      const index = this.comments.findIndex(c => c.id === comment.id);
      if (index !== -1) {
        this.comments[index] = { ...comment };
      }
      this.editingComment = null;
    });
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter(comment => comment.id !== commentId);
    });
  }
}
