import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { PostsService } from './posts.service';
import { CommentsService } from './comments.service';
import { UserResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
    private commentsService: CommentsService
  ) {}

  fillSignals() {
    this.usersService.getUsers(),
      this.postsService.getPosts(),
      this.commentsService.getComments();
  }

  deleteUser(userId: string) {
    //Eliminamos lost Post del Usuario
    const userPosts = this.postsService
      .postsSignal()
      .filter((post) => post.authorId === userId);
    userPosts.forEach((post) => this.deletePost(post.id));

    //Eliminamos los comentarios del Usuario
    const userComments = this.commentsService
      .commentsSignal()
      .filter((coment) => coment.userId === userId);

    userComments.forEach((comment) => this.deleteComment(comment.id));

    this.usersService.deleteUser(userId);
  }

  deletePost(postId: string) {
    const post = this.postsService.postsSignal().find((p) => p.id === postId);
    if (!post) return;

    //Restar -1 a la cantidad de post del usuario
    this.usersService.updateUserPosts(post.authorId, -1);

    //Eliminar los comentarios del post
    const postComments = this.commentsService
      .commentsSignal()
      .filter((comment) => comment.postId === postId);
    postComments.forEach((comment) => this.deleteComment(comment.id));

    //Eliminar el post
    this.postsService.deletePost(postId);
  }

  deleteComment(commentId: string) {
    // Buscar el comentario por su ID
    const comment = this.commentsService
      .commentsSignal()
      .find((c) => c.id === commentId);
    if (!comment) return; // Si no se encuentra, salir de la función

    // Eliminar el comentario de la lista de comentarios
    this.commentsService.deleteComment(commentId);

    // Restar -1 al contador de comentarios del usuario que lo creó
    this.usersService.updateUserComments(comment.userId, -1);

    // Restar -1 al contador de comentarios del post donde estaba el comentario
    this.postsService.updatePostComments(comment.postId, -1);
  }
}
