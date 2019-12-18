import { ViewState } from '../reducers/items.reducer';
import { HttpErrorResponse } from '@angular/common/http';
import { ActionTypes } from './items.actions';

export interface InView {
  id: string;
  viewState: ViewState;
}

export interface ESHttpError {
  type: ActionTypes;
  error: HttpErrorResponse;
}
