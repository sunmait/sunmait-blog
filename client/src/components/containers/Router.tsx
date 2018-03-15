import * as React from 'react';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import App from '../common/app/index';

interface IProps {
}

const AppComponent = (props: IProps) => {

  return (
    <Router>
      <div className="app-container">
        <App>
          <Switch>
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
