import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../https.js";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (userToken, thunkAPI) => {
    try {
      const response = await http.get("/user/get-profile", {
        headers: {
          Authorization: `${userToken}`,
        },
      });
      return response.data.user;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  userName: null,
  userAvatar: null,
  userManeger: null,
  userToken: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.userToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.userName = action.payload.fullName;
      state.userAvatar = action.payload.avatar;
      state.userManeger = action.payload.maneger;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { setToken } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
