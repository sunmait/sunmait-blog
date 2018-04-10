import * as React from 'react';
import Header from 'components/common/header/index.jsx';
import { Link } from 'react-router-dom';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Post from '../post/index.jsx';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import * as redux from 'redux';
import { getPosts } from 'redux/modules/posts/actions.js';

class Posts extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   posts: [],
    // };
  }

  componentWillMount() {
    this.props.getPosts();
    console.log("in will mount");
  }

  render() {
    // this.props.getPosts();
    // console.log("State" + state);
    let posts = [];
    posts = this.props.posts.posts;
    console.log("posts:");
    console.log(posts);
    console.log('posts[1]');
    // console.log(posts[1]);
    console.log('posts.posts');
    // console.log(posts.posts);
    console.log('posts.posts.length');
    // console.log(posts.posts.length);
    return (
      <div>
        {
          posts.forEach(
            (item, i) => (
              console.log(item)
            )
          )
        }
        {/* <Post description={posts[0].Description} /> */}
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => redux.bindActionCreators({
  getPosts
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Posts);