import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dialog: false,
};

const GeneralSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    open: (state) => {
      state.dialog = true;
    },
    close: (state) => {
      state.dialog = false;
    },
  },
});
export const { open, close } = GeneralSlice.actions;
export default GeneralSlice.reducer;
