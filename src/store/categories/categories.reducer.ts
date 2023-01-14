import { CATEGORIES_ACTION_TYPES } from "./categories.types";
import { CategoryAction } from "./categories.action";

const INITIAL_STATE = {
  isLoading: false,
  categories: [],
  error: null,
};

export const categoriesReducer = (state = INITIAL_STATE, action = {} as CategoryAction) => {

  switch (action.type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };

    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload, isLoading: false };

    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL:
      return { ...state, error: action.payload, isLoading: false };

    default:
      return state;
  }
};
