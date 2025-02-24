import { PostsService } from './../../services/posts.service';
import { CommentsService } from './../../services/comments.service';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './element-by-id-page.component.html',
  styleUrls: ['./element-by-id-page.component.css'],
})
export class ElementByIdPageComponent implements OnInit {
  title: string = 'Editar ';

  data: any;

  editFunction: any;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private commentsService: CommentsService,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      switch (segments[0].path) {
        case 'user':
          this.title += ' Usuario';
          this.data = this.usersService
            .usersSignal()
            .find((user) => user.id === segments[1].path);
          this.editFunction = this.usersService.editUser;
          break;
        case 'coment':
          this.title += ' Comentario';
          break;
        case 'post':
          this.title += ' Post';
          break;
        default:
          break;
      }
    });

    console.log(`El usuario es ${JSON.stringify(this.data)}`);
  }
}
