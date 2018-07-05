import * as React from 'react';
import '../../../assets/styles/MyPostsPage.less';
import Header from 'components/common/header/Header.jsx';
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
        )
      )
    }
  }

  render() {
    return (
      <div className="main">
        <Header />
        <div className="content">
          <div className="list-of-articles">
            {this.renderPostList()}
          </div>
        </div>
      </div>
    );
  }
}

export default MyPostsPage;