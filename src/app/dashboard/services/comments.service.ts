import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { enviroments } from 'src/environments/environments';
import { CommentResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private baseUrl = enviroments.baseLocalUrl;
  commentsSignal = signal<CommentResponse[]>([]);

  constructor(private http: HttpClient) {}

  getComments() {
    this.http
      .get<CommentResponse[]>(`${this.baseUrl}/comments`)
      .subscribe((comments) => {
        this.commentsSignal.set(comments);
      });
  }

  newComment(comment: CommentResponse) {
    this.http
      .post<CommentResponse>(`${this.baseUrl}/comments`, comment)
      .subscribe((newComment) => {
        this.commentsSignal.update((comments) => [...comments, newComment]);
      });
  }

  deleteComment(commentId: string) {
    this.http.delete(`${this.baseUrl}/comments/${commentId}`).subscribe(() => {
      this.commentsSignal.update((comments) =>
        comments.filter((comment) => comment.id !== commentId)
      );
    });
  }

  deleteCommentsByUser(userId: string) {
    const commentsToDelete = this.commentsSignal().filter(
      (comment) => comment.userId === userId
    );

    commentsToDelete.forEach((comment) => {
      this.http
        .delete(`${this.baseUrl}/comments/${comment.id}`)
        .subscribe(() => {
          this.commentsSignal.update((postsList) =>
            postsList.filter((c) => c.id !== comment.id)
          );
        });
    });
  }

  editComment(commentId: string, updatedComment: CommentResponse) {
    this.http
      .patch<CommentResponse>(
        `${this.baseUrl}/comments/${commentId}`,
        updatedComment
      )
      .subscribe(() => {
        this.commentsSignal.update((comments) =>
          comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, ...updatedComment }
              : comment
          )
        );
      });
  }
}
