import React from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history';
import App from '../common/app/index.jsx';
import HomePage from '../pages/home-page/index.jsx';
import ProfilePage from '../pages/profile-page/index.jsx';
import MyPostsPage from '../pages/myposts-page/index.jsx';
import AddPostPage from '../pages/add-post-page/index.jsx';
import PostPage from '../pages/post-page/index.jsx';
import PrivateRoute from './custom-routes/PrivateRoute.jsx';
import {getUsers} from 'redux/modules/profile/actions';
import {verifyCredentials} from 'redux/modules/auth/actions';

class AppComponent extends React.Component {
  componentDidMount() {
    this.props.verifyCredentials();
    this.props.getUsers();
  }

  render() {
    if (this.props.auth.isCredentialsChecked) {
      return (
        <Router history={history}>
            <App>
              <Switch>
                <Route
                  exact
                  path='/home'
                  component={HomePage}
                />
                <Route
                  exact
                  path='/profile/:userId'
                  component={ProfilePage}
                />
                <Route
                  exact
                  path='/myposts'
                  component={MyPostsPage}
                />
                <PrivateRoute
                  exact
                  path='/addpost'
                  auth={this.props.auth}
                  component={AddPostPage}
                />
                <PrivateRoute
                  exact
                  path='/addpost/:postId'
                  auth={this.props.auth}
                  component={AddPostPage}
                />
                <Route
                  exact
                  path='/post/:postId'
                  component={PostPage}
                />
                <Redirect from="/" exact to="/home" />
              </Switch>
            </App>
        </Router>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => ({
  auth: state.user
});

const mapDispatchToProps ={
  getUsers,
  verifyCredentials
};

AppComponent.propTypes = {
  getUsers: PropTypes.func.isRequired,
  verifyCredentials: PropTypes.func.isRequired,
};

export default connect(mapStateToProps,mapDispatchToProps)(AppComponent);
