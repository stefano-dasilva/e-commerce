import { configureStore } from "@reduxjs/toolkit";
import ActionSlice from "../features/ActionSlice";

const store = configureStore({
  reducer: {
    action_slice: ActionSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
