import * as React from 'react';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import App from 'components/common/app';

interface IProps {
}

const AppComponent = (props: IProps) => {

  return (
    <Router>
      <App>
        <Switch>
        </Switch>
      </App>
    </Router>
  );
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () =>({
});

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
