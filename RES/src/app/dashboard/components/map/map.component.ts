import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ChartMathodsService } from '../services/chartCommonMethods/chart-mathods.service';
const mapWorld = require('@highcharts/map-collection/custom/world-robinson-highres.geo.json');
import * as Highcharts from 'highcharts';
import { axisColorForMap, selectMapColors } from 'src/configs/chartColors';
import { ParentChart } from '../parent-chart';
import { Bucket, QueryFilterAttribute } from 'src/app/filters/services/interfaces';
import { getCountryCode } from '../services/countryList.helper';
import { SelectService } from 'src/app/filters/services/select/select.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../store';
import { ComponentFilterConfigs, ComponentDashboardConfigs } from 'src/configs/generalConfig.interface';
import { BodyBuilderService } from 'src/app/filters/services/bodyBuilder/body-builder.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [ChartMathodsService, SelectService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent extends ParentChart implements OnInit {
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

  ngOnInit(): void {
    this.init('map');
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
  resetFilter(value:boolean = false) {
    this.resetQ()
  }

  private setOptions(buckets: Array<Bucket>): Highcharts.Options {
    return {
      chart: {
        map: mapWorld,
        animation: false
      },
      boost: {
        enabled: true,
        useGPUTranslations: true
      },
      mapNavigation: {
        enabled: true,
        enableMouseWheelZoom: true,
        buttonOptions: {
          alignTo: 'spacingBox',
          verticalAlign: 'bottom'
        }
      },
      colorAxis: {
        min: 1,
        max: 100,
        type: 'logarithmic',
        minColor: axisColorForMap.minColor,
        maxColor: axisColorForMap.maxColor,
        stops: [
          [0, axisColorForMap.minColor],
          [0.67, axisColorForMap.midColor],
          [1, axisColorForMap.maxColor]
        ]
      },
      plotOptions: {
        series: {
          point: {
            events: {
              click: this.setQ(),
            }
          }
        }
      },
      series: [
        {
          type: 'map',
          data: buckets.map((b: Bucket) => [
            getCountryCode(b.key),
            b.doc_count
          ]),
          mapData: mapWorld,
          showInLegend: true,
          showInNavigator: true,
          cursor: 'pointer',
          enableMouseTracking: true,
          allowPointSelect: true,
          tooltip: {
            pointFormat: '{point.name}: <b>{point.value} SLM Data</b><br/>',
            headerFormat: undefined
          },
          animation: {
            duration: 0
          },
          states: {
            hover: {
              color: selectMapColors.hover
            },
            select: {
              color: selectMapColors.select.color,
              borderColor: selectMapColors.select.borderColor
            }
          }
        }
      ],
      ...this.cms.commonProperties()
    } as Highcharts.Options;
  }
}
