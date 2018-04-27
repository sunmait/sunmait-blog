import * as React from 'react';
import Header from 'components/common/header/Header.jsx';
import Footer from 'components/common/footer/index.jsx';
import Post from 'components/common/post/index.jsx';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

class PostPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      postId: null,
    };
  }

  componentWillMount() {
    const postId = +this.props.location.pathname.split(':')[1];
    this.setState({
      postId,
    });
  }

  renderSelectedPost() {
    let isEditable = false;
    return this.props.posts.posts.reverse().map(
      (post) => {
        if( post.id === this.state.postId ) {
          if ( this.props.user && post.UserId === this.props.user.id) {
            isEditable = true;
          }
          return (
            <div>
              <Post
                description={post.Description}
                key={post.id}
                postId={post.id}
                title={post.Title}
                author={post.UserId}
                dateCreated={post.CreatedAt}
                dateUpdated={post.UpdatedAt}
                full={true}
                isEditable={isEditable}
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
            { this.renderSelectedPost() }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default PostPage;