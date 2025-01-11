import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { PostService } from '../../service/post/post.service';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Post } from '../../models/post.model';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute} from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let postService: jasmine.SpyObj<PostService>;

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getPosts', 'getFilteredPosts']);
    postServiceSpy.getPosts.and.returnValue(of([]));
    postServiceSpy.getFilteredPosts.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all posts on init', () => {
    const posts: Post[] = [{ id: 1, title: 'Test Post', content: 'Test Content', author: 'testUser' }];
    postService.getPosts.and.returnValue(of(posts));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.posts).toEqual(posts);
  });

  it('should filter posts based on form values', () => {
    const filteredPosts: Post[] = [{ id: 2, title: 'Filtered Post', content: 'Filtered Content', author: 'filteredUser' }];
    postService.getFilteredPosts.and.returnValue(of(filteredPosts));

    component.filterForm.setValue({ content: 'Filtered', author: 'filteredUser', date: '' });
    component.onFilter();
    fixture.detectChanges();

    expect(component.posts).toEqual(filteredPosts);
  });

  it('should load all posts if filter form is empty', () => {
    const posts: Post[] = [{ id: 1, title: 'Test Post', content: 'Test Content', author: 'testUser' }];
    postService.getPosts.and.returnValue(of(posts));

    component.filterForm.setValue({ content: '', author: '', date: '' });
    component.onFilter();
    fixture.detectChanges();

    expect(component.posts).toEqual(posts);
  });

  it('should clear filter and load all posts', () => {
    const posts: Post[] = [{ id: 1, title: 'Test Post', content: 'Test Content', author: 'testUser' }];
    postService.getPosts.and.returnValue(of(posts));

    component.clearFilter();
    fixture.detectChanges();

    expect(component.filterForm.value).toEqual({ content: '', author: '', date: '' });
    expect(component.posts).toEqual(posts);
  });

  it('should track posts by id', () => {
    const post: Post = { id: 1, title: 'Test Post', content: 'Test Content', author: 'testUser' };
    const trackById = component.trackByPost(0, post);

    expect(trackById).toBe(post.id);
  });
});
