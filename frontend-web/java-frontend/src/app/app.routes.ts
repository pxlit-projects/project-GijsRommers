import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {authGuard} from './guard/auth/auth.guard';
import {PostDetailComponent} from './components/post-detail/post-detail.component';
import {AddPostComponent} from './components/add-post/add-post.component';
import {adminGuard} from './guard/admin/admin.guard';
import {ReviewPostComponent} from './components/review-post/review-post.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {EditPostComponent} from './components/edit-post/edit-post.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'post/:id', component: PostDetailComponent, canActivate: [authGuard] },
  { path: 'add-post', component: AddPostComponent, canActivate: [adminGuard] },
  { path: 'edit-post/:id', component: EditPostComponent, canActivate: [adminGuard] },
  { path: 'review-post', component: ReviewPostComponent, canActivate: [adminGuard] },
  { path: '**', component: NotFoundComponent }

];
