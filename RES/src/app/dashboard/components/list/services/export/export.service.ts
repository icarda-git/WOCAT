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
  constructor(private readonly http: HttpClient) {}

  export(d: DataForExporter): Observable<ExporterResponse> {
    return this.http.post(this.api_end_export_point, d) as Observable<
      ExporterResponse
    >;
  }

  createXlsxFile({ hits }: ExportFilesModal): Array<Array<string>> {
    return hits.map(({ _source }: hits) => [
      _source.title,
      _source.citation,
      _source.date,
      this.formatter(_source.author),
      _source.publisher,
      _source.status,
      _source.crp,
      this.formatter(_source.affiliation),
      this.formatter(_source.language),
      this.formatter(_source.subject),
      _source.region,
      this.formatter(_source.country),
      this.formatter(_source.repo),
      _source.handle
    ]);
  }

  downloadFile(excelData: Array<Array<string>>, fileName: string): void {
    const sheet = utils.aoa_to_sheet([this.getHeader(), ...excelData]);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, sheet, 'Technologys');
    writeFile(workBook, fileName, { bookType: 'xlsx' });
  }

  private formatter(toFormat: Array<string> | string): string {
    return Array.isArray(toFormat) ? toFormat.join('; ') : toFormat || 'None';
  }

  private getHeader(): Array<string> {
    return [
      'Title',
      'Citation',
      'Date',
      'Author(s)',
      'Publisher',
      'Status',
      'CRP',
      'Affiliation(s)',
      'Language',
      'Subject(s)',
      'Region',
      'Country(ies)',
      'Repository(ies)',
      'Handle'
    ];
  }
}
