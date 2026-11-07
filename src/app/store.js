import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../app/features/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});
