import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './app/store';
import { Provider } from 'react-redux';
import './index.css';
import Sidebar from './components/navbar';
import PageRoutes from './pageRoutes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Sidebar />
      <PageRoutes />
    </Provider>
  </React.StrictMode>
);
