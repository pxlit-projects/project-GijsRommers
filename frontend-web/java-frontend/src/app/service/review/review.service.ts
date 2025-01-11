import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RejectionModel } from '../../models/Rejection.model';
import {Review} from '../../models/Review.model';
import {Post} from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = `${environment.apiUrl}/reviews`;

  constructor(private http: HttpClient) {}

  getReviews(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}`);
  }

  approveReview(postId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/approve/${postId}`, {});
  }

  rejectReview(postId: string, review: RejectionModel): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/reject/${postId}`, review);
  }

  getReviewByPostId(postId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/${postId}`);
  }
}
