import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import groupReducer from "./Slice/groupSlice";
import userReducer from "./Slice/userSlice";
import globalReducer from "./Slice/globalSlice";

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
