import { Component } from '@angular/core';
import { PostService } from '../../service/post/post.service';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';
import {HeaderComponent} from '../header/header.component';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  standalone: true,
  imports: [
    MatCard,
    MatFormField,
    MatInput,
    FormsModule,
    MatCheckbox,
    MatButton,
    MatLabel,
    HeaderComponent
  ],
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  post: Post = { title: '', content: '', author: '', isDraft: false };

  constructor(private postService: PostService, private router: Router, private authService: AuthService) {
    this.post.author = this.authService.username.value ?? 'defaultUsername'; ;
  }

  onSubmit() {
    this.postService.createPost(this.post).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
