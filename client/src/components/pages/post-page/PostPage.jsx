import React from 'react';
import PropTypes from 'prop-types';
import PostContainer from 'components/containers/post/PostContainer';

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: null
    };
  }

  componentDidMount() {
    this.getPostId();
    this.props.getPosts();
  }

  getPostId() {
    const postId = +this.props.location.pathname.split(':')[1];
    this.setState({postId});
  }

  renderSelectedPost() {
    let isEditable = false;
    const {posts, user} = this.props;

    if (!posts) {
      return;
    }

    return posts.map(post => {
        if (post.id === this.state.postId) {
          if (user && post.UserId === user.id) {
            isEditable = true;
          }
          return (
            <PostContainer
              key={post.id}
              post={post}
              isPreviewVersion={false}
            />
          );
        }
        return false;
      }
    )
  }

  render() {
    return (
      <div>
        { this.renderSelectedPost() }
      </div>
    );
  }
}

PostContainer.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default PostPage;