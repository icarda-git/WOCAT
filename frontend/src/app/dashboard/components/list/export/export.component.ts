import { Component, OnInit, Input, HostListener } from '@angular/core';
import {
  FileType,
  ExporterResponse,
  ExportFilesModal
} from '../paginated-list/filter-paginated-list/types.interface';
import { ExportService } from '../services/export/export.service';
import { switchMap, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ElasticsearchQuery } from 'src/app/filters/services/interfaces';
import { environment } from 'src/environments/environment';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
  providers: [ExportService]
})
export class ExportComponent implements OnInit {
  @Input() type: FileType;
  @Input() query: Observable<ElasticsearchQuery>;
  forceEnd: boolean;
  installing: boolean;
  delegationArr: Array<ExportFilesModal>;
  indexToToggleLoaded: number;
  downloadPath: string;
  exportPoint: string;
  part: number;

  get finishedExporting(): boolean {
    if (!this.delegationArr) {
      return false;
    }
    return (
      this.delegationArr.filter(({ loaded }: ExportFilesModal) => loaded)
        .length === this.delegationArr.length
    );
  }

  constructor(
    private readonly exportService: ExportService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {
    this.installing = false;
    this.indexToToggleLoaded = 0;
    this.exportPoint = environment.exportPoint;
    this.forceEnd = false;
    this.part = 1;
  }

  ngOnInit(): void {}

  prevent(e, efm: ExportFilesModal): void {
    if (!efm.loaded) {
      e.preventDefault();
    }
  }

  markAsDownloaded({ name, fileName, loaded }: ExportFilesModal): void {
    let toDownload: ExportFilesModal;
    this.delegationArr = this.delegationArr.map((v: ExportFilesModal) => {
      if (name === v.name && v.loaded) {
        v.downloaded = true;
      }
      toDownload = { ...v };
      return v;
    });

    if (this.type === 'xlsx' && loaded) {
      this.exportService.downloadFile(
        this.exportService.createXlsxFile(toDownload),
        fileName
      );
    }
  }

  @HostListener('window:keyup.esc') onKeyUp(): void {
    if (this.installing) {
      const cn = confirm('Are you sure you want to end the export?');
      if (cn) {
        this.dialog.closeAll();
        this.forceEnd = true;
      }
    } else {
      this.dialog.closeAll();
    }
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(
    event: Event
  ): void {
    if (this.installing) {
      event.returnValue = false;
    }
  }

  exportFile(id?: string): void {
    this.installing = true;
    const exporter: Observable<ExporterResponse> = this.query.pipe(
      first(),
      switchMap((q: ElasticsearchQuery) =>
        this.exportService.export({
          type: this.type,
          scrollId: id,
          query: q,
          part: this.part
        })
      )
    );

    exporter.subscribe(this.subscriber.bind(this), (err: HttpErrorResponse) => {
      this.dialog.closeAll();
      this.snackBar.open(
        'Something went wrong, please try exporting again',
        'Dismiss',
        { duration: 15000 }
      );
    });
  }

  private createDeligationOneTime(er: ExporterResponse): void {
    if (!this.delegationArr) {
      this.delegationArr = Array.from(
        { length: Math.ceil(er.total / er.per_doc_size) },
        (_: unknown, i: number): ExportFilesModal => ({
          name: `Part ${i + 1}`,
          downloaded: false,
          loaded: i === this.indexToToggleLoaded,
          fileName: er.fileName,
          hits: er.hits
        })
      );
    } else {
      this.delegationArr = this.delegationArr.map(
        (efm: ExportFilesModal, i: number) => {
          if (i === this.part - 1) {
            efm.fileName = er.fileName;
          }
          return efm;
        }
      );
    }
  }

  private subscriber(er: ExporterResponse): void {
    if (!this.downloadPath) {
      this.downloadPath = er.path;
    }
    this.createDeligationOneTime(er);
    // ONLY FALSE if undefined STOP
    if (er.end === false && !this.forceEnd) {
      this.delegationArr = this.delegationArr.map(
        (efm: ExportFilesModal, i: number) => {
          if (i === this.indexToToggleLoaded) {
            efm.loaded = true;
          }
          return efm;
        }
      );
      this.indexToToggleLoaded++;

      this.part++;
      this.exportFile(er.scrollId);
    }
  }
}
