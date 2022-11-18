import { CATEGORIES_ACTION_TYPES } from "./categories.types";

const INITIAL_STATE = {
  isLoading: false,
  categories: [],
  error: null,
};

export const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };

    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: payload, isLoading: false };

    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_ERROR:
      return { ...state, error: payload, isLoading: false };

    default:
      return state;
  }
};
