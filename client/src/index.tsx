import 'assets/styles/main.less';
import 'assets/images/logo.svg';

import * as React from 'react';
import {render} from 'react-dom';
import Router from 'components/containers/Router';
import {Provider} from 'react-redux';

render(
  <Provider>
    <Router />
  </Provider>,
  document.getElementById('main') as HTMLElement,
);
