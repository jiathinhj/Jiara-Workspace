import { createSlice } from "@reduxjs/toolkit";

const groupSlice = createSlice({
  name: "group",
  initialState: {
    error: null,
    allGroup: [],
    detailGroup: {},
    isManager: false,
  },
  reducers: {
    getAllGroupSuccess: (state, action) => {
      state.allGroup = action.payload;
      // console.log(state.allGroup);
    },
    getGroupByIdSuccess: (state, action) => {
      state.detailGroup = action.payload;
    },
    getMemberStatus: (state, action) => {
      state.isManager = action.payload;
    },
  },
});

export const { getAllGroupSuccess, getGroupByIdSuccess, getMemberStatus } =
  groupSlice.actions;
export default groupSlice.reducer;
