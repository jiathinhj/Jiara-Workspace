import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    allUser: null,
    isFetching: false,
    error: null,
  },
  reducers: {
    getUserStart: (state) => {
      state.isFetching = true;
    },
    getAllUserSuccess: (state, action) => {
      state.isFetching = false;
      state.allUser = action.payload;
    },

    getUserFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { getUserStart, getAllUserSuccess, getUserFailure } =
  userSlice.actions;
export default userSlice.reducer;
