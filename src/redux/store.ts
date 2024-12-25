import { configureStore } from "@reduxjs/toolkit";
import chartConfigSlice from "./slices/chartConfigSlice";

export const store = configureStore({
  reducer: {
    chartConfig:chartConfigSlice
  },
});
