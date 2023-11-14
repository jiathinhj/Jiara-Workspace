import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import groupReducer from "./groupSlice";
import userReducer from "./userSlice";
import globalReducer from "./globalSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  group: groupReducer,
  user: userReducer,
  global: globalReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;

export default store;
