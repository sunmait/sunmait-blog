import * as React from 'react';
import Header from 'components/common/header/Header.jsx';
import { Link } from 'react-router-dom';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Post from 'components/common/post/index.jsx';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import * as redux from 'redux';
import store from '../../../redux/store';
const action = type => store.dispatch({type});

class Posts extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    action('GET_POSTS_SAGA');
  }

  renderEditablePost = (posts) => {
    return (
      <div className="list-of-articles">
        {
          posts.reverse().map(
            (post) => (
              <Post
                description={post.Description}
                key={post.id}
                postId={post.id}
                title={post.Title}
                author={post.UserId}
                dateCreated={post.CreatedAt}
                dateUpdated={post.UpdatedAt}
                isEditable={true}
                deletePost={() => this.props.deletePost()}
                history={this.props.history}
              />
            )
          )
        }
      </div>
    );
  }

  renderNotEditablePost = (posts) => {
    return (
      <div className="list-of-articles">
        {
          posts.reverse().map(
            (post) => (
              <Post
                key={post.id}
                postId={post.id}
                title={post.Title}
                description={post.Description}
                author={post.UserId}
                isEditable={true}
                dateCreated={post.CreatedAt}
                dateUpdated={post.UpdatedAt}
                history={this.props.history}
              />
            )
          )
        }
      </div>
    );
  }

  renderPostsList = () => {
    const posts = this.props.posts.posts;
    if (posts) {
      if (this.props.isEditable) {
        return this.renderEditablePost(posts);
    } else {
      return this.renderNotEditablePost(posts);
    }
    } else {
      return (
        <div />
      );
    }
  }

  render() {
    return this.renderPostsList();
  }
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  profile: state.profile.profile
});

export default connect(mapStateToProps)(Posts);
