import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { PostsService } from './posts.service';
import { CommentsService } from './comments.service';
import {
  CommentResponse,
  PostResponse,
  UserResponse,
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
    private commentsService: CommentsService
  ) {}

  emptyUser: UserResponse = {
    id: '',
    name: '',
    posts: 0,
    comments: 0,
  };

  emptyPost: PostResponse = {
    id: '',
    title: '',
    authorId: '',
    comments: 0,
  };

  emptyComment: CommentResponse = {
    id: '',
    text: '',
    userId: '',
    postId: '',
  };

  // Bind sirve para que otro servicio tenga acceso a dicha función y NO a su contexto. Así que la puede ejecutar correctamente
  getEntityService(type: string, id: string) {
    switch (type) {
      case 'user':
        return {
          service: this.usersService,
          editFunction: this.usersService.editUser.bind(this.usersService),
          data: this.usersService.usersSignal().find((data) => data.id === id),
        };
      case 'post':
        return {
          service: this.postsService,
          editFunction: this.postsService.editPost.bind(this.postsService),
          data: this.postsService.postsSignal().find((data) => data.id === id),
        };
      case 'comment':
        return {
          service: this.commentsService,
          editFunction: this.commentsService.editComment.bind(
            this.commentsService
          ),
          data: this.commentsService
            .commentsSignal()
            .find((data) => data.id === id),
        };
      default:
        return null;
    }
  }

  getCreateEntityService(type: string) {
    switch (type) {
      case 'user':
        return {
          service: this.usersService,
          createFunction: this.usersService.newUser.bind(this.usersService),
          data: this.emptyUser,
        };
      case 'post':
        return {
          service: this.postsService,
          createFunction: this.postsService.newPost.bind(this.postsService),
          data: this.emptyPost,
        };
      case 'comment':
        return {
          service: this.commentsService,
          createFunction: this.commentsService.newComment.bind(
            this.commentsService
          ),
          data: this.emptyComment,
        };
      default:
        return null;
    }
  }
}
