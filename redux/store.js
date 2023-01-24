import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { allApi } from "./services/quiz.services";

export const store = configureStore({
  reducer: {
    [allApi.reducerPath]: allApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(allApi.middleware),
});

setupListeners(store.dispatch);
