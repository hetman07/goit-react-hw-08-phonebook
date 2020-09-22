import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import phonebookReducer from "./phonebook/phonebookReducer";
import authReducer from "./auth/authReducers";

const defaultMiddleware = getDefaultMiddleware();

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    contacts: phonebookReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware: [...defaultMiddleware],
});

export const persistor = persistStore(store);
