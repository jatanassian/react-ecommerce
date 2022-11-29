import { compose, createStore, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // User value is coming from auth state listener, we can blacklist it
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
  // thunk,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
