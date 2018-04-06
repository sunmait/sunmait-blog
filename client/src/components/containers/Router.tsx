import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as redux from 'redux';
import App from '../common/app/index';
import LoginPage from '../pages/login-page';
import MainPage from '../pages/main-page';
import AppPage from '../pages/app-page';
import { IAuthState } from 'redux/modules/login/reducer';
import PrivateRoute from './custom-routes/PrivateRoute';
import { IStore } from 'redux/rootReducer';
import { Dispatch } from 'redux/store';

interface IProps {
  auth: IAuthState;
}

// const AppComponent = (props: IProps) => {
const AppComponent = (props: IProps) => {
  const { auth } = props;

  return (
      <Router>
        <AppPage>
          <div className="app-container">
            <App>
              <Switch>
                <PrivateRoute
                  exact
                  path='/login'
                  auth={auth}
                  component={LoginPage}
                />
                <Route
                  exact
                  path='/main'
                  component={MainPage}
                />
                <Redirect from="/" exact to="/main" />
              </Switch>
            </App>
          </div>
        </AppPage>
      </Router>
  );
};

const mapStateToProps = (state: IStore) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  redux.bindActionCreators({}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
