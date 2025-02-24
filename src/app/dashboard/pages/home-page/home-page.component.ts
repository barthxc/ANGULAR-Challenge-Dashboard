import { Component, OnInit } from '@angular/core';
import { LocalDataService } from '../../services/local-data.service';
import { UsersService } from '../../services/users.service';
import { PostsService } from '../../services/posts.service';
import { CommentsService } from '../../services/comments.service';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
    private commentsService: CommentsService
  ) {}

  //TODO hacer toda aquí el filtrado: ?????

  topUsersPost: any[] = [];
  topUsersComment: any[] = [];
  topPosts: any[] = [];

  resume$ = [
    {
      label: 'Users',
      value: this.usersService.usersSignal().length,
    },
    {
      label: 'Comments',
      value: this.commentsService.commentsSignal().length,
    },
    {
      label: 'Posts',
      value: this.postsService.postsSignal().length,
    },
  ];

  //TODO : Crear métodos dentro del servicio para retornar la data. Tenerlo todo en el servicio

  ngOnInit(): void {
    this.topUsersPost = this.usersService.getTopUsersByPosts();

    this.topUsersComment = this.usersService.getTopUsersByComments();

    this.topPosts = this.postsService.getTopPostsByComments();
  }
}
