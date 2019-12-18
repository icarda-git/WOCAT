import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Numbers, Altmetric } from 'src/app/filters/services/interfaces';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent {
  @Input() set key(key: string) {
    if (key === 'altmetric') {
      this.typeofData = 'altmetric';
    } else if (key === 'numbers') {
      this.typeofData = 'numbers';
    } else {
      this.typeofData = 'normalText';
    }
  }
  @Input() label: string;
  @Input() labelData: Numbers | Altmetric | any;
  typeofData: 'altmetric' | 'numbers' | 'normalText';
}
