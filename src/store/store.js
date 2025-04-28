import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // ✅ Correct
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from '../reducer/rootReducer';
const stores = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
export {stores};
