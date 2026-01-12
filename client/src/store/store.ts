import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/auth.ts";
import { apiSlice } from "./slices/apiSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
