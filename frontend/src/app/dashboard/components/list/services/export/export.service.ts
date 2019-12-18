import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ExporterResponse,
  DataForExporter,
  ExportFilesModal
} from '../../paginated-list/filter-paginated-list/types.interface';
import { utils, writeFile } from 'xlsx';
import { hits } from 'src/app/filters/services/interfaces';

@Injectable()
export class ExportService {
  private readonly api_end_export_point: string = environment.exportPoint;
  constructor(private readonly http: HttpClient) { }

  export(d: DataForExporter): Observable<ExporterResponse> {
    return this.http.post(this.api_end_export_point, d) as Observable<
      ExporterResponse
    >;
  }

  createXlsxFile({ hits }: ExportFilesModal): Array<Array<string>> {
    return hits.map(({ _source }: hits) => [
      _source.Name,
      _source['Definition of the Technology'] || _source['Short description of the Approach'],
      this.formatter(_source['Name of institution']),
      _source['date_documentation'],
      this.formatter(_source['SLM specialist']),
      this.formatter(_source['Country']),
      'https://qcat.wocat.net/en/wocat/technologies/view/' + _source.id
    ]);
  }

  downloadFile(excelData: Array<Array<string>>, fileName: string): void {
    const sheet = utils.aoa_to_sheet([this.getHeader(), ...excelData]);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, sheet, 'Technologys');
    writeFile(workBook, fileName, { bookType: 'xlsx' });
  }

  private formatter(toFormat: Array<string> | string): string {
    return Array.isArray(toFormat) ? toFormat.join(', ') : toFormat || 'None';
  }

  private getHeader(): Array<string> {
    return [
      'Name',
      'Definition of the Technology',
      'Institutions',
      'Compilation Date',
      'SLM specialists',
      'Countries',
      'link'
    ];
  }
}
