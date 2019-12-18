import * as actions from 'src/store/actions/query.actions';
import { ElasticsearchQuery } from 'src/app/filters/services/interfaces';
export interface QueryState {
  body: ElasticsearchQuery;
}

const initialState: QueryState = {
  body: null,
};

export function reducer(
  state = initialState,
  action: actions.QueryActions
): QueryState {
  switch (action.type) {
    case actions.QueryActionTypes.setQuery: {
      const body = action.payload;
      return {
        ...state,
        body,
      };
    }
    default: {
      return state;
    }
  }
}

export const getQueryBody = (state: QueryState): ElasticsearchQuery =>
  state.body;
export const getQueryFromBody = (body: ElasticsearchQuery): object =>
  body.query;
