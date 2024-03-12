// store.js

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer.js";
import themeReducer from "./reducers/themeReducer.js";
import templateReducer from "./reducers/templateReducer.js";

const store = configureStore({
  reducer: {
    userData: userReducer,
    theme: themeReducer,
    template: templateReducer,
  },
});

export default store;
