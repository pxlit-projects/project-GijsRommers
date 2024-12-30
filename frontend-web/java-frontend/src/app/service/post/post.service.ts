import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getFilteredPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/filtered`);
  }

  getPostById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  reviewPost(postId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/review/${postId}`);
  }
}
