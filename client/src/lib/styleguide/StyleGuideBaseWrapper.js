import React from 'react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({});

const Wrapper = props => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>{props.children}</Provider>
    </MuiThemeProvider>
  );
};

export default Wrapper;
