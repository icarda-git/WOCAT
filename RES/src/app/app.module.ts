import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, efficts } from 'src/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatSidenavModule,
  MatExpansionModule,
  MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatProgressBarModule,
  MatPaginatorModule,
  MatRippleModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatDialogModule,
  MatDividerModule,
  MatTooltipModule
} from '@angular/material';
import { FiltersComponent } from './filters/filters.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './filters/select/select.component';
import { PortalModule } from '@angular/cdk/portal';
import { DynamicComponent } from './dashboard/components/dynamic/dynamic.component';
import { LabelComponent } from './filters/label/label.component';
import { CounterComponent } from './dashboard/components/counter/counter.component';
import { SearchComponent } from './filters/search/search.component';
import { NouisliderModule } from 'ng2-nouislider';
import { RangeComponent } from './filters/range/range.component';
import { ScrollToComponent } from './dashboard/components/scroll-to/scroll-to.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { InViewportModule } from '@thisissoon/angular-inviewport';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartComponent } from './dashboard/components/chart/chart.component';
import { ListComponent } from './dashboard/components/list/list.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PaginatedListComponent } from './dashboard/components/list/paginated-list/paginated-list.component';
import { PubImageComponent } from './dashboard/components/list/paginated-list/pub-image/pub-image.component';
import { LinkTextComponent } from './dashboard/components/list/paginated-list/link-text/link-text.component';
import { VirtualListComponent } from './dashboard/components/list/virtual-list/virtual-list.component';
// tslint:disable-next-line
import { FilterPaginatedListComponent } from './dashboard/components/list/paginated-list/filter-paginated-list/filter-paginated-list.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FooterComponent } from './dashboard/components/footer/footer.component';
import { TourMatMenuModule } from 'ngx-tour-md-menu';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './dashboard/representationalComponents/welcome/welcome.component';
import { MdePopoverModule } from '@material-extended/mde';
import { IconsWithTextComponent } from './dashboard/representationalComponents/icons-with-text/icons-with-text.component';
import { IconTextLoopComponent } from './dashboard/representationalComponents/icons-with-text/icon-text-loop/icon-text-loop.component';
import { TagsComponent } from './dashboard/components/list/paginated-list/link-text/tags/tags.component';
import { SnackComponent } from './dashboard/representationalComponents/snack/snack.component';
import { PieComponent } from './dashboard/components/pie/pie.component';
import { WordcloudComponent } from './dashboard/components/wordcloud/wordcloud.component';
import { MapComponent } from './dashboard/components/map/map.component';
import { GetFirstImage } from './pipes/images.pipe';
import { LineComponent } from './dashboard/components/line/line.component';
import { SimiCircleComponent } from './dashboard/components/simi-circle/simi-circle.component';
import { BarComponent } from './dashboard/components/bar/bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ExportComponent } from './dashboard/components/list/export/export.component';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsComponent } from './dashboard/components/google-maps/google-maps.component';
import { NgSplitPipeModule, NgFirstOrDefaultPipeModule, NgHeadPipeModule, NgTruncatePipeModule } from 'angular-pipes';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { TruncateModule } from '@yellowspot/ng-truncate';
@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    DashboardComponent,
    SelectComponent,
    DynamicComponent,
    ChartComponent,
    LabelComponent,
    CounterComponent,
    SearchComponent,
    RangeComponent,
    ScrollToComponent,
    ListComponent,
    PubImageComponent,
    LinkTextComponent,
    PaginatedListComponent,
    VirtualListComponent,
    FilterPaginatedListComponent,
    FooterComponent,
    WelcomeComponent,
    IconsWithTextComponent,
    IconTextLoopComponent,
    TagsComponent,
    SnackComponent,
    PieComponent,
    WordcloudComponent,
    MapComponent,
    GetFirstImage,
    LineComponent,
    SimiCircleComponent,
    BarComponent,
    ExportComponent,
    GoogleMapsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleKey
    }),
    FormsModule,
    NgSelectModule,
    PortalModule,
    MatSidenavModule,
    MatExpansionModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    InViewportModule,
    ScrollToModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(efficts),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode,
    }),
    MatInputModule,
    MatButtonModule,
    MatListModule,
    HighchartsChartModule,
    ScrollingModule,
    MatPaginatorModule,
    NgxLoadingModule.forRoot({}),
    MatRippleModule,
    MatProgressBarModule,
    NouisliderModule,
    TourMatMenuModule.forRoot(),
    RouterModule.forRoot([{ path: '', component: AppComponent }]), // for TourMatMenuModule,
    MdePopoverModule, // https://github.com/angular/material2/issues/2691
    MatSnackBarModule,
    MatProgressSpinnerModule,
    LayoutModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    NgSplitPipeModule,
    AgmSnazzyInfoWindowModule,
    MatTooltipModule,
    NgHeadPipeModule,
    TruncateModule,
  ],
  entryComponents: [
    ChartComponent,
    SelectComponent,
    LabelComponent,
    CounterComponent,
    SearchComponent,
    RangeComponent,
    ListComponent,
    WelcomeComponent,
    SnackComponent,
    PieComponent,
    WordcloudComponent,
    MapComponent,
    LineComponent,
    SimiCircleComponent,
    BarComponent,
    ExportComponent,
    GoogleMapsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
