import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {HttpClient } from '@angular/common/http';
import { environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postList: AngularFireList<any>;

  path  = environment.path;

  constructor(private db: AngularFireDatabase, private http: HttpClient) { }
  // getPost(post) {
  //  return this.db.list('/posts').push(post);
  // }

  // getPost(posts) {
  //   this.postList.push({
  //     postTitle: posts.postTitle,
  //     postBody: posts.postBody
  //   });
  // }

  sendPost(postForm) {
    return this.http.post(this.path, postForm);
  }

  getPost() {
    return this.http.get(this.path);
  }

  getPostById(id) {
    const url = `${this.path}/${id}`;
    return this.http.get(url);
  }

  deletePost(id) {
    const url = `${this.path}/${id}`;
    return this.http.delete(url );
  }

  updatePost(id: any, updatePostForm) {
    const url = `${this.path}/${id}`;
    return this.http.put(url, updatePostForm );
  }
}
