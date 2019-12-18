import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import * as fromStore from '../store';
import 'hammerjs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MainBodyBuilderService } from 'src/services/mainBodyBuilderService/main-body-builder.service';
import { TourService, IStepOption } from 'ngx-tour-md-menu';
import { countersConfig } from 'src/configs/counters';
import {
  GeneralConfigs,
  ComponentCounterConfigs,
  ComponentDashboardConfigs,
  Tour,
} from 'src/configs/generalConfig.interface';
import { dashboardConfig } from 'src/configs/dashboard';
import { tourConfig } from 'src/configs/tour';
import { orAndToolTip } from 'src/configs/tooltips';
import { ScreenSizeService } from 'src/services/screenSize/screen-size.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') sidenav: MatDrawer;
  @ViewChild('tooltip') matTooltip;

  loading$: Observable<boolean>;
  render: boolean;
  matdisabled: boolean = false;
  orOperator: boolean;
  filterText = '< filters';
  readonly orAndToolTip: string;
  private prevenetMouseOnNav: boolean;
  options: any = {
    bottom: 0,
    fixed: true,
    top: 0,
  };

  get isSmall(): boolean {
    return this.screenSizeService.isSmallScreen;
  }

  constructor(
    private readonly store: Store<fromStore.AppState>,
    private readonly mainBodyBuilderService: MainBodyBuilderService,
    private readonly tourService: TourService,
    private readonly screenSizeService: ScreenSizeService
  ) {
    this.orOperator = false;
    this.orAndToolTip = orAndToolTip;
    this.options = {
      bottom: 0,
      fixed: true,
      top: 0,
    };
  }
  ngAfterViewInit() {

    if (window && window.localStorage) {
      // localStorage supported
      let isnewuser = localStorage.getItem("newuser");
      if (isnewuser != "no") {
        setTimeout(() => {
          this.startTour();
        }, 1000);

      } else if (isnewuser === "no") {
        setTimeout(() => {
          this.matdisabled = true;
        }, 10);

      }
      if (this.matdisabled) {
        setInterval(() => {
          if (this.filterText == '<---- Filters')
            this.filterText = '<-  - Filters';
          else
            this.filterText = '<---- Filters';

        }, 500)
        setTimeout(() => {
          this.matTooltip.show();
        }, 1000);
      }


      localStorage.setItem("newuser", "no");


    }
  }
  ngOnInit(): void {
    this.matdisabled = false;




    this.loading$ = this.store.select(fromStore.getLoadingStatus);
  }

  onMouseMove(event: MouseEvent): void {

    if (!this.prevenetMouseOnNav) {
      if (event.x <= 20 && !this.sidenav.opened) {
        this.openAndRender('over');
        this.matTooltip.hide();
        this.matdisabled = true;
      }
      if (event.x > this.sidenav._width && this.sidenav.opened) {
        this.sidenav.close();
      }
    }
  }

  openNavAndDisableIgnoreMouseEvent(): void {
    this.openAndRender('side');

    this.prevenetMouseOnNav = true;
    this.sidenav.closedStart.subscribe(() => (this.prevenetMouseOnNav = false));
  }

  addRemoveOrOperator(): void {
    this.orOperator = !this.orOperator;
    this.mainBodyBuilderService.setOrOperator = this.orOperator;
  }

  refresh(): void {
    window.location.reload();
  }

  startTour(): void {
    this.tourService.initialize(this.mapConfigsToTour());
    this.tourService.start();
  }

  private openAndRender(mode: 'over' | 'push' | 'side'): void {
    this.sidenav.mode = this.isSmall ? 'over' : mode;
    this.sidenav.opened ? this.sidenav.close() : this.sidenav.open();
    this.renderSideNav();
  }

  private mapConfigsToTour(): IStepOption[] {
    return [...tourConfig, ...countersConfig, ...dashboardConfig]
      .filter(({ show }: GeneralConfigs) => show)
      .map(({ componentConfigs, tour }: GeneralConfigs) => {
        const { description, title, id } = componentConfigs as
          | ComponentCounterConfigs
          | ComponentDashboardConfigs
          | Tour;
        return (
          tour &&
          this.checkIfApplicableForTour(id, description, title) &&
          ({
            anchorId: id,
            content: description,
            title,
            enableBackdrop: true,
          } as IStepOption)
        );
      })
      .filter((iso: IStepOption) => Object.keys(iso).length >= 1);
  }

  private checkIfApplicableForTour(
    id: string,
    content: string,
    title: string
  ): boolean {
    return !!(id && content && title);
  }

  private renderSideNav(): void {
    if (this.render === undefined) {
      this.render = true;
    }
  }
}
