// store.js

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer.js";
import themeReducer from "./reducers/themeReducer.js";

const store = configureStore({
  reducer: {
    userData: userReducer,
    theme: themeReducer,
  },
});

export default store;
