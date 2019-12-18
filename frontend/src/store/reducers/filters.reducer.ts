import * as actions from 'src/store/actions/filters.actions';
export interface FiltersState {
  body: any;
}
const initialState: FiltersState = {
  body: null
};

export function reducer(
  state = initialState,
  action: actions.FiltersActions
): FiltersState {
  switch (action.type) {
    case actions.FiltersActionTypes.setFilters: {
      const body = action.payload;
      return {
        ...state,
        body
      };
    }
    default: {
      return state;
    }
  }
}

export const getFiltersBody = (state: FiltersState) => state.body;
