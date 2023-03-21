import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { LanguageProvider } from './contexts/language-context';
import App from './App';
import store from './redux/store';
import './index.scss';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </Provider>
);
