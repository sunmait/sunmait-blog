import * as React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/common/header/Header.jsx';
import PostContainer from 'components/containers/post/PostContainer';

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: null
    };
  }

  componentDidMount() {
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
      <div className="main">
        <Header />
        <div className="content">
          <div>
            {this.renderSelectedPost()}
          </div>
        </div>
      </div>
    );
  }
}

PostContainer.propTypes = {
  posts: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default PostPage;