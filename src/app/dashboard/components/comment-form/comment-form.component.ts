import { Component, Input } from '@angular/core';
import { CommentResponse } from '../../interfaces/interfaces';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent {
  @Input() comment: CommentResponse = {
    id: '',
    text: '',
    userId: '',
    postId: '',
  };
}
