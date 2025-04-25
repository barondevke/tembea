import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlicer";
import verificationReducer from "./verificationSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    verification: verificationReducer
  },
});

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;