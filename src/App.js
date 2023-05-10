import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import Router from './router';

import AppProvider from './context/App';

import style from './app.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={style.app}>
        <AppProvider>
          <Router />
        </AppProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
