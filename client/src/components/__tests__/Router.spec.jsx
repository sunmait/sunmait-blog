import * as React from 'react';
import { shallow } from 'enzyme';

import AppComponent from '../containers/Router';

describe('Router component', () => {
  test("renders the Router component with <div className='app-container'></div>", () => {
    const result = shallow(<AppComponent />).contains(<div className="app-container" />);
    expect(result).toBeTruthy();
  });
});
