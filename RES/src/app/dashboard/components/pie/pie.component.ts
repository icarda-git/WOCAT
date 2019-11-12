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
import { SelectService } from 'src/app/filters/services/select/select.service';
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
  providers: [ChartMathodsService,SelectService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieComponent extends ParentChart implements OnInit {
  constructor(
    cms: ChartMathodsService,
    private readonly cdr: ChangeDetectorRef,
    public readonly selectService: SelectService,
    public readonly store: Store<fromStore.AppState>,
  ) {
    super(cms, selectService, store);
  }

  ngOnInit(): void {
    this.init('pie');
    this.buildOptions.subscribe((buckets: Array<Bucket>) => {
      if (buckets) {
        this.chartOptions = this.setOptions(buckets);
      }
      this.cdr.detectChanges();
    });
  }

  private setOptions(buckets: Array<Bucket>): Highcharts.Options {
    return {
      chart: {
        type: 'pie',
        animation: true,
      },
      boost: {
        enabled: true,
        useGPUTranslations: true,
      },
      plotOptions: {
        series: {
          point: {
            events: {
              click: this.setQ(),
            }
          }
        },
        pie: {
          cursor: 'pointer',
          showInLegend: true,
          tooltip: {
            pointFormat: ' <b>{point.y}</b>',
            headerFormat: '{point.key}:',
          },
          dataLabels: {
            enabled: false,
          },
        },
      },
      series: [
        {
          animation: true,
          type: 'pie',
          data: buckets.map((b: Bucket) => ({ name: b.key.substr(0, 50), y: b.doc_count })),
        },
      ],
      ...this.cms.commonProperties(),
    };
  }
}
