import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { LanguageProvider } from './contexts/language-context';
import App from './App';
import store from './redux/store';
import 'normalize.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </Provider>
  </React.StrictMode>
);
