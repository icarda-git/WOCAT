import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ESSource } from 'src/app/filters/services/interfaces';
import { PaginatedListConfigs } from 'src/configs/generalConfig.interface';

@Component({
  selector: 'app-link-text',
  templateUrl: './link-text.component.html',
  styleUrls: ['./link-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkTextComponent {
  objectKeys = Object.keys;
  @Input() source: ESSource;
  @Input() content: PaginatedListConfigs;
}
