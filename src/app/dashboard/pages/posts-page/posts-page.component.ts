import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { DialogService } from '../../services/dialog.service';
import { ToastService } from '../../services/toast.service';

@Component({
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css'],
})
export class PostsPageComponent {
  constructor(
    private postsService: PostsService,
    private dialogService: DialogService,
    private toastService: ToastService
  ) {}

  posts = this.postsService.postsSignal();

  deletePost = (postId: string) => {
    this.dialogService.openDialog(
      'Eliminar post',
      '¿Seguro que quieres eliminar el post?',
      'Eliminar',
      'Cancelar',
      () => {
        this.postsService.deletePost(postId);
      },
      'Se ha eliminado el post correctamente',
      'success'
    );
  };

  updatePost = (userId: string) => {
    console.log('Actualizar post', userId);
  };

  createPost = () => {
    console.log('Crear nuevo post');
  };
}
