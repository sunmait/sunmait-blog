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
import PostPage from '../pages/post-page/index.jsx';
import PrivateRoute from './custom-routes/PrivateRoute.jsx';
import store from '../../redux/store';
const action = type => store.dispatch({type});

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    action('VERIFY_CREDENTIALS_SAGA');
    action('GET_USERS_SAGA');
    action('GET_POSTS_SAGA');
  }

  render() {
    return (
      <Router history={history}>
          <App>
            <Switch>
              <Route
                exact
                path='/home'
                component={HomePage}
                history={this.props.history}
              />
              <Route
                exact
                path='/profile/:userId'
                history={this.props.history}
                component={ProfilePage}
              />
              <Route
                exact
                path='/myposts'
                history={this.props.history}
                component={MyPostsPage}
              />
              <PrivateRoute
                exact
                path='/addpost'
                auth={this.props.auth}
                history={this.props.history}
                component={AddPostPage}
              />
              <PrivateRoute
                exact
                path='/addpost/:postId'
                auth={this.props.auth}
                history={this.props.history}
                component={AddPostPage}
              />
              <Route
                exact
                path='/post/:postId'
                history={this.props.history}
                component={PostPage}
              />
              <Redirect from="/" exact to="/home" />
            </Switch>
          </App>
      </Router>
    );
  }
};

const mapStateToProps = (state) => ({
  auth: state.user
});

export default connect(mapStateToProps)(AppComponent);
