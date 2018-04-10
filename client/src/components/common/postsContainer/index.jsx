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
<<<<<<< HEAD
=======
    // this.state = {
    //   posts: [],
    // };
>>>>>>> 82362fe... new structure
=======
>>>>>>> fbb2a31... posts info dispatched
  }

  componentWillMount() {
    this.props.getPosts();
<<<<<<< HEAD
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
=======
>>>>>>> fbb2a31... posts info dispatched
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
<<<<<<< HEAD
          )
        }
        {/* <Post description={posts[0].Description} /> */}
      </div>
    );
>>>>>>> 82362fe... new structure
=======
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
>>>>>>> fbb2a31... posts info dispatched
  }
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => redux.bindActionCreators({
  getPosts
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Posts);