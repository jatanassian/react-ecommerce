import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (stateCategories) => stateCategories.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    console.log("categories", categories);
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
