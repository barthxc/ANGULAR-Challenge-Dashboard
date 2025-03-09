import { LocalDataService } from './../../services/local-data.service';
import { Component } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  templateUrl: './comments-page.component.html',
  styleUrls: ['./comments-page.component.css'],
})
export class CommentsPageComponent {
  constructor(
    private comentsService: CommentsService,
    private dialogService: DialogService,
    private localDataService: LocalDataService
  ) {}
  coments = this.comentsService.commentsSignal();

  deleteComent = (comentId: string) => {
    this.dialogService.openDialog(
      'Eliminar post',
      '¿Seguro que quieres eliminar el post?',
      'Eliminar',
      'Cancelar',
      () => {
        this.localDataService.deleteComment(comentId);
      },
      'Se ha eliminado el comentario correctamente',
      'success'
    );
  };
}
