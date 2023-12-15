import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import loginReducer from "../reducer/loginReducer";
import mainReducer from "../reducer/campeggioReducer";
import campeggioReducer from "../reducer/campeggioReducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
  transforms: [],
};
const mainReducers = combineReducers({
  login: loginReducer,
  reducer: mainReducer,
  campeggio: campeggioReducer,
});
const persistedReducer = persistReducer(persistConfig, mainReducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
