import * as React from 'react';
import 'assets/styles/Post.less';
import Header from 'components/common/header/Header.jsx';
import { Link } from 'react-router-dom';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import DeleteIcon from 'material-ui-icons/Delete';
import { deletePost } from 'redux/modules/posts/actions.js';
import Edit from 'material-ui-icons/Edit';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as redux from 'redux';

const myMarkdown = require('marked');

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      referrer: null
    }
  }

  handleDeletePost(e) {
    this.props.deletePost(this.props.postId)
      .then((res) => {
        this.props.history.push('/home');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderIcons = (postId) => {
    if(this.props.user && (this.props.isEditable || this.props.user.id === this.props.author)) {
      return (
        <div className="edit-buttons">
          <Link to={postId} >
            <IconButton mini>
              <Edit />
            </IconButton>
          </Link>
          <IconButton
            aria-label="delete"
            className="delete"
            onClick={() => this.handleDeletePost()}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )
    }
  }

  renderAuthorAndUpdated(updatedDate, createdDate) {
    const updated = !this.props.isEditable ? (<p>Updated: {updatedDate}</p>) : null;
    return (
      <p>
        Author:
        <Link to={`/profile/:${this.props.author}`}>
          {this.props.users[this.props.author]}
        </Link>
        { updated }
        <p>Created: {createdDate}</p><br />
      </p>
    )
  }

  renderLearnMore() {
    if( !this.props.full ){
      return (
        <Link to={`/post/:${this.props.postId}`}>
          <Button size="small">
            Learn More...
          </Button>
        </Link>
      )
    }
  }

  componentDidMount() {
    let text = myMarkdown(this.props.description);
    let multidot = '';
    if (!this.props.full && text.length > 50) {
      text = text.slice(0, 50);
      multidot = '...';
    }
    document.getElementById(this.props.title).innerHTML = text + multidot;
  }

  render() {
    const createdDate = this.props.dateCreated.substring(0, 4) + " " +
    this.props.dateCreated.substring(5, 7) + " " +
    this.props.dateCreated.substring(8, 10);

    const updatedDate = this.props.dateUpdated.substring(0, 4) + " " +
    this.props.dateUpdated.substring(5, 7) + " " +
    this.props.dateUpdated.substring(8, 10) + " " +
    this.props.dateUpdated.substring(11, 19);
    const postId = '/addPost/:' + this.props.postId;

    return (
      <div className="article-container" key={this.props.key}>
        <div className="article">
          <Card>
            <CardContent>
              <Typography color="textSecondary">
                <div className="article-title">
                  <Link to={`/post/:${this.props.postId}`}>
                    {this.props.title}
                  </Link>
                  {this.renderIcons(postId)}
                </div>
              </Typography>
              
                <Typography color="textSecondary" className="article-author">
                { this.renderAuthorAndUpdated(updatedDate, createdDate) }                
                </Typography>
              <section className="article-description">
                <div>
                  <Typography color="textSecondary">
                    <br />
                    <div id={this.props.title}/>
                  </Typography>
                </div>
              </section>
            </CardContent>
            <CardActions className="more-button">
              { this.renderLearnMore()}
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
};

Post.defaultProps = {
  dateUpdated: 'none',
  dateCreated: 'none',
  description: 'Default description',
  title: 'Default title',
  full: false
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  profile: state.profile.profile,
  users: state.profile.usersById,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => redux.bindActionCreators({
  deletePost
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Post); 
