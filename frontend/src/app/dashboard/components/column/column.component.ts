import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ChartMathodsService } from '../services/chartCommonMethods/chart-mathods.service';
import * as Highcharts from 'highcharts';
import { ParentChart } from '../parent-chart';
import { Bucket } from 'src/app/filters/services/interfaces';
import * as fromStore from '../../../../store';
import { Store } from '@ngrx/store';
import { XAxisOptions } from 'highcharts'
import { SelectService } from 'src/app/filters/services/select/select.service';
import { BodyBuilderService } from 'src/app/filters/services/bodyBuilder/body-builder.service';
import { ComponentFilterConfigs } from 'src/configs/generalConfig.interface';
@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  providers: [ChartMathodsService, SelectService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent extends ParentChart implements OnInit {
  constructor(
    cms: ChartMathodsService,
    private readonly cdr: ChangeDetectorRef,
    public readonly selectService: SelectService,
    public readonly store: Store<fromStore.AppState>,
    private readonly bodyBuilderService: BodyBuilderService
  ) {
    super(cms, selectService, store);
  }
  filterd = false;
  resetFilter(value: boolean = false) {
    this.resetQ()
  }
  ngOnInit(): void {
    this.init('column');
    const { source } = this.componentConfigs as ComponentFilterConfigs;
    this.buildOptions.subscribe((buckets: Array<Bucket>) => {
      let filters = this.bodyBuilderService.getFiltersFromQuery().filter(element => Object.keys(element).indexOf(source + '.keyword') != -1)
      if (filters.length)
        this.filterd = true;
      else
        this.filterd = false;
      if (buckets) {
        this.chartOptions = this.setOptions(buckets);
      }
      this.cdr.detectChanges();
    });
  }

  private setOptions(buckets: Array<Bucket>): Highcharts.Options {
    return {
      boost: {
        enabled: false,
        useGPUTranslations: false,
      },
      plotOptions: {
        series: {
          point: {
            events: {
              click: this.setQ(),
            }
          }
        },
      },
      chart: {
        inverted: true,
        polar: false
      },
      xAxis: {
        title: {
          text: "users in the area having adopted the technology"
        },
        categories: buckets.map((b: Bucket) => b.key.substr(0, 50)),
      } as XAxisOptions,
      yAxis: {
        title: {
          text: "Number of technologies"
        }
      } as XAxisOptions,
      series: [
        {
          name: 'Number of technologies',
          animation: true,
          type: 'column',
          colorByPoint: true,
          showInLegend: false,
          data: buckets.map((b: Bucket) => ({ name: b.key.substr(0, 50), y: b.doc_count })),
        },
      ],
      ...this.cms.commonProperties(),
    };
  }
}
