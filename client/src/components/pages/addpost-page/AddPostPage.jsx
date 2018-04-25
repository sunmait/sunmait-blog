import * as React from 'react';
import '../../../assets/styles/AddPostPage.less';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Header from 'components/common/header/Header.jsx';
import Footer from 'components/common/footer/index.jsx';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { Redirect } from 'react-router-dom';
let myMarkdown = require('marked');

class AddPostPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      refferer: null,
      error: null,
      updated: false
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAddPost(title, description) {
    this.props.addPost(title, description);
    this.setState({
      referrer: '/home'
    });
  }

  handleUpdatePost(title, description, idPost) {
    if(this.state.title && this.state.description){
      this.props.updatePost(title, description, idPost);
      this.setState({
        updated: true
      });
    } else {
      this.setState({
        error: true
      })
    }
  }

  render() {
    const {referrer} = this.state;
    let idPost = null;
    let defaulValueTitle = 'Input title of your post.';
    let defaulValueDescription = 'Input description of your post.';
    if (referrer) return <Redirect to={referrer} />;
    if(this.props.posts.posts){
      idPost = this.props.location.pathname.split(':')[1];
      const filterPost = this.props.posts.posts.filter(post => post.id == idPost);
      if(filterPost[0]){
        defaulValueTitle = filterPost[0].Title;
        defaulValueDescription = filterPost[0].Description;
      }
    }
    return (
      <div className="main">
        <Header />
        <div className="content">
          <div className="AddPage">
            <Card>
              <CardContent>
              <h2 className="desc">
                Title:
              </h2>
              <TextField
                error = {this.state.error}
                margin="normal"
                name="title"
                className="field"
                onChange={this.handleInputChange}
                defaultValue={defaulValueTitle}
              />
              <h2 className="desc">
                Description:
              </h2>
              <TextField
                error = {this.state.error}
                multiline
                rows="30"
                margin="normal"
                name="description"
                className="field"
                onChange={this.handleInputChange}
                defaultValue={defaulValueDescription}
              />
              </CardContent >
              <CardActions className="button">
              {this.state.updated ?
                (<Typography variant="display3" gutterBottom>
                  Updated
                </Typography>)
              : null
              }
              <div >
              {idPost ?
                (<Button
                  variant="raised"
                  color="primary"
                  onClick={() => this.handleUpdatePost(this.state.title, this.state.description, idPost)}
                >
                Update article
                </Button>)
                :(<Button
                  variant="raised"
                  color="primary"
                  onClick={() => this.handleAddPost(this.state.title, this.state.description)}
                >
                Public article
                </Button>)              
              }            
              </div> 
              </ CardActions>                 
            </Card>         
          </div>      
        </div>        
        <Footer />
      </div>
    );
  }
}

export default AddPostPage;