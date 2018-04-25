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

  render() {
    const posts = this.props.posts.posts;
    if (posts) {
      return (
        <div>
          {
            posts.reverse().map(
              (post) => (
                <div>
                  <Post
                    description={post.Description}
                    key={post.id}
                    title={post.Title}
                    author={post.UserId}
                    dateCreated={post.CreatedAt}
                    dateUpdated={post.UpdatedAt}
                    postId={post.id}
                    edit={this.props.edit}
                    deletePost={() => this.props.deletePost()}                  
                  />
                </div>
              )
            )
          }
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => redux.bindActionCreators({
  getPosts
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
