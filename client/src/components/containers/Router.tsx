import * as React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import App from 'components/common/app';
import TestsComponent from 'components/TestsComponent';

const AppComponent = () => {

  return (
    <Router>
      <App>
        <Switch>
          <Route path='/' component={TestsComponent}/>
        </Switch>
      </App>
    </Router>
  );
};

export default AppComponent;
