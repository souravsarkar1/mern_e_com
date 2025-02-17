import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {reducer as authReducer} from "./Authentication/reducer"
import {reducer as producdtReducer} from "./Products/reducer"
import { reducer as adminReducer } from './Admin/reducer';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
// Combine your reducers
const rootReducer = combineReducers({
  authReducer,producdtReducer, adminReducer
});

// Configure Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
};

// Wrap your rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store using persistedReducer
export const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
