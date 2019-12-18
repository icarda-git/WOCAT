import { Action } from '@ngrx/store';

export enum QueryActionTypes {
  setQuery = '[items] SetQuery',
  getQuery = '[items] GetQuery'
}

export class GetQuery implements Action {
  readonly type = QueryActionTypes.getQuery;
  constructor() {}
}

export class SetQuery implements Action {
  readonly type = QueryActionTypes.setQuery;
  constructor(public payload = null) {}
}

export type QueryActions = GetQuery | SetQuery;
