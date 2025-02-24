import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'generic-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnChanges {
  @Input() data: Array<{ id?: string; [key: string]: any }> = [];
  @Input() toGo!: string;

  @Input() deleteAction?: (id: string) => void;

  constructor(private router: Router, private route: ActivatedRoute) {}

  displayedColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data.length > 0) {
      this.displayedColumns = Object.keys(this.data[0]);
      this.displayedColumns.push('actions');
    }
  }

  goToElement(id?: string) {
    const route = id ? [this.toGo, id] : [this.toGo];
    this.router.navigate(route, { relativeTo: this.route.parent });
  }
}
