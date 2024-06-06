import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthSlice, { AuthState } from './slice/AuthSlice';
import UserSlice, { UserState } from '~/store/slice/UserSlice';

const persistConfig = {
  key: 'root',
  storage
};

export interface RootState {
  Auth: AuthState;
  User: UserState;
}

const rootReducer = combineReducers({
  Auth: AuthSlice,
  User: UserSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export function getState() {
  return store.getState();
}

export const persistor = persistStore(store);
