import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {Comment} from '../../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {}

  getCommentsByPostId(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/post/${postId}`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.baseUrl, comment);
  }
  updateComment(comment: Comment): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${comment.id}`, { content: comment.content });
  }
}
