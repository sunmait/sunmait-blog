import React from 'react';
import PropTypes from 'prop-types';
import PostsList from 'components/common/postsList';
import Loader from 'components/common/loader';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getPosts();
  }

  componentWillUnmount() {
    this.props.setPostsFetchingStatus(true);
  }

  render() {
    return (
      <div className="content-wrapper content-wrapper--with-grey-background">
        <div className="content">
          {this.props.postsFetchingStatus ? <Loader /> : <PostsList posts={this.props.posts} />}
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
