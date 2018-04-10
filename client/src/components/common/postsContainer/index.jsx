import * as React from 'react';
<<<<<<< HEAD
import Header from 'components/common/header/Header.jsx';
=======
import Header from 'components/common/header/index.jsx';
>>>>>>> 82362fe... new structure
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
<<<<<<< HEAD
=======
    // this.state = {
    //   posts: [],
    // };
>>>>>>> 82362fe... new structure
  }

  componentWillMount() {
    this.props.getPosts();
<<<<<<< HEAD
  }

  render() {
    const posts = this.props.posts.posts;
    if (posts) {
      return (
        <div>
          {
            posts.map(
              (item) => (
                <div>
                  <Post description={item.Description} key={item.id} title={item.Title}/>
                </div>
              )
            )
          }
        </div>
      );
    } else {
      return (
        <div>
          <p> no posts</p>
        </div>
      );
    }
=======
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
>>>>>>> 82362fe... new structure
  }
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => redux.bindActionCreators({
  getPosts
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Posts);