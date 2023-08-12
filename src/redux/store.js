import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
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

  //  {
  //   auth: authSlice,
  //   group: groupSlice,
  // },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
