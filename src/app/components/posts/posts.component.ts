import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import { Post } from '../../models/post.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  postForm = this.formBuilder.group({
    userId: ['', [Validators.required]],
    title: ['', [Validators.required]],
    body: ['', [Validators.required]]
  });
  
  private posts;
  private currentPost;
  private postIdxToDelete;
  isSubmitted = false;


  constructor(private postService:PostService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.currentPost = null;
    this.posts = [];
    this.postIdxToDelete = null;
    this.loadPosts();
  }

  clearCurrentPost(){
    this.currentPost = null;
    this.isSubmitted = false;
  }

  isCurrentEditablePost(){
    if(this.currentPost===null){
      return false;
    }

    if((this.currentPost.id <= 0)|| (typeof(this.currentPost.id)=='undefined')){
      return false;
    }

    return true;
  }

  isCurrentPost(){
    if(!this.currentPost){
      return false;
    }

    return true;
  }
  
  onSubmit(){

  }

  savePost(){
    this.isSubmitted = true;
    if(this.isCurrentEditablePost()){
      this.updatePost();
    }else{
      this.createPost();
    }
  }

  newPost() {
    var _post = new Post(0, '', '');
    this.currentPost = _post;
  }

  createPost() {
    var _self = this;
    this.postService.createPost(this.currentPost).subscribe(
    response =>{
      _self.currentPost.id = _self.posts.length + 1;
      _self.posts.unshift(_self.currentPost);
      _self.clearCurrentPost();
    },
    err => console.log(err),
    () => console.log('Created Post')
    )
  }

  editPost(post) {
    this.currentPost = post;
  }

  deletePost(idx){
    this.postIdxToDelete = idx;
  }

  isCurrentDeletablePost(){
    if(this.postIdxToDelete === null){
      return false;
    }

    return true;
  }


  
  confirmDeletePost(){
    var _self = this;
    _self.postService.deletePost(_self.posts[_self.postIdxToDelete]).subscribe(
      response =>{
        _self.posts.splice(_self.postIdxToDelete, 1);
        _self.cancelDeletePost();
      },
      err => {
        console.log('Deleted from local - error when deleting from api');
        console.log(err);
        _self.posts.splice(_self.postIdxToDelete, 1);
        _self.cancelDeletePost();
      },
      () => console.log('Deleted')
    )
  }

  cancelDeletePost(){
    this.postIdxToDelete = null;
  }

  updatePost() {
    var _self = this;
    this.postService.updatePost(this.currentPost).subscribe(
      response => {
        _self.currentPost = response;
        _self.clearCurrentPost();
      },
      err => {
        _self.clearCurrentPost();
        console.log('Update completed locally - error when updating remotely');
        console.log(err);
      },
      () => console.log('Updated Post')
    )
  }

  loadPosts(){
    this.postService.getPosts().subscribe(
      data => {
        this.posts = data;
        this.posts.reverse();
      },
      err => console.error(err),
      () => console.log('Posts Loaded')
    );

  }
}
