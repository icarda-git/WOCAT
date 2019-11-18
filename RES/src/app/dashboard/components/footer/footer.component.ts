import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Fade,AutoPlay } from '@egjs/flicking-plugins';
import { Plugin } from "@egjs/flicking";
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {

  plugins: Plugin[] = [new AutoPlay(2000, 'NEXT')];
}
