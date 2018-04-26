import * as React from 'react';
import Header from 'components/common/header/Header.jsx';
import { Link } from 'react-router-dom';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Post from '../post/index.jsx';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import * as redux from 'redux';
import { getPosts, deletePost } from 'redux/modules/posts/actions.js';
import { getUser } from 'redux/modules/profile/actions.js';

class Posts extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.getPosts()
      .catch((err) => {
        console.log(err);
      })
  }

  renderEditable = (posts) => {
    return (
      <div>
        {
          posts.reverse().map(
            (post) => (
              <div>
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
                />
              </div>
            )
          )
        }
      </div>
    );
  }

  renderNotEditable = (posts) => {
    return (
      <div>
        {
          posts.reverse().map(
            (post) => (
              <div>
                <Post
                  description={post.Description}
                  key={post.id}
                  postId={post.id}
                  title={post.Title}
                  author={post.UserId}
                  dateCreated={post.CreatedAt}
                  dateUpdated={post.UpdatedAt}
                />
              </div>
            )
          )
        }
      </div>
    );
  }

  renderEditableOrNot = () => {
    const posts = this.props.posts.posts;
    if (posts) {
      if (this.props.isEditable) {
        return this.renderEditable(posts);
    } else {
      return this.renderNotEditable(posts);
    }
    } else {
      return (
        <div />
      );
    }
  }


  render() {
    return this.renderEditableOrNot();
  }
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  profile: state.profile.profile,
});

const mapDispatchToProps = (dispatch) => redux.bindActionCreators({
  getPosts,
  getUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
