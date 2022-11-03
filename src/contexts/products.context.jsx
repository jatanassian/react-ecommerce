import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // // CREATE THE COLLECTIONS/DOCUMENTS IN FIREBASE FOR THE PRODUCTS/CATEGORIES.
  // // UNCOMMENT ONLY IF REVAMP OF THE PRODUCTS/CATEGORIES
  // // ADD THE IMPORT STATEMENTS, RUN IT ONCE, THEN COMMENT AGAIN
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
