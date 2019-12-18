import { Action } from '@ngrx/store';

export enum FiltersActionTypes {
  setFilters = '[items] SetFilters',
  getFilters = '[items] GetFilters'
}

export class GetFilters implements Action {
  readonly type = FiltersActionTypes.getFilters;
  constructor() {}
}

export class SetFilters implements Action {
  readonly type = FiltersActionTypes.setFilters;
  constructor(public payload = null) {}
}

export type FiltersActions = GetFilters | SetFilters;
