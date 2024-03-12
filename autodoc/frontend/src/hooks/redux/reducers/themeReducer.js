// themeReducer.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: 'light',
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});


export const { setTheme } = themeSlice.actions;
export const selectTheme = (state) => state.themeData.theme;
export default themeSlice.reducer;
