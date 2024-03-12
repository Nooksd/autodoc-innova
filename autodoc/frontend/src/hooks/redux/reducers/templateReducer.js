import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../https.js";

export const fetchDocumentTemplates = createAsyncThunk(
  "user/fetchDocumentTemplates",
  async (userToken, thunkAPI) => {
    try {
      const response = await http.get("/doc/get-templates", {
        headers: {
          Authorization: `${userToken}`,
        },
      });
      return response.data.documents;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  templates: null,
  status: "idle",
  error: null,
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDocumentTemplates.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchDocumentTemplates.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.templates = action.payload; 
    });
    builder.addCase(fetchDocumentTemplates.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectTemplate = (state) => state.template;
export default templateSlice.reducer;
