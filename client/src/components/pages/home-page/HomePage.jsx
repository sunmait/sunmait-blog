import React from 'react';
import PropTypes from 'prop-types';
import PostsList from '../../containers/postsList';
import Loader from '../../common/loader';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPostsFirstLoad: true,
    };
  }

  componentDidMount() {
    if (this.props.numberOfPosts) {
      this.props.clearPostsList();
    }

    this.props.getPosts(12, 0);
    window.addEventListener('scroll', this.handlerScrollToBottom);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handlerScrollToBottom);
    this.props.setPostsFetchingStatus(true);
  }

  handlerScrollToBottom = () => {
    if (
      this.props.numberOfPosts &&
      !this.props.isNoMorePosts &&
      document.documentElement.clientHeight + window.scrollY === document.body.scrollHeight
    ) {
      if (this.state.isPostsFirstLoad) {
        this.setState({
          isPostsFirstLoad: false,
        });
      }
      this.props.getPosts(3, this.props.numberOfPosts);
    }
  };

  render() {
    return (
      <div className="content-wrapper content-wrapper--with-grey-background">
        <div className="content">
          {this.props.postsFetchingStatus && this.state.isPostsFirstLoad ? (
            <Loader />
          ) : (
            <PostsList posts={this.props.posts} />
          )}
          {!this.state.isPostsFirstLoad && this.props.postsFetchingStatus && <Loader classModifiers={['small']} />}
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.array,
  setPostsFetchingStatus: PropTypes.func.isRequired,
};

export default HomePage;
