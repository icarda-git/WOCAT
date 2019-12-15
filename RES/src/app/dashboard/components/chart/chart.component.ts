import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';
import * as Highcharts from 'highcharts';
import wordCloudModule from 'highcharts/modules/wordcloud';
import ExportingModule from 'highcharts/modules/exporting';
import BoostModule from 'highcharts/modules/boost';
import MapModule from 'highcharts/modules/map';
wordCloudModule(Highcharts);
ExportingModule(Highcharts);
MapModule(Highcharts);
BoostModule(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {
  @Input() isMap = false;
  @Input() title: string;
  @Input() description: string;
  @Input() expandedStatus: boolean;
  @Input() userSeesMe: boolean;
  @Input() loading: boolean;
  @Input() loadingHits$: Observable<boolean>;
  @Input() chartOptions: Highcharts.Options;
  @Output() expanded: EventEmitter<boolean>;
  @Output() chartInstance: EventEmitter<Highcharts.Chart>;
  @Output() resetFilter: EventEmitter<boolean>;
  @ViewChild('clickToEnable') clickToEnable: ElementRef;
  @Input() filterd = false;
  Highcharts = Highcharts;
  constructor() {
    this.expanded = new EventEmitter<boolean>();
    this.resetFilter = new EventEmitter<boolean>();
    this.chartInstance = new EventEmitter<Highcharts.Chart>();
  }

  notifyFilter(): void {
    this.resetFilter.emit(true);
  }

  

  notifyExpanded(b: boolean): void {
    this.expanded.emit(b);
  }

  hideClickToEnable(): void {
    this.clickToEnable.nativeElement.hidden = true;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (this.clickToEnable) {
      // pie and worldcould do not have this
      this.clickToEnable.nativeElement.hidden = false;
    }
  }

  logChartInstance(e: Highcharts.Chart): void {
    this.chartInstance.emit(e);
  }
}
