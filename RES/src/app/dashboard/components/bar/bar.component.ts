import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ParentChart } from '../parent-chart';
import { ChartMathodsService } from '../services/chartCommonMethods/chart-mathods.service';
import {
  ResetCaller,
  BuildQueryObj,
  ElasticsearchQuery
} from 'src/app/filters/services/interfaces';
import { RangeService } from 'src/app/filters/services/range/range.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../store';
import { BarService } from './services/bar/bar.service';
import { UpdateCallerBarChart } from '../list/paginated-list/filter-paginated-list/types.interface';
import { map } from 'rxjs/operators';
import { SelectService } from 'src/app/filters/services/select/select.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  providers: [ChartMathodsService, RangeService, BarService, SelectService, Store],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarComponent extends ParentChart implements OnInit {
  chart: Highcharts.Chart;

  constructor(
    cms: ChartMathodsService,
    private readonly rangeService: RangeService,
    public readonly barService: BarService,
    private readonly cdr: ChangeDetectorRef,
    public readonly selectService: SelectService,
    readonly store: Store<fromStore.AppState>
  ) {
    super(cms, selectService, store);
    this.rangeService.storeVal = this.store;
  }

  ngOnInit() {
    const {
      source: [firstBarFilterSource, secondBarFilterSource],
      source
    } = this.componentConfigs;
    this.rangeService.sourceVal = (source as Array<string>).reduce(
      (prev: string, curr: string) => (curr.includes('year') ? curr : undefined)
    );
    this.init('column', this.getYears.bind(this));
    this.barService.init(
      this.rangeService,
      this.store
        .select(fromStore.getQueryFromBody)
        .pipe(map((query: object) => !!query)),
      firstBarFilterSource,
      secondBarFilterSource
    );
    this.buildOptions.subscribe(
      this.barService.yearsComposer(this.rangeService.sourceVal)
    );
    this.barService.setChartOptinos.subscribe(
      (series: Array<Highcharts.SeriesColumnOptions>) => {
        if (series) {
          this.chartOptions = this.setOptions(series);
          if (this.chart) {
            this.updateChart();
          }
        }
        this.cdr.detectChanges();
      }
    );
    this.store.select(fromStore.getQuery).subscribe((query) => {
      setTimeout(() => {
        this.barService.getData(UpdateCallerBarChart.BarChartNgSelect);
      }, 500);
    
    })
  }

  handleChartInstance(e: Highcharts.Chart): void {
    this.chart = e;
  }

  onChange(val: Array<string | number>): void {
    this.barService.getData(UpdateCallerBarChart.BarChartNgSelect);
  }

  private getYears(caller?: ResetCaller): void {
    const qb: BuildQueryObj = {
      size: 100000
    };
    this.rangeService
      .getYears(this.rangeService.buildquery(qb).build() as ElasticsearchQuery)
      .subscribe();
  }

  private updateChart(): void {
    this.chart.update(
      {
        ...this.chartOptions,
        series: [...this.chartOptions.series]
      },
      true,
      true,
      true
    );
  }

  private setOptions(
    series: Array<Highcharts.SeriesColumnOptions>
  ): Highcharts.Options {
    return {
      chart: { type: 'column' },
      xAxis: { type: 'category', crosshair: true },
      boost: {
        enabled: true,
        useGPUTranslations: true
      },
      yAxis: { min: 0, title: { text: 'Technologys' } },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          borderRadius: 2.5
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      series: [...series],
      ...this.cms.commonProperties()
    };
  }
}
