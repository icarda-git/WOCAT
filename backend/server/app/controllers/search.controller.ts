import { Response, Request } from 'express';
import { ElasticsearchService } from '../services/Elasticsearch.service';
export class SearchController {
  private ess: ElasticsearchService;

  constructor() {
    this.ess = new ElasticsearchService();
  }

  getData() {
    return async ({ body }: Request, res: Response): Promise<void> => {
      try {
        this.ess.client.search({
          index: 'items-temp',
          method: 'POST',
          body: body
        }).then(data => res.json(data.body)).catch(e => res.status(500).json(e))
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    };
  }
}
