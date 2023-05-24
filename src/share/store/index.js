import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';

const store = configureStore({
  reducer: rootReducer,
});

window.__STORE__ = store;

export default store;
