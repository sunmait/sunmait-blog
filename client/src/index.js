import 'assets/styles/main.less';
import 'assets/images/logo.svg';

import * as React from 'react';
import {render} from 'react-dom';
import Router from 'components/containers/Router';
import {Provider} from 'react-redux';
import store from 'redux/store';

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('main'),
);
