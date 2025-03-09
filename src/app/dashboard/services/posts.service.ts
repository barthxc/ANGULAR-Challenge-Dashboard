import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { enviroments } from 'src/environments/environments';
import { PostResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private baseUrl = enviroments.baseLocalUrl;
  postsSignal = signal<PostResponse[]>([]);

  constructor(private http: HttpClient) {}

  //! CRUD
  getPosts() {
    this.http
      .get<PostResponse[]>(`${this.baseUrl}/posts`)
      .subscribe((posts) => {
        this.postsSignal.set(posts);
      });
  }

  newPost(post: PostResponse) {
    this.http
      .post<PostResponse>(`${this.baseUrl}/posts`, post)
      .subscribe((newPost) => {
        this.postsSignal.update((posts) => [...posts, newPost]);
      });
  }

  deletePost(postId: string) {
    this.http.delete(`${this.baseUrl}/posts/${postId}`).subscribe(() => {
      this.postsSignal.update((posts) => posts.filter((p) => p.id !== postId));
    });
  }

  editPost(postId: string, updatedPost: PostResponse) {
    this.http
      .patch<PostResponse>(`${this.baseUrl}/posts/${postId}`, updatedPost)
      .subscribe(() => {
        this.postsSignal.update((posts) =>
          posts.map((post) =>
            post.id === postId ? { ...post, ...updatedPost } : post
          )
        );
      });
  }

  //! TOP DATA
  getTopPostsByComments() {
    return this.postsSignal()
      .sort((a, b) => b.comments - a.comments)
      .slice(0, 3)
      .map((post) => ({ id: post.id, title: post.title }));
  }
  //! UpdatePostWithExtraData
  updatePostComments(postId: string, change: number) {
    this.postsSignal.update((posts) =>
      posts.map((post) =>
        post.id === postId
          ? { ...post, comments: post.comments + change }
          : post
      )
    );
  }
}
