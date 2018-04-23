import * as React from 'react';
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
    this.props.deletePost(this.props.postId);
    this.setState({
      referrer: '/home'
    });
  }

  componentDidMount() {
    let text = myMarkdown(this.props.description);
    if(text.length > 200){
      text = text.slice(0, 200);
    }
    document.getElementById(this.props.title).innerHTML = 
      text + '...';
  }

  render() {
    const { referrer } = this.state;
    if (referrer) return <Redirect to={referrer} />;

    const createdDate = this.props.dateCreated.substring(0, 4) + " " +
    this.props.dateCreated.substring(5, 7) + " " +
    this.props.dateCreated.substring(8, 10) + " " +
    this.props.dateCreated.substring(11, 19);

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
                  <Link to="/post">
                    {this.props.title}
                  </Link>                
                  {
                    this.props.edit ?
                      (<div className="edit-buttons">
                      <Link to={postId} >
                      <IconButton mini>
                        <Edit />
                      </IconButton>
                      </Link>
                      <IconButton  aria-label="delete" className="delete" onClick={() => this.handleDeletePost()}>
                        <DeleteIcon />
                      </IconButton>
                      </div>)
                    : null                    
                  }
                </div>
              </Typography>
              <Typography color="textSecondary" className="article-author">
                  <br /><p>
                    Author:
                  <Link to="/profile">
                     TODO: GET request to get data about user
                  </Link>  
                  </p>
                  <p>Created: {createdDate}</p><br />
              </Typography>            
              <section className="article-description">
                <div>
                  <Typography color="textSecondary">                    
                    <br /><div id={this.props.title}>                    
                    </div>
                  </Typography>
                </div>
              </section>             
            </CardContent>
            <CardActions className="more-button">
              <Link to="/post">
                <Button size="small">
                  Learn More...
                </Button>
              </Link>
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
  author: 'none',
  title: 'Default title'
  // edit: false
};


const mapDispatchToProps = (dispatch) => redux.bindActionCreators({
  deletePost
}, dispatch);

export default connect(null, mapDispatchToProps)(Post); 

//export default Post;
