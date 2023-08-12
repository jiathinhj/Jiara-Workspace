import { createSlice } from "@reduxjs/toolkit";

const groupSlice = createSlice({
  name: "group",
  initialState: {
    isFetching: false,
    error: null,
    allGroup: [],
    detailGroup: {},
    isManager: false,
  },
  reducers: {
    getGroupStart: (state) => {
      state.isFetching = true;
    },
    getAllGroupSuccess: (state, action) => {
      state.isFetching = false;
      state.allGroup = action.payload;
      // console.log(state.allGroup);
    },

    getGroupFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    getGroupByIdSuccess: (state, action) => {
      state.isFetching = false;
      state.detailGroup = action.payload;
    },
    getMemberStatus: (state, action) => {
      state.isFetching = false;
      state.isManager = action.payload;
    },
  },
});

export const {
  getGroupStart,
  getAllGroupSuccess,
  getGroupByIdSuccess,
  getGroupFailure,
  getMemberStatus
} = groupSlice.actions;
export default groupSlice.reducer;
