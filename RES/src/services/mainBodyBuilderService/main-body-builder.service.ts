import { Injectable } from '@angular/core';
import * as bodybuilder from 'bodybuilder';
import {
  QuerySearchAttribute,
  QueryYearAttribute,
  QueryFilterAttribute
} from 'src/app/filters/services/interfaces';
import { BuilderUtilities } from './builderUtilities.class';
import { Subject } from 'rxjs';
import {
  SortOption,
  GeneralConfigs,
  ComponentDashboardConfigs
} from 'src/configs/generalConfig.interface';
import { dashboardConfig } from 'src/configs/dashboard';
@Injectable({
  providedIn: 'root'
})
export class MainBodyBuilderService extends BuilderUtilities {
  private rawOptions: string[];

  constructor() {
    super();
    this.rawOptions = this.buildRawOptions();
    this.orOperator.next(false);
  }

  get getAggAttributes():
    | string
    | QuerySearchAttribute
    | QueryYearAttribute
    | QueryFilterAttribute {
    return this.aggAttributes;
  }

  set setAggAttributes(
    queryAttribute:
      | string
      | QuerySearchAttribute
      | QueryYearAttribute
      | QueryFilterAttribute
  ) {
    if (typeof queryAttribute === 'string') {
      // title search
      this.aggAttributes[this.titleSource] = queryAttribute;
    } else if ('fuzziness' in queryAttribute) {
      // QuerySearchAttribute
      this.aggAttributes['_all'] = queryAttribute as QuerySearchAttribute;
    } else if ('gte' in queryAttribute) {
      // range
      this.aggAttributes['year.keyword'] = queryAttribute as QueryYearAttribute;
    } else {
      const objectKey: string = Object.keys(queryAttribute)[0];
      if (queryAttribute[objectKey].length === 0) {
        delete this.aggAttributes[objectKey];
      } else {
        this.aggAttributes[objectKey] = queryAttribute[objectKey];
      }
    }
  }

  set setHitsAttributes(s: SortOption) {
    this.hitsAttributes = s;
  }

  set setOrOperator(b: boolean) {
    this.or = b;
    this.orOperator.next(b);
  }

  get getOrOperator(): Subject<boolean> {
    return this.orOperator;
  }

  /**
   * returning `bodybuilder.Bodybuilder`
   * so we can apply methods to it if we need to
   * * this method will run from the `DashboardComponent` to load the total numbers
   * * and each time one of the filters value changes
   * * by default (when the page loads for the first time) sortOption will be empty
   * * it will also run when the user gose to the next page in paginated list
   * * and when he/she changes any value from any side filters
   */
  buildMainQuery(
    from: number,
    everything: boolean = true
  ): bodybuilder.Bodybuilder {
    const b: bodybuilder.Bodybuilder = bodybuilder();
    if (everything) {
      this.addCounterAgg(b);
    }
    this.addQueryAttributes(b);
    this.sortHitsQuery(b, from);
    return b;
  }

  /**
   * when the search terms are empty
   * from the search component,
   * we are returning the deleted term
   * so if the user clicks `search` and
   * there is no term we won't build the query
   */
  deleteFromMainQuery(fromSearchAll: boolean): string {
    if (fromSearchAll) {
      const all = this.aggAttributes['_all'];
      delete this.aggAttributes['_all'];
      return all;
    } else {
      const title = this.aggAttributes[this.titleSource];
      delete this.aggAttributes[this.titleSource];
      return title;
    }
  }

  addQueryAttributes(b: bodybuilder.Bodybuilder): bodybuilder.Bodybuilder {
    // tslint:disable-next-line
    for (const key in this.aggAttributes) {
      this.addSpecificfield(key, b);
    }
    return b;
  }

  private buildRawOptions(): Array<string> {
    let rows: Array<string> = [];
    const { content } = dashboardConfig.find(
      (curr: GeneralConfigs) =>
        !!(curr.componentConfigs as ComponentDashboardConfigs).content
    ).componentConfigs as ComponentDashboardConfigs;
    for (const key in content) {
      if (content.hasOwnProperty(key)) {
        if (typeof content[key] === 'string') {
          rows = [...rows, content[key]];
        } else if (
          typeof content[key] === 'object' &&
          !Array.isArray(content[key])
        ) {
          rows = [...rows, ...(Object.values(content[key]) as Array<string>)];
        } else if (Array.isArray(content[key])) {
          (content[key] as Array<SortOption>).forEach(({ value }: SortOption) =>
            rows.push(value.replace('.keyword', '').replace('.score', ''))
          );
        }
        // else is boolean
      }
    }
    // bitstreams needed for the images
    // handle needed for the altmetric
    rows.push('thumbnail', 'handle','Country', 'bitstreams', 'Image','Short description of the Approach');
    return rows;
  }

  private sortHitsQuery(b: bodybuilder.Bodybuilder, from: number): void {
    const { sort, value } = this.hitsAttributes;
    b.sort('_score', {
      "order": "desc"
    }).sort(value ? value : 'id.keyword', {
      mode: 'max',
      order: sort ? sort : 'desc'
    }).from(from);

    this.addRawOptions(b);
  }

  private addRawOptions(b: bodybuilder.Bodybuilder): void {
    b.rawOption('_source', this.rawOptions);
  }
}
