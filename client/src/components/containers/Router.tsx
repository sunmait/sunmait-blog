import * as React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import App from '../common/app/index';
import Hello from '../Hello';

interface IProps {
}

const AppComponent = (props: IProps) => {

  return (
    <Router>
      <div className="app-container">
        <App>
          <Switch>
            <Route exact path='/' component={Hello}/>
          </Switch>
        </App>
      </div>
    </Router>
  );
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () =>({
});

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
