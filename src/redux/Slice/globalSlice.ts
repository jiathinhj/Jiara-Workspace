import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  isShowDialog: false,
  searchText: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIsShowDialog: (state, action) => {
      state.isShowDialog = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { setLoading, setIsShowDialog, setSearchText } =
  globalSlice.actions;
export default globalSlice.reducer;
