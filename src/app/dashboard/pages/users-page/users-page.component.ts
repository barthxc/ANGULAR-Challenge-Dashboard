import { LocalDataService } from './../../services/local-data.service';
import { DialogService } from './../../services/dialog.service';
import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent {
  constructor(
    private usersService: UsersService,
    private dialogService: DialogService,
    private localDataService: LocalDataService
  ) {}

  users = this.usersService.usersSignal();

  deleteUser = (userId: string) => {
    this.dialogService.openDialog(
      'Eliminar usuario',
      '¿Seguro que quieres eliminar el usuario?',
      'Eliminar',
      'Cancelar',
      () => {
        this.localDataService.deleteUserAndPosts(userId);
      },
      'Se ha eliminado el usuario correctamente',
      'success'
    );
  };

  updateUser = (userId: string) => {
    console.log('Actualizar usuario', userId);
  };

  createUser = () => {
    console.log('Crear nuevo usuario');
  };
}
