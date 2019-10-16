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
import { Bucket } from 'src/app/filters/services/interfaces';
import { getCountryCode } from '../services/countryList.helper';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [ChartMathodsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent extends ParentChart implements OnInit {
  constructor(
    cms: ChartMathodsService,
    private readonly cdr: ChangeDetectorRef
  ) {
    super(cms);
  }

  ngOnInit(): void {
    this.init('map');
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
        type: 'logarithmic',
        minColor: axisColorForMap.minColor,
        maxColor: axisColorForMap.maxColor,
        stops: [
          [0, axisColorForMap.minColor],
          [0.67, axisColorForMap.midColor],
          [1, axisColorForMap.maxColor]
        ]
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
            pointFormat: '{point.name}: <b>{point.value} Technologys</b><br/>',
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
