import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';

import './index.css';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from './AppTheme';
import { rootReducer } from './redux/rootReducer';
// import { uiReducer } from './redux/uiReducer';

const store = createStore(rootReducer, compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={AppTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
