import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { PostsService } from './posts.service';
import { CommentsService } from './comments.service';
import { UserResponse } from '../interfaces/interfaces';
import { PostResponse } from '../interfaces/interfaces';

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

  createUserAndPosts(user: UserResponse, posts: PostResponse[]) {
    this.usersService.newUser(user);
    posts.forEach((post) => this.postsService.newPost(post));
  }

  deleteUserAndPosts(userId: string) {
    this.postsService.deletePostsByUser(userId);
    this.commentsService.deleteCommentsByUser(userId);
    this.usersService.deleteUser(userId);
  }

  editUserAndPosts(
    userId: string,
    updatedUser: UserResponse,
    posts: PostResponse[]
  ) {
    this.usersService.editUser(userId, updatedUser);
    posts.forEach((post) => this.postsService.editPost(post.id, post));
  }
}
