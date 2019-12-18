import { EventEmitter } from '@angular/core';
import {
  ComponentDashboardConfigs,
  MergedSelect,
  ComponentFilterConfigs
} from 'src/configs/generalConfig.interface';
import { ChartMathodsService } from './services/chartCommonMethods/chart-mathods.service';
import { Bucket, QueryFilterAttribute } from 'src/app/filters/services/interfaces';
import { ParentComponent } from 'src/app/parent-component.class';
import { SelectService } from 'src/app/filters/services/select/select.service';
import * as fromStore from '../../../store';
import { Store } from '@ngrx/store';
export class ParentChart extends ParentComponent {
  chartOptions: Highcharts.Options;
  protected buildOptions: EventEmitter<Array<Bucket> | MergedSelect>;
  constructor(public readonly cms: ChartMathodsService,
    public readonly selectService: SelectService,
    public readonly store: Store<fromStore.AppState>
  ) {
    super();
    this.buildOptions = new EventEmitter<Array<Bucket>>();
    this.chartOptions = {};
  }

  Query(name: any) {

    const { source } = this.componentConfigs as ComponentFilterConfigs;
    const query: bodybuilder.Bodybuilder = this.selectService.addNewValueAttributetoMainQuery(source, name);
    this.store.dispatch(new fromStore.SetQuery(query.build()));
    this.selectService.resetNotification();
  }
  resetQ() {
    const { source } = this.componentConfigs as ComponentFilterConfigs;
   
    const query: bodybuilder.Bodybuilder = this.selectService.resetValueAttributetoMainQuery(source);
    this.store.dispatch(new fromStore.SetQuery(query.build()));
    setTimeout(() => {
      this.selectService.resetNotification();
    }, 5000);
   
  }
  setQ() {
    var _self = this;
    return function (e: any) {

      _self.Query(this.name)

    }

  }

  protected init(type: string, cb?: () => any) {
    this.cms.init(type, this.componentConfigs as ComponentDashboardConfigs, cb);
    this.cms.goBuildDataSeries.subscribe((bu: Bucket[] | MergedSelect) => {

      if (bu) {
        if (Array.isArray(bu)) {
          this.cms.setExpanded = bu.length >= 1;
        } else {

          // console.log( type );
          this.cms.setExpanded = true;
        }
      } else {

        this.cms.setExpanded = false;
      }
      this.buildOptions.emit(bu);
    });
  }

  private checkExpandedForObject(bu: MergedSelect): boolean {
    const arr: Array<Bucket> = [];
    for (const key in bu) {
      if (bu.hasOwnProperty(key)) {
        arr.push(...bu[key]);
      }
    }
    return arr.length >= 1;
  }
}
