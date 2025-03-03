import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @Input() title: string = '';
  @Input() chartType: 'bar' | 'pie' | 'radial' = 'bar';
  @Input() dataChart: { name: string; value: number }[] = [];
  @Input() xAxisLabel: string = '';

  @Input() chartDataInfo!: {
    dataType: 'user' | 'post' | 'reset';
    data: { name: string; value: number }[];
    title: string;
    xAxisLabel: string;
  };

  @Output() itemSelected = new EventEmitter<{
    dataType: 'user' | 'post' | 'reset';
    id: string;
    title: string;
    xAxisLabel: string;
  }>();

  getIdFromObjName(name: string): string {
    return name.split('-')[0];
  }

  view: [number, number] = [700, 400];

  ngOnInit(): void {
    this.updateChartView();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateChartView();
  }

  updateChartView() {
    const width = window.innerWidth;
    if (width <= 350) {
      this.view = [250, 200];
    } else if (width <= 550) {
      this.view = [300, 200];
    } else if (width <= 850) {
      this.view = [500, 300];
    } else {
      this.view = [700, 400];
    }
  }

  onSelect(event: { name: string; value: number }) {
    if (this.chartDataInfo.dataType === 'reset') {
      return;
    }

    const id = this.getIdFromObjName(event.name);
    this.itemSelected.emit({
      dataType: this.chartDataInfo.dataType,
      id,
      title: this.title,
      xAxisLabel: this.xAxisLabel,
    });
  }

  resetChartData() {
    this.itemSelected.emit({
      dataType: 'reset',
      id: '',
      title: this.title,
      xAxisLabel: this.xAxisLabel,
    });
  }
}
