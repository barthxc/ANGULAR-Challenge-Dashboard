import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  constructor(private router: Router) {}

  @Input() title: string = '';
  @Input() data: Array<{ id?: string; [key: string]: any }> = [];
  @Input() routerName: string = '';
  @Input() haveHead: boolean = true;

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  // test(item: any, routerName: string) {
  //   if (!item.id) return;
  //   this.router.navigate([routerName, item.id]);
  // }
}
