import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {HttpClient } from '@angular/common/http';
import { environment} from '../environments/environment';
import {Posts } from './models/post';
import {Postdetail} from './models/postdetail';

import {shareReplay} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postList: AngularFireList<any>;

  path  = environment.path;
  API_KEY = 'https://api.unsplash.com/photos/random?client_id=136222c8b132b74883244565206f1d148f687eb7042057ff429cec534d55d822';
  posts$: Observable<Posts[]>;

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


  sendPost(id: any, postForm) {
    const url = `${this.path + '/post'}/${id}`;
    return this.http.post(url, postForm);
  }

  getPost(): Observable<Posts[]> {
    if (!this.posts$) {
      this.posts$ = this.http.get<Posts[]>(this.path + '/post').pipe(shareReplay(1));
    }
    return this.posts$;
  }

  getPostById(id) {
    const url = `${this.path + '/post'}/${id}`;
    return this.http.get<Postdetail[]>(url);
  }

  getPostsByUserId(id) {
    const url = `${this.path + '/post' + '/user'}/${id}`;
    return this.http.get(url);
  }

  deletePost(id) {
    const url = `${this.path + '/post'}/${id}`;
    return this.http.delete(url );
  }
// updatePost
  updatePost(id: any, updatePostForm) {
    const url = `${this.path + '/post'}/${id}`;
    return this.http.put(url, updatePostForm );
  }

// commenting system
  sendComment(id: any, commentForm) {
    const url = `${this.path + '/comment'}/${id}`;
    return this.http.post(url, commentForm);
  }

  getComment(id) {
    const url = `${this.path + '/comments'}/${id}`;
    return this.http.get(url);
  }

  getCommentsCountById(id) {
    const url = `${this.path + '/comments' + '/count'}/${id}`;
    return this.http.get(url);
  }

  getSingleImage() {
    return this.http.get(this.API_KEY);
  }
}
