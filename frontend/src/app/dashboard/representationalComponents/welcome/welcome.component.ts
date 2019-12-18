import { Component, OnInit } from '@angular/core';
import { TourService } from 'ngx-tour-md-menu';
import { INgxmStepOption } from 'ngx-tour-md-menu/lib/step-option.interface';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  tourStarted: boolean;
  constructor(private readonly tourService: TourService) {}

  ngOnInit(): void {
    this.tourService.start$.subscribe(
      (inso: INgxmStepOption) => (this.tourStarted = true)
    );
  }

  toggleElement(): void {
    this.tourStarted = !this.tourStarted;
  }
}
