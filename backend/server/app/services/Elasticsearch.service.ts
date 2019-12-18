import { Client, ApiResponse } from '@elastic/elasticsearch';
import { Search } from '@elastic/elasticsearch/api/requestParams';
import { BodyResponse } from '../models/ResponseBody.modal';
import * as config from '../../../config/index.json';
export class ElasticsearchService {
  client: Client;
  constructor() {
    this.client = new Client({
      node: 'http://'+ config.elasticsearch.host
    });
  }

  async get(q: Search, scrollId?: string): Promise<ApiResponse<BodyResponse>> {
    try {
      let scrollSearch: ApiResponse<BodyResponse>;
      if (scrollId) {
        scrollSearch = await this.client.scroll({
          scroll_id: scrollId,
          scroll: '10m',
          method: 'POST'
        });
      } else {
        scrollSearch = await this.client.search({
          index: 'items-temp',
          scroll: '10m',
          method: 'POST',
          body: { ...q }
        });
      }
      return scrollSearch;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
