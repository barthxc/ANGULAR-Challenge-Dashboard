import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityService } from '../../services/entity.service';
import {
  CommentResponse,
  PostResponse,
  UserResponse,
} from '../../interfaces/interfaces';

@Component({
  templateUrl: './element-by-id-page.component.html',
  styleUrls: ['./element-by-id-page.component.css'],
})
export class ElementByIdPageComponent implements OnInit {
  title: string = 'Editar ';
  data: UserResponse | PostResponse | CommentResponse | undefined = undefined;
  editFunction!:
    | ((userId: string, updatedUser: UserResponse) => void)
    | ((postId: string, updatedPost: PostResponse) => void)
    | ((commentId: string, updatedComment: CommentResponse) => void);

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      const entityType = segments[0]?.path;
      const entityId = segments[1]?.path;

      if (!entityType) return;

      const entity = this.entityService.getEntityService(entityType, entityId);
      if (entity) {
        this.title += ` ${entityType}`;
        this.data = entity.data;
        this.editFunction = entity.editFunction;
      }
    });
  }
}
