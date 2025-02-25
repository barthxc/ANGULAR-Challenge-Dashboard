import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityService } from '../../services/entity.service';
import {
  CommentResponse,
  PostResponse,
  UserResponse,
} from '../../interfaces/interfaces';

@Component({
  templateUrl: './new-element-page.component.html',
  styleUrls: ['./new-element-page.component.css'],
})
export class NewElementPageComponent implements OnInit {
  title: string = 'Crear ';
  entityType: string = '';

  data!: UserResponse | CommentResponse | PostResponse;

  createFunction: any;

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      const entityType = segments[0]?.path;

      if (!entityType) return;

      const entity = this.entityService.getCreateEntityService(entityType);
      if (entity) {
        this.title += ` ${entityType}`;
        this.data = entity.data;
        this.createFunction = entity.createFunction;
      }
    });
  }
}
