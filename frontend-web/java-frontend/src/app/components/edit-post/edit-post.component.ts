import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../service/post/post.service';
import { Post } from '../../models/post.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  standalone: true,
  imports: [
    MatCard,
    MatError,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatCheckbox,
    MatButton,
    MatLabel
  ],
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: [{ value: ''}, Validators.required],
      content: ['', [Validators.required, Validators.minLength(10)]],
      isDraft: [false]
    });
  }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.postService.getPostById(postId).subscribe((data: Post) => {
        this.postForm.patchValue(data);
      });
    }
    this.authService.username.subscribe(username => {
      if (username) {
        this.postForm.patchValue({ author: username });
      }
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const post: Post = this.postForm.value;
      const postId = this.route.snapshot.paramMap.get('id');
      if (postId) {
        this.postService.updatePost(postId, post).subscribe(() => {
          this.router.navigate(['/add-post']);
        });
      }
    }
  }
}
