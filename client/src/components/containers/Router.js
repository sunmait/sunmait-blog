import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as redux from 'redux';
import history from './history';
import App from '../common/app/index.jsx';
import HomePage from '../pages/home-page/index.jsx';
import ProfilePage from '../pages/profile-page/index.jsx';
import MyPostsPage from '../pages/myposts-page/index.jsx';
import AddPostPage from '../pages/addpost-page/index.jsx';

const AppComponent = (props) => {

  return (
      <Router history={history}>
          <div className="app-container">
            <App>
              <Switch>
                <Route
                  exact
                  path='/home'
                  component={HomePage}
                />
                <Route
                  exact
                  path='/profile'
                  component={ProfilePage}
                />
                <Route
                  exact
                  path='/myposts'
                  component={MyPostsPage}
                />
                <Route
                  exact
                  path='/addpost'
                  component={AddPostPage}
                />
                <Redirect from="/" exact to="/home" />
              </Switch>
            </App>
          </div>
      </Router>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) =>
  redux.bindActionCreators({}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
