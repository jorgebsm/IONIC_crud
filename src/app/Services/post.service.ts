import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from "../../environments/environment";
import { Post } from '../Models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  API = `${environment.API}/posts`;

  constructor(
    private http: HttpClient
  ) { }

  getPosts() {
    return this.http.get<Post[]>(this.API);
  }

  getPostById(id: string) {
    return this.http.get<Post>(`${this.API}/${id}`);
  }

  createPost(title: string, description: string) {
    return this.http.post<Post[]>(this.API, {
      title,
      description,
    });
  }

  deletePost(id: string) {
    return this.http.delete<Post>(`${this.API}/${id}`);
  }

  updatePost(id: string, post: Post) {
    return this.http.put(`${this.API}/${id}`, post);
  }


}
