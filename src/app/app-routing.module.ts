import { NgModule } from '@angular/core';

import { PostsComponent }      from './components/posts/posts.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: PostsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
