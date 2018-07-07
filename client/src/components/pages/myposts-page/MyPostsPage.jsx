import * as React from 'react';
import '../../../assets/styles/MyPostsPage.css';
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
            key={post.id}
            post={post}
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