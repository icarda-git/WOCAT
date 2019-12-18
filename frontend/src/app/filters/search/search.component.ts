import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  searchOptions,
  ComponentSearchConfigs,
} from 'src/configs/generalConfig.interface';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { QuerySearchAttribute } from '../services/interfaces';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { BodyBuilderService } from '../services/bodyBuilder/body-builder.service';
import { ParentComponent } from 'src/app/parent-component.class';
import { filtersConfig } from 'src/configs/filters'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent extends ParentComponent implements OnInit {
  @ViewChild('search') searchInput: ElementRef;
  searchTerm: string;

  constructor(
    private readonly bodyBuilderService: BodyBuilderService,
    private readonly store: Store<fromStore.AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.subToSearchTerms();
    this.subToOrOperator();
  }

  onClick() {
   
    this.applySearchTerm();
  }

  private deleteFromMainQuery(allSearch: boolean): string {
    return this.bodyBuilderService.deleteFromMainQuery(allSearch);
  }
  prepareQueryString(string: string) {
    string = string.replace(new RegExp('\\&|\\||\\!|\\(|\\)|\\{|\\}|\\[|\\]|\\^|\\"|\\~|\\*|\\?|\\:|\\-|\\\\|\\/|\\=|\\+|\\%|\\,|\\@', 'gm'), ' ');//remove special characters
    string = string.trim().replace(new RegExp('\\s{2,}', 'gm'), ' ');//remove extra whitespaces
    return '*' + string.split(' ').join('* *') + '*';
  }
  private applySearchTerm(): void {
    const { type } = this.componentConfigs as ComponentSearchConfigs;
    let fields = filtersConfig.filter(d => d.componentConfigs.source).map(d => d.componentConfigs.source + '^1.5')
    fields.push("Name^1.6")
    fields.push("Detailed description of the Approach^1.3")
    fields.push("Short description of the Approach^1.3")
    fields.push("Definition of the Technology^1.3")
    fields.push("Description^1.3")
    
    if (type === searchOptions.allSearch) {
      this.bodyBuilderService.setAggAttributes = <QuerySearchAttribute>{
        query: {
          "query_string": {
            "fields": fields,
            "query": this.prepareQueryString(this.searchTerm)
          }
        }
      }
    } else {
      this.bodyBuilderService.setAggAttributes = this.searchTerm;
    }
    this.dispatchActions();
  }

  private checkTypeThenDelete() {
    let thereWasATerm: string;
    const { type } = this.componentConfigs as ComponentSearchConfigs;
    if (type === searchOptions.allSearch) {
      thereWasATerm = this.deleteFromMainQuery(true);
    } else {
      thereWasATerm = this.deleteFromMainQuery(false);
    }
    if (thereWasATerm === undefined) {
      return;
    }
    this.dispatchActions();
  }

  private dispatchActions() {
    this.bodyBuilderService.resetOtherComponent({ caller: 'search' });
    this.store.dispatch(
      new fromStore.SetQuery(this.bodyBuilderService.buildMainQuery().build())
    );
  }

  /**
   * this method will handle if the user
   * clears the input
   */
  private subToSearchTerms() {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(250),
        map((s: string) => {
          if (this.checkIfInputIsEmpty()) {
            this.checkTypeThenDelete();
          }
        })
      )
      .subscribe();
  }

  private checkIfInputIsEmpty(): boolean {
    return this.searchTerm === undefined || this.searchTerm.trim() === '';
  }

  private subToOrOperator(): void {
    this.bodyBuilderService.orOperator.subscribe((b: boolean) => {
      if (this.searchTerm !== undefined && this.searchTerm.length) {
        this.applySearchTerm();
      }
    });
  }
}
