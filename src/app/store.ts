import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import todoReducer from "../features/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
