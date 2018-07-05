import * as React from 'react';
import '../../../assets/styles/MyPostsPage.less';
import Header from 'components/common/header/Header.jsx';
import Footer from 'components/common/footer/index.jsx';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Add from 'material-ui-icons/Add';
import PostContainer from 'components/containers/post/PostContainer';
import store from '../../../redux/store';
const action = type => store.dispatch({type});

class MyPostsPage extends React.Component {
  componentWillMount() {
    action('GET_POSTS_SAGA');
  }

  renderPostList = () => {
    if (this.props.posts) {
      return this.props.posts.map(
        post => (
          <div>
            <PostContainer
              description={post.Description}
              key={post.id}
              title={post.Title}
              author={post.UserId}
              dateCreated={post.CreatedAt}
              dateUpdated={post.UpdatedAt}
              postId={post.id}
              history={this.props.history}
            />
          </div>
        )
      )
    }
  }

  render() {
    return (
      <div className="main">
        <Header />
        <div className="content">
          <div>
            <div className="button-plus">
              <Link to="/addpost">
                <Button variant="raised">
                  Add new post
                  <Add />
                </Button>
              </Link>
            </div>
            <div className="list-of-articles">
              {this.renderPostList()}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MyPostsPage;