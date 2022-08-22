import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {PersistGate} from 'redux-persist/integration/react'
import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
import memReducer from './reducer'
import { Provider } from 'react-redux';
import {ToastProvider} from './context/toast'

const persistConfig={
  key:'dvt-app',
  storage
}
const persistedReducer=persistReducer(persistConfig,memReducer)
const store=configureStore({reducer:persistedReducer,
  middleware:getDefaultMiddleware({
serializableCheck:{
  ignoreActions:[
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
  ]
}
  }
)})
let persistor=persistStore(store)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
    </ToastProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
