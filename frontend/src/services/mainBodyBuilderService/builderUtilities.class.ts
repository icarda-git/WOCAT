import {
  SortOption,
  GeneralConfigs,
  ComponentCounterConfigs,
  ComponentDashboardConfigs,
} from 'src/configs/generalConfig.interface';
import { Subject } from 'rxjs';
import {
  QuerySearchAttribute,
  QueryYearAttribute,
  QueryFilterAttribute,
  QueryBlock,
} from 'src/app/filters/services/interfaces';
import { countersConfig } from 'src/configs/counters';
import { dashboardConfig } from 'src/configs/dashboard';
import { filtersConfig } from 'src/configs/filters';

export class BuilderUtilities {
  private querySourceBucketsFilter: QueryBlock[];
  private openLimitedAcc: string[];
  protected aggAttributes:
    | QueryYearAttribute
    | QuerySearchAttribute
    | QueryFilterAttribute;
  protected hitsAttributes: SortOption;
  protected orOperator: Subject<boolean>;
  protected or: boolean;
  protected readonly titleSource: string;

  constructor() {
    this.openLimitedAcc = this.extractOpenLimitedAccessFilter();
    this.querySourceBucketsFilter = this.convertEnumToQueryBlock();
    this.aggAttributes = Object.create(null);
    this.hitsAttributes = Object.create(null) as SortOption;
    this.orOperator = new Subject();
    this.or = false;
    this.titleSource =
      (() => {
        const [conf] = dashboardConfig.filter(
          ({ componentConfigs }: GeneralConfigs) =>
            (componentConfigs as ComponentDashboardConfigs).content
        );
        return (conf.componentConfigs as ComponentDashboardConfigs).content
          .title;
      })() || 'dc_title';
  }

  protected addCounterAgg(b: bodybuilder.Bodybuilder): void {
    this.querySourceBucketsFilter.forEach((qb: QueryBlock) =>
      this.addCounterAttrToMainQuery(qb, b)
    );
  }

  protected addSpecificfield(key: string, b: bodybuilder.Bodybuilder): void {
    if (key === 'year.keyword') {
      const years = {
        gte: this.aggAttributes[key].gte,
        lte: this.aggAttributes[key].lte,
      };
      // this.or ? b.orQuery('range', key, years) : b.query('range', key, years);
      b.query('range', key, years);
    } else if (key === '_all' || key === this.titleSource) {
      this.or
        ? b.orFilter('match', { [key]: this.aggAttributes[key] })
        : b.filter('match', { [key]: this.aggAttributes[key] });
    }
    else if (this.aggAttributes[key].query_string) {
      //console.log(this.aggAttributes[key])
      b.query('query_string', this.aggAttributes[key].query_string)
    }
    else {
      console.log(this.aggAttributes[key]);
      this.aggAttributes[key].forEach((s: string) =>
        this.or ? b.orFilter('term', key, s) : b.filter('term', key, s)
      );
    }
  }

  private extractOpenLimitedAccessFilter(): string[] {
    return countersConfig
      .filter((cg: GeneralConfigs) => {
        const { filter } = cg.componentConfigs as ComponentCounterConfigs;
        return !!filter;
      })
      .map((cg: GeneralConfigs) => {
        const { filter } = cg.componentConfigs as ComponentCounterConfigs;
        return filter;
      });
  }

  private convertEnumToQueryBlock(): QueryBlock[] {
    const arr: QueryBlock[] = [];
    const mainQuerySources: Array<string> = Array.from(
      new Set([
        ...this.getSourcesFromConfigs(dashboardConfig),
        ...this.getSourcesFromConfigs(filtersConfig, true),
        ...this.getSourcesFromConfigs(countersConfig, true),
      ])
    );
    // I'm assuming  that this will always will have 'status'
    mainQuerySources.forEach((key: string) =>
      key.includes('slm_type')
        ? arr.push(
          {
            source: `${key}.keyword`,
            buckets: key,
            filter: this.openLimitedAcc[0],
          },
          {
            source: `${key}.keyword`,
            buckets: key,
            filter: this.openLimitedAcc[1],
          }
        )
        : arr.push({ source: `${key}.keyword`, buckets: key })
    );
    return arr;
  }

  private getSourcesFromConfigs(
    configs: Array<GeneralConfigs>,
    filterBasedOnAddInMainQuery: boolean = false
  ): Array<string> {
    return [
      ...(filterBasedOnAddInMainQuery
        ? configs
          .filter(
            ({ componentConfigs }: GeneralConfigs) =>
              (componentConfigs as any).addInMainQuery
          )
          .map(
            ({ componentConfigs }: GeneralConfigs) =>
              (componentConfigs as any).source
          )
        : configs.map(
          ({ componentConfigs }: GeneralConfigs) =>
            (componentConfigs as any).source
        )),
    ]
      .map((s: string | Array<string>) =>
        !Array.isArray(s) && s ? s.replace('.keyword', '') : undefined
      )
      .filter((d: string | undefined) => d);
  }

  private addCounterAttrToMainQuery(
    qb: QueryBlock,
    b: bodybuilder.Bodybuilder
  ): void {
    const { filter, source } = qb; // filter comes from this.convertEnumToQueryBlock
    if (!filter) {
      b.aggregation(
        'cardinality',
        {
          field: source,
          precision_threshold: 40000,
        },
        source
      );
    } else {
      const obj = Object.create(null);
      obj[source] = filter;
      b.aggregation(
        'filter',
        {
          term: obj,
        },
        `${source}_${filter}`
      );
    }
    this.addAggregationsForCharts(b);
  }

  private addAggregationsForCharts(b: bodybuilder.Bodybuilder): void {
    this.querySourceBucketsFilter.forEach((qb: QueryBlock) => {
      const { buckets, source } = qb;
      const size = this.getSize(buckets);
      b.aggregation('terms', this.buildTermRules(size, source), `${buckets}`);
    });
  }

  private getSize(buckets: string): number {
    return buckets.includes('affiliation') || buckets.includes('author')
      ? 20
      : this.checkWordcloud(buckets);
  }

  private checkWordcloud(buckets: string): number {
    return buckets.includes('subject') ? 50 : 1000;
  }

  private buildTermRules(size: number, source: string): object {
    return {
      field: source,
      size,
    };
  }
}
