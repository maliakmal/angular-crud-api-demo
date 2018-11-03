import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../../models/post.model'
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) {}
  getPosts(){
    let url = environment.url;
    return this.http.get(url);
  }

  createPost(post){
    let url = environment.url;
    return this.http.post(url, { data: post });
  }

  updatePost(post){
    let url = environment.url+'/'+post.id;
    return this.http.put(url, { data: post });
  }

  deletePost(post){
    let url = environment.url+'/'+post.id;
    return this.http.delete(url);
  }

}
