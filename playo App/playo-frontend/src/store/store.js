import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk'; // Correct named import
import authReducer from '../slices/authSlice';
import eventsReducer from '../slices/eventsSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'events'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    events: eventsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable warnings for Redux Persist
        }).concat(thunk),
});

export const persistor = persistStore(store);
