import * as React from 'react';
import PropTypes from 'prop-types';
import 'assets/styles/HomePage.less';
import PostContainer from 'components/containers/post/PostContainer';
import Header from 'components/common/header/Header.jsx';
import store from '../../../redux/store';
const action =type => store.dispatch({type});

class HomePage extends React.Component {
  componentDidMount() {
    action('GET_POSTS_SAGA');
  }

  renderPosts() {
    if (this.props.posts)
      return this.props.posts.map(
        post => (
          <PostContainer
            key={post.id}
            post={post}
          />
        )
      )
  }

  render() {
    return (
      <div className="main">
        <Header />
        <div className="content">
          <div className="list-of-articles">
          {this.renderPosts()}
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.array,
};

export default HomePage;