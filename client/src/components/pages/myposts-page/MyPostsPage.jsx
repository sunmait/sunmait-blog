import * as React from 'react';
import '../../../assets/styles/MyPostsPage.css';
import Header from 'components/common/header/Header.jsx';
import Footer from 'components/common/footer/index.jsx';
import Post from 'components/common/post/index.jsx';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Add from 'material-ui-icons/Add';
import store from '../../../redux/store';
const action = type => store.dispatch({type});

class MyPostsPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount(){
    action('GET_POSTS_SAGA');
  }

  renderPostList = () => {
    if( this.props.posts.posts ) {
      return this.props.posts.posts.reverse().filter((post) => post.UserId === this.props.user.user.id).map(
        (post) => (
          <div>
            <Post
              description={post.Description}
              key={post.id}
              title={post.Title}
              author={post.UserId}
              dateCreated={post.CreatedAt}
              dateUpdated={post.UpdatedAt}
              edit={this.props.user}
              postId={post.id}
              fromPost={true}
              history={this.props.history}
            />
          </div>
        )
      )
    }
  }

  render() {
    return (
      <div className="main">
        <Header />
        <div className="content">
          <div>
            <div className="button-plus">
              <Link to="/addpost">
                <Button variant="raised" >
                  Add new post 
                  <Add />
                </Button>
              </Link>
            </div>
            { this.renderPostList() }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MyPostsPage;