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
    // TODO change to this.props.match.params.userId after removing ':' from url
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
            <div>
              <PostContainer
                key={post.id}
                post={post}
                isPreviewVersion={false}
              />
            </div>
          )
        }
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
  posts: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default PostPage;