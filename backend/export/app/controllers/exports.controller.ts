import { Response, Request } from 'express';
import { ElasticsearchService } from '../services/Elasticsearch.service';
import { Search } from '@elastic/elasticsearch/api/requestParams';
import { BodyRequest } from '../models/types.helpers';
import { ExportService } from '../services/Export.service';
import { HITS_SIZE } from '../globals/globals';

export class ExportsController {
  private ess: ElasticsearchService;
  private exportService: ExportService;

  constructor() {
    this.ess = new ElasticsearchService();
    this.exportService = new ExportService();
  }

  getData() {
    return async ({ body }: Request, res: Response): Promise<void> => {
      try {
        const { type, scrollId, query, part }: BodyRequest = body;
        const searchQuery: Search = { ...query, size: HITS_SIZE };
        this.exportService.downloadFile(
          res,
          await this.ess.get(searchQuery, scrollId),
          type,
          part
        );
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    };
  }
}
