import { configureStore } from "@reduxjs/toolkit";
import waterReducer from "../features/water/waterSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    water: waterReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
