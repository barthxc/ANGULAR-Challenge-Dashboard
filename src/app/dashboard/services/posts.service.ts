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

  deletePostsByUser(userId: string) {
    const postsToDelete = this.postsSignal().filter(
      (post) => post.authorId === userId
    );

    postsToDelete.forEach((post) => {
      this.http.delete(`${this.baseUrl}/posts/${post.id}`).subscribe(() => {
        this.postsSignal.update((postsList) =>
          postsList.filter((p) => p.id !== post.id)
        );
      });
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

  getTopPostsByComments() {
    return this.postsSignal()
      .sort((a, b) => b.comments - a.comments)
      .slice(0, 3)
      .map((post) => ({ id: post.id, title: post.title }));
  }
}
