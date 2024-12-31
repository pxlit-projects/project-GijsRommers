import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {Post} from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }
  getFilteredPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/filtered`);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`);
  }

  createPost(post: Post): Observable<void> {
    return this.http.post<void>(this.baseUrl, post);
  }
}
