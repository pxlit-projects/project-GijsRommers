import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '../../models/post.model';
import { ReviewService } from '../../service/review/review.service';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';
import { RejectDialogComponent } from '../reject-dialog/reject-dialog.component';
import { RejectionModel } from '../../models/Rejection.model';

@Component({
  selector: 'app-review-post',
  templateUrl: './review-post.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatCardContent,
    MatCardHeader,
    MatCard,
    MatCardTitle,
    MatCardActions,
    MatButton,
    HeaderComponent
  ],
  styleUrls: ['./review-post.component.css']
})
export class ReviewPostComponent implements OnInit {
  posts: Post[] = [];

  constructor(private reviewService: ReviewService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.reviewService.getReviews().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  approvePost(postId: number): void {
    this.reviewService.approveReview(postId.toString()).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== postId);
    });
  }

  openRejectDialog(postId: number): void {
    const dialogRef = this.dialog.open(RejectDialogComponent, {
      width: '250px',
      data: { postId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rejectPost(postId, result);
      }
    });
  }

  rejectPost(postId: number, reason: string): void {
    const reviewRequest: RejectionModel = {
      postId,
      username: 'currentUsername', // Replace with actual username
      comment: reason
    };
    this.reviewService.rejectReview(postId.toString(), reviewRequest).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== postId);
    });
  }
}
