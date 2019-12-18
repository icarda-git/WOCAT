import { FileType } from '../models/types.helpers';
import {
  BodyResponse,
  Hits,
  InnterHits,
  ExporterResponse
} from '../models/ResponseBody.modal';
import { DocxData, Publication } from '../models/DocxData.modal';
import { ApiResponse } from '@elastic/elasticsearch';
import { Response as ExpressRes } from 'express';
import { v4 } from 'uuid';
import * as path from 'path';
import { promises as fs } from 'fs';
import * as JSZip from 'jszip';
import * as Docxtemplater from 'docxtemplater';
import * as word2pdf from 'word2pdf';
// import * as ora from 'ora';
import { HITS_SIZE } from '../globals/globals';

export class ExportService {
  async downloadFile(
    res: ExpressRes,
    { body: { hits, _scroll_id } }: ApiResponse<BodyResponse>,
    type: FileType,
    part: number
  ): Promise<void> {
    try {
      const fileName = `WOCAT-${part}-${v4()}`;
      if (hits.hits.length === 0) {
        res.json({ end: true });
        return;
      }

      const response: ExporterResponse = {
        end: hits.hits.length === 0,
        scrollId: _scroll_id,
        fileName: `${fileName}.${type}`,
        path: '/downloads',
        per_doc_size: HITS_SIZE,
        total: hits.total
      };

      let filePath: string;

      if (type !== 'xlsx') {
        filePath = await this.createDocx(fileName, hits);
      } else {
        response.hits = hits.hits;
      }

      if (type === 'pdf') {
        this.createPdf(filePath, fileName, type, res, response);
      } else {
        res.json(response);
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  private async createDocx(fileName: string, hits: Hits): Promise<string> {
    try {
      const zip = new JSZip(
        await fs.readFile(this.resolvePath('exports-template.docx'), 'binary')
      );
      const doc = new Docxtemplater();
      doc.loadZip(zip);
      doc.setData({
        publications: this.mapDataToDocxTemplate(hits.hits)
      } as DocxData);
      doc.render();
      const buf = doc.getZip().generate({ type: 'nodebuffer' });
      const filePath = this.resolvePath(`${fileName}.docx`, true);
      // const spinner = ora(`🚀 writing DOCX`).start();
      return fs.writeFile(filePath, buf).then(() => {
        // spinner.succeed(`👾 we are done writing DOCX`).stop();
        return filePath;
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  private resolvePath(file: string, download?: boolean): string {
    return download
      ? path.resolve(__dirname, `../public/downloads/${file}`)
      : path.resolve(__dirname, `../template-files/${file}`);
  }

  private createPdf(
    filePath: string,
    fileName: string,
    type: FileType,
    res: ExpressRes,
    response: object
  ): void {
    // const spinner = ora(`🔭 converting to PDF`).start();
    word2pdf(filePath)
      .then((data: Buffer) => {
        fs.writeFile(this.resolvePath(`${fileName}.${type}`, true), data).then(
          () => {
            // spinner.succeed(`☄️ Done writing  PDF FROM DOCX`).stop();
            res.json(response);
          }
        );
      })
      .catch(() => {
        console.error(`Error creating ${fileName}.${type}`);
        res.status(500).json({ message: 'Something went wrong' });
      });
  }

  private mapDataToDocxTemplate(
    h: Array<InnterHits>
  ): Array<Partial<Publication>> {
    return h.map<Partial<Publication>>(({ _source, _id }: InnterHits) => ({
      id: _id,
      title: _source.title,
      identifier_status: _source.status,
      identifier_citation: _source.citation,
      subject: Array.isArray(_source.subject)
        ? _source.subject.join('; ')
        : _source.subject || '',
      date_issued: _source.date,
      contributor_crp: _source.crp,
      identifier_uri: _source.uri,
      type: _source.type,
      isMELSPACE: _source.repo === 'MELSPACE'
    }));
  }
}
