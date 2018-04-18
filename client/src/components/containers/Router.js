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
import { verifyCredentials } from '../../redux/modules/auth/actions.js';

// const AppComponent = (props) => {
class AppComponent extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.verifyCredentials();
  }

 render(){
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
            <Route
              exact
              path='/post'
              component={PostPage}
            />
            <Redirect from="/" exact to="/home" />
          </Switch>
        </App>
      </div>
    </Router>
  );
}
};


const mapDispatchToProps = (dispatch) =>
  redux.bindActionCreators({
    verifyCredentials
  }, dispatch);

export default connect(null, mapDispatchToProps)(AppComponent);
