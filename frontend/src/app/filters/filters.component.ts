import { Component } from '@angular/core';
import { filtersConfig } from '../../configs/filters';
import { GeneralConfigs } from 'src/configs/generalConfig.interface';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  filters: GeneralConfigs[] = filtersConfig;
}
