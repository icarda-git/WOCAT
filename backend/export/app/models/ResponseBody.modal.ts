export interface BodyResponse {
  _scroll_id?: string;
  statusCode?: number;
  headers?: any;
  took: number;
  timed_out: boolean;
  _shards: Shards;
  hits: Hits;
}

export interface Shards {
  total: number;
  successful: number;
  skipped: number;
  failed: number;
}

export interface Hits {
  total: number;
  max_score: number;
  hits: Array<InnterHits>;
}

export interface InnterHits {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: Source;
}

export interface Source {
  id: string;
  handle: string;
  thumbnail: string;
  date: string;
  identifier: string | Array<string>;
  uri: string;
  abstract: string;
  region: string;
  language: Array<string>;
  publisher: string;
  type: string;
  title: string;
  status: string;
  citation: string;
  sponsorship: string;
  affiliation: string | Array<string>;
  crp: string;
  author: Array<string> | string;
  community: string | Array<string>;
  year: string;
  repo: string;
  numbers: Numbers;
  country?: Array<string>;
  subject?: Array<string>;
}

export interface Numbers {
  score: number;
  downloads: number;
  views: number;
}

export interface ExporterResponse {
  end: boolean;
  scrollId: string;
  fileName: string;
  hits?: Array<InnterHits>; // undefined in case of pdf & docx
  per_doc_size: number;
  total: number;
  path: string;
}
