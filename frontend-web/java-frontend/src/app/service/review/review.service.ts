import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RejectionModel } from '../../models/Rejection.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = `${environment.apiUrl}/reviews`;

  constructor(private http: HttpClient) {}

  getReviews(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  approveReview(postId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/approve/${postId}`, {});
  }

  rejectReview(postId: string, review: RejectionModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/reject/${postId}`, review);
  }

  getReviewByPostId(postId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${postId}`);
  }
}
