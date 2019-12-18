import * as Highcharts from 'highcharts';
import {
  LegendNavigationColors,
  legendTextColorForPie,
  chartValuesColors
} from 'src/configs/chartColors';

export class ChartHelper {
  protected chartType: any;

  commonProperties(): Highcharts.Options {
    return {
      title: {
        text: undefined
      },
      responsive: {
        rules: this.responsiveRules()
      },
      colors: chartValuesColors,
      credits: {
        enabled: false
      },
      legend: this.legendAttributes()
    };
  }

  private legendAttributes(): Highcharts.LegendOptions {
    return {
      itemStyle: {
        color: legendTextColorForPie
      },
      enabled: true,
      layout: 'horizontal',
      floating: this.chartType === 'map',
      align: this.chartType === 'pie' ? 'right' : 'center',
      verticalAlign:
        this.chartType === 'map' || this.chartType === 'column'
          ? 'bottom'
          : 'middle',
      navigation: {
        activeColor: LegendNavigationColors.activeColor,
        animation: true,
        arrowSize: 12,
        inactiveColor: LegendNavigationColors.inactiveColor,
        style: {
          fontWeight: 'bold',
          color: LegendNavigationColors.style.color,
          fontSize: '12px'
        }
      } as Highcharts.LegendNavigationOptions
    };
  }

  private responsiveRules(): Highcharts.ResponsiveRulesOptions[] {
    return [
      {
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            enabled: false
          }
        }
      } as Highcharts.ResponsiveRulesOptions
    ];
  }
}
