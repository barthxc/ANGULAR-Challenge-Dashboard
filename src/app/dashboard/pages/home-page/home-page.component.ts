import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { PostsService } from '../../services/posts.service';
import { CommentsService } from '../../services/comments.service';
import { UserResponse } from '../../interfaces/interfaces';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
    private commentsService: CommentsService,
  ) {}

  topUsersPost: any[] = [];
  topUsersComment: any[] = [];
  topPosts: any[] = [];
  users: UserResponse[] = [];
  usersPostData = this.usersService.usersSignal().map((user) => ({
    name: `${user.id}-${user.name}`,
    value: user.posts,
  }));

  chartDataInfo: {
    dataType: 'user' | 'post' | 'reset';
    data: { name: string; value: number }[];
    title: string;
    xAxisLabel: string;
  } = {
    dataType: 'user',
    data: this.usersPostData,
    title: 'Usuarios y sus comentarios',
    xAxisLabel: 'Usuarios',
  };

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

  ngOnInit(): void {
    this.topUsersPost = this.usersService.getTopUsersByPosts();
    this.topUsersComment = this.usersService.getTopUsersByComments();
    this.topPosts = this.postsService.getTopPostsByComments();
    this.users = this.usersService.usersSignal();
  }

  onChartItemSelected($event: {
    dataType: 'user' | 'post' | 'reset';
    id: string;
    title: string;
    xAxisLabel: string;
  }) {
    if (this.chartDataInfo.dataType === 'user') {
      this.chartDataInfo = {
        dataType: 'post',
        data: this.postsService
          .postsSignal()
          .filter((post) => post.authorId === $event.id)
          .map((post) => ({
            name: `${post.id}-${post.title}`,
            value: post.comments,
          })),
        title: `Post del usuario ${$event.id}`,
        xAxisLabel: 'Posts',
      };
    } else if (this.chartDataInfo.dataType === 'post') {
      this.chartDataInfo = {
        dataType: 'reset',
        data: this.commentsService
          .commentsSignal()
          .filter((comment) => comment.postId === $event.id)
          .map((comment) => ({
            name: `${comment.id}-${comment.text}`,
            value: +comment.postId,
          })),
        title: `Comentarios del post ${$event.id}`,
        xAxisLabel: 'Comentarios',
      };
    } else if (this.chartDataInfo.dataType === 'reset') {
      this.chartDataInfo = {
        dataType: 'user',
        data: this.usersPostData,
        title: 'Usuarios y sus comentarios',
        xAxisLabel: 'Usuarios',
      };
    } else {
      console.error('Tipo de datos desconocido:', this.chartDataInfo.dataType);
    }
  }
}
