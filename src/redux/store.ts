import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import groupReducer from "./GroupSlice";
import userReducer from "./UserSlice";

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
