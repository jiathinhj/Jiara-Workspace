import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    authToken: localStorage.getItem("authToken"),
    isFetching: false,
    error: false,
    currentUser: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },

    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.authToken = action.payload.token;
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },

    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;
