export interface DocxData {
  publications: Array<Partial<Publication>>;
}

export interface Publication {
  id: string;
  title: string;
  identifier_status: string;
  identifier_citation: string;
  type: string;
  format: Array<string>;
  subject: string;
  date_issued: string;
  contributor_crp: string;
  altmetric: string;
  identifier_uri: string;
  isMELSPACE: boolean;
}
