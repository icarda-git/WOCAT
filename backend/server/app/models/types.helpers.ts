export type FileType = 'pdf' | 'docx' | 'xlsx';

export interface BodyRequest {
  type: FileType;
  scrollId: string;
  query: any;
  part: number;
}
