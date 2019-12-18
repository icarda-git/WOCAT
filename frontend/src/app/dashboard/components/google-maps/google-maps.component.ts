import { Component, OnInit, Input, ChangeDetectorRef, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ParentComponent } from 'src/app/parent-component.class';
import { Observable } from 'rxjs';
import { ScrollHelperService } from '../services/scrollTo/scroll-helper.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../../store';
import { ComponentDashboardConfigs } from 'src/configs/generalConfig.interface';
import { first } from 'rxjs/operators';
import { Hits, Bucket, hits } from 'src/app/filters/services/interfaces';
import { PageEvent } from '@angular/material';
import { AgmMap } from '@agm/core';
import { SelectService } from 'src/app/filters/services/select/select.service';
import { BodyBuilderService } from 'src/app/filters/services/bodyBuilder/body-builder.service';


declare function _altmetric_embed_init(): any;
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  providers: [ScrollHelperService, SelectService],
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent extends ParentComponent implements OnInit {

  @Input() expandedStatus: boolean;
  hits: Hits; // for the paginated list
  listData: Bucket[] = []; // for aggrigiation list
  isPaginatedList: boolean; // determine if we should display the hits or not
  paginationAtt: PageEvent;
  isFullscreen: boolean = false;
  fitBounds: boolean = false;
  refreshMap = true;
  filterd = false;
  myStyles = {
    height: '430px'
  }
  @ViewChild(AgmMap) mapElement: any
  timeout: any = [];
  // google maps zoom level
  zoom: number = 2;
  // initial center position for the map
  @ViewChild('clickToEnable') clickToEnable: ElementRef;
  @ViewChild('panel') elementView: ElementRef;
  constructor(
    public readonly store: Store<fromStore.AppState>,
    public readonly scrollHelperService: ScrollHelperService,
    public readonly selectService: SelectService,
    private readonly cdr: ChangeDetectorRef,
    private readonly bodyBuilderService: BodyBuilderService,

  ) {
    super();
  }

  resetQ() {
    this.filterd = false;
    const query: bodybuilder.Bodybuilder = this.selectService.resetValueAttributetoMainQuery('id');
    this.store.dispatch(new fromStore.SetQuery(query.build()));
    this.selectService.resetNotification();
  }
  filterMarker(code) {
    this.filterd = true;
    const query: bodybuilder.Bodybuilder = this.selectService.addNewValueAttributetoMainQuery('id', code);
    this.store.dispatch(new fromStore.SetQuery(query.build()));
    this.selectService.resetNotification();
  }
  fullscren() {
    this.isFullscreen = !this.isFullscreen;
    this.refreshMap = false;


    setTimeout(() => {
      this.myStyles.height = this.elementView.nativeElement.offsetHeight ? (this.elementView.nativeElement.offsetHeight - 65) + 'px' : '430px';
      this.refreshMap = true;
    }, 100);
  }

  makeChunks(markers) {
    if (markers.length >= 1000)
      markers = markers.slice(0, markers.length / 2)
    this.scrollHelperService.loading = true;
    var i, j, temparray = [], chunk = 75;
    for (i = 0, j = markers.length; i < j; i += chunk) {
      temparray.push(markers.slice(i, i + chunk));
      // do whatever
    }
    return temparray
  }
  loopThroughMarkersText(chunks) {

    let markers = this.makeChunks(chunks);
    // if (markers.length >= 1000)

    for (var i = 0; i < markers.length; i++) {
      // for each iteration console.log a word
      // and make a pause after it
      ((i) => {
        this.timeout.push(setTimeout(() => {
          for (var z = 0; z < markers[i].length; z++) {
            this.listData.push(markers[i][z]);
          }
          if (i == markers.length - 1)
            this.scrollHelperService.loading = false;
        }, 1000 * i));
      })(i);
    };
  }

  ngOnInit(): void {
    //this.myStyles.height = this.elementView.nativeElement.offsetHeight.value;

    this.scrollHelperService.storeVal = this.store;
    this.seeIfThisCompInView();
    this.scrollHelperService.dataIsReadyArrived
      .pipe(first())
      .subscribe(() => this.subToDataFromStore());

  }

  hideClickToEnable(): void {
    this.clickToEnable.nativeElement.hidden = true;
  }

  disPatchSetInView(collapsed: boolean): void {
    const { id } = this.componentConfigs as ComponentDashboardConfigs;
    this.scrollHelperService.disPatchSetInView(id, collapsed);
  }

  @HostListener('mouseleave', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (this.clickToEnable) {
      this.clickToEnable.nativeElement.hidden = false;
    }
  }

  private seeIfThisCompInView(): void {
    const { id } = this.componentConfigs as ComponentDashboardConfigs;
    this.scrollHelperService.seeIfThisCompInView(id);
  }

  private subToDataFromStore(): void {

    const { source } = this.componentConfigs as ComponentDashboardConfigs;
    this.store
      .select(fromStore.getBuckets, source)
      .subscribe((b: Bucket[]) => {

        let filters = this.bodyBuilderService.getFiltersFromQuery().filter(element => Object.keys(element).indexOf('id' + '.keyword') != -1)
        if (filters.length)
          this.filterd = true;
        else
          this.filterd = false;
        this.timeout.forEach(element => {
          clearTimeout(element);
        });
        //  if (b.length <= 50) {
        this.zoom = 8
        this.fitBounds = true;
        // } else {
        //   this.zoom = 2
        //   this.fitBounds = false;
        // }

        this.listData = [];
        this.loopThroughMarkersText(b);

        this.cdr.detectChanges();
      });
  }



  /**
   * To make sure the console won't log errors,
   * if there is no data. see `expandOrStay` &
   * `getFromStoreForOnce`
   */
  private safeCheckLength(arr: Array<Bucket> | Array<hits> | boolean): number {
    if (typeof arr === 'boolean') {
      return 0;
    }
    const len: number | boolean = arr && arr.length;
    return len || 0;
  }
}
