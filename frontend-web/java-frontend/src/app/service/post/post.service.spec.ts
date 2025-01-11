import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Post } from '../../models/post.model';
import { provideHttpClient } from '@angular/common/http';

describe('PostService', () => {
  let service: PostService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve posts via GET', () => {
    const mockPosts: Post[] = [
      { id: 1, title: 'Post 1', content: 'Content 1', author: 'author1' },
      { id: 2, title: 'Post 2', content: 'Content 2', author: 'author2' }
    ];

    service.getPosts().subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should retrieve filtered posts via GET', () => {
    const content = 'Content 1';
    const author = 'author1';
    const date = '2023-01-01';
    const mockPosts: Post[] = [
      { id: 1, title: 'Post 1', content: 'Content 1', author: 'author1' }
    ];

    service.getFilteredPosts(content, author, date).subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });

    const encodedContent = encodeURIComponent(content);
    const encodedAuthor = encodeURIComponent(author);
    const encodedDate = encodeURIComponent(date);

    const req = httpTestingController.expectOne(`${service['baseUrl']}/filtered?content=${encodedContent}&author=${encodedAuthor}&date=${encodedDate}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should retrieve a post by ID via GET', () => {
    const postId = '1';
    const mockPost: Post = { id: 1, title: 'Post 1', content: 'Content 1', author: 'author1' };

    service.getPostById(postId).subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}/${postId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  it('should create a post via POST', () => {
    const newPost: Post = { id: 3, title: 'Post 3', content: 'Content 3', author: 'author3' };

    service.createPost(newPost).subscribe();

    const req = httpTestingController.expectOne(`${service['baseUrl']}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newPost);
    req.flush({});
  });

  it('should retrieve user posts via GET', () => {
    const username = 'author1';
    const mockPosts: Post[] = [
      { id: 1, title: 'Post 1', content: 'Content 1', author: 'author1' }
    ];

    service.getUserPosts(username).subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}/user/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should update a post via PATCH', () => {
    const postId = '1';
    const updatedPost: Post = { id: 1, title: 'Updated Post 1', content: 'Updated Content 1', author: 'author1' };

    service.updatePost(postId, updatedPost).subscribe();

    const req = httpTestingController.expectOne(`${service['baseUrl']}/${postId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedPost);
    req.flush({});
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
