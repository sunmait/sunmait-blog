import React from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

import history from './history';
import App from './app/index.jsx';
import { HomePageContainer } from 'components/pages/home-page';
import ProfilePage from '../pages/profile-page/index.jsx';
import AddPostPage from '../pages/add-post-page/index.jsx';
import PostPage from '../pages/post-page/index.jsx';
import PrivateRoute from './custom-routes/PrivateRoute.jsx';
import { ChatPage } from '../pages/chat-page/ChatPage'
import { getUsers } from 'redux/modules/profile/profileActions';
import { verifyCredentials } from 'redux/modules/auth/actions';

import '../common/toast/toast.css';

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
              <Route exact path="/home" component={props => <HomePageContainer {...props} /> } />
              <Route path="/profile/:userId" component={props => <ProfilePage auth={this.props.auth} { ...props} /> } />
              <PrivateRoute exact path="/addpost" auth={this.props.auth} component={props => <AddPostPage {...props} /> } />
              <PrivateRoute exact path="/addpost/:postId" auth={this.props.auth} component={props => <AddPostPage {...props} /> } />
              <PrivateRoute exact path="/chat" auth={this.props.auth} component={props => <ChatPage {...props} /> } />
              <Route exact path="/post/:postId" component={props => <PostPage {...props} /> } />
              <Redirect from="/" exact to="/home" />
            </Switch>

            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_CENTER} />
          </App>
        </Router>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  auth: state.user,
});

const mapDispatchToProps = {
  getUsers,
  verifyCredentials,
};

AppComponent.propTypes = {
  getUsers: PropTypes.func.isRequired,
  verifyCredentials: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);
