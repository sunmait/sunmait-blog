import React from 'react';
import PropTypes from 'prop-types';
import PostsList from 'components/common/postsList';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <div className="content--with-grey-background">
        <div className="content">
          <PostsList posts={this.props.posts} />
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
