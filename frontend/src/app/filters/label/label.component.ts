import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ComponentLabelConfigs } from 'src/configs/generalConfig.interface';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  @Input() componentConfigs: ComponentLabelConfigs;
}
