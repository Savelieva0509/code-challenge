import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App/App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/code-challenge-liudmyla-babenko/src/problem2/fancy-form">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
