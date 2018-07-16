import 'assets/styles/main.css';
import 'assets/images/logo.svg';

import React from 'react';
import {render} from 'react-dom';
import Router from 'components/containers/Router';
import {Provider} from 'react-redux';
import store from 'redux/store';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#2f80ed',
      main: '#2f80ed',
      dark: '#2f80ed',
    },
    secondary: {
      light: '#757575',
      main: '#757575',
      dark: '#757575',
    }
  },
});

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
