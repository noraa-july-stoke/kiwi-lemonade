import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import configureStore from './store';
import { csrfFetch } from './csrf';
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './App';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  // restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  // window.sessionActions = sessionActions;
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App className="app-body" />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
