import React from 'react';
import ReactDOM from 'react-dom';
import {  ThemeProvider } from '@mui/material/styles';

import './index.css';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from './AppTheme';



ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={AppTheme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
