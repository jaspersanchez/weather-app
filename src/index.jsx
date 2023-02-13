import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/style.css';
import App from './App';
import LocaleProvider from './LocaleProvider';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <LocaleProvider>
    <App />
  </LocaleProvider>,
);
