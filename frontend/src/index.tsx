import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { restoreCSRF, csrfFetch } from './store/csrf';
import configureStore from './store';
import * as sessionActions from './store/session';
import './index.css';


const store = configureStore();

if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  restoreCSRF();
  (window as any).csrfFetch = csrfFetch;
  (window as any).store = store;
  (window as any).sessionActions = sessionActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
