import 'assets/styles/main.less';
import 'assets/images/logo.svg';

import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

render(
  <Provider>
    <p>Hello, world!</p>
  </Provider>,
  document.getElementById('main') as HTMLElement,
);
