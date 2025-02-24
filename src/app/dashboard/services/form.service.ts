import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsersService } from './users.service';
import { PostsService } from './posts.service';
import { CommentsService } from './comments.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private postsService: PostsService,
    private commentsService: CommentsService
  ) {}

  //TODO: Reviser el código y crear las funciones de los servicios
  // getFormForEntity(type: string, data?: any): FormGroup {
  //   let formGroup: any = {};

  //   // Generar FormControls dinámicamente basados en los datos
  //   if (data) {
  //     Object.keys(data).forEach((key) => {
  //       formGroup[key] = [data[key]];
  //     });
  //   }

  //   return this.fb.group(formGroup);
  // }

  // getDataForEntity(type: string, id: string) {
  //   switch (type) {
  //     case 'user':
  //       return this.usersService.getUserById(id);
  //     case 'post':
  //       return this.postsService.getPostById(id);
  //     case 'comment':
  //       return this.commentsService.getCommentById(id);
  //     default:
  //       return null;
  //   }
  // }
}
