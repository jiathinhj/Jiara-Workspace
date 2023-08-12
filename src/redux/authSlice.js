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
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },

    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    isLoggingIn: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },

    // saveLogin: (state, action) => {
    //   state.isFetching = false;
    //   state.currentUser = action.payload;
    // }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(login.pending, (state) => {
  //     state.isFetching = true;
  //   });
  //   builder.addCase(login.fulfilled, (state, action) => {
  //     state.isFetching = false;
  //     state.user = action.payload;
  //     state.authToken = action.payload.authToken;
  //   });
  //   builder.addCase(login.rejected, (state, action) => {
  //     state.isFetching = false;
  //     state.error = action.payload;
  //   });
  // },
});

export const { loginStart, loginSuccess, loginFailure, isLoggingIn } = authSlice.actions;
export default authSlice.reducer;
// export default authSlice;
