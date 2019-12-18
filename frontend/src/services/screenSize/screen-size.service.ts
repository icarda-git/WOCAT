import { Injectable } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  isSmallScreen: boolean;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.subToScreenSize();
  }

  private subToScreenSize(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.isSmallScreen = true;
        } else {
          this.isSmallScreen = false;
        }
      });
  }
}
