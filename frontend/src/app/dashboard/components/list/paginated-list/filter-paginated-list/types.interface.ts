import { PageEvent } from '@angular/material';
import { SortOption } from 'src/configs/generalConfig.interface';
import { hits, ElasticsearchQuery } from 'src/app/filters/services/interfaces';
export interface SortPaginationOptions {
  reset: boolean;
  pageEvent: PageEvent;
  sortOption: SortOption;
}

export interface ViewChild {
  linkedId: string;
  compId: string;
}

export enum UpdateCallerBarChart {
  BarChartNgSelect,
  SideFilters
}

export interface BarComposerHelper {
  subFlag: boolean;
  forgetYearsFromStore: boolean;
}

export interface ExportFiles {
  end: boolean;
  fileName: string;
  scrollId: string;
}

export type FileType = 'pdf' | 'docx' | 'xlsx';

export interface ExporterResponse {
  end: boolean;
  scrollId: string;
  fileName: string;
  hits?: Array<hits>; // undefined in case of pdf & docx
  per_doc_size: number;
  total: number;
  path: string;
}

export interface DataForExporter {
  scrollId?: string;
  type: FileType;
  query: ElasticsearchQuery;
  part: number;
}

export interface ExportFilesModal {
  name: string;
  loaded: boolean;
  downloaded: boolean;
  fileName: string;
  hits?: Array<hits>;
}
