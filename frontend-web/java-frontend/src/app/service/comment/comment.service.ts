import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {}

  getComments(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getCommentsByPostId(postId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/post/${postId}`);
  }

  getCommentById(commentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${commentId}`);
  }
}
