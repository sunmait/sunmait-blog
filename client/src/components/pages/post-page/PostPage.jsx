import * as React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/common/header/Header.jsx';
import Footer from 'components/common/footer/index.jsx';
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
                description={post.Description}
                key={post.id}
                postId={post.id}
                title={post.Title}
                author={post.UserId}
                dateCreated={post.CreatedAt}
                dateUpdated={post.UpdatedAt}
                isPreviewVersion={false}
                isEditable={isEditable}
                history={this.props.history}
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
        <Footer />
      </div>
    );
  }
}

PostContainer.propTypes = {
  posts: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default PostPage;