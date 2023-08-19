import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./authSlice";
import groupReducer from "./groupSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  group: groupReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;

export default store;
