import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    allUser: null,
    isFetching: false,
    error: null,
    filterUserChange: "",
  },
  reducers: {
    getUserStart: (state) => {
      state.isFetching = true;
    },
    getAllUserSuccess: (state, action) => {
      state.isFetching = false;
      state.allUser = action.payload;
      // console.log(state.allUser);
    },

    getUserFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    // getUserProfile: (state, action) => {
    //   state.isFetching = false;
    //   state.profile = action.payload;
    // },

    // filterUserChange: (state, action) => {
    //   state.filterUserChange = action.payload;
    // },
  },
});

export const {
  getUserStart,
  getAllUserSuccess,
  getUserFailure,
  filterUserChange,
} = userSlice.actions;
export default userSlice.reducer;
