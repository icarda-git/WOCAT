import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-icons-with-text',
  templateUrl: './icons-with-text.component.html',
  styleUrls: ['./icons-with-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsWithTextComponent {
  strWithIcons: string[];
  @Input() set text(str: string) {
    this.strWithIcons = str
      .trim()
      .split(' ')
      .filter((s: string) => s.length);
  }
  @Input() onlyText?: boolean;
}
