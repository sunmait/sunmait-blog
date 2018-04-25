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
    let idPost = this.props.location.pathname.split(':')[1];
    if(idPost){     
      this.state ={
        title: this.props.posts.posts.filter(post => post.id == idPost)[0].Title || null,
        description: this.props.posts.posts.filter(post => post.id == idPost)[0].Description || null,
        error: null,
      }
    } else {
      this.state = {
        title: null,
        description: null,
        error: null,
      };
    } 
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAddPost(title, description) {
    this.props.addPost(title, description)
      .then((res) => {
        this.props.history.push('/home');
      })
      .catch((err) => {
        console.log(err);
      });
    
  }

  handleUpdatePost(title, description, idPost) {
    if(this.state.title && this.state.description){
      this.props.updatePost(title, description, idPost)
        .then((res) => {
          this.props.history.push('/home');
          this.setState({
            error: false
          });
        })
        .catch((err) => {
          console.log(err);
        }); 
    } else {
      this.setState({
        error: true
      })
    }
  }

  renderButton = (idPost) => {
    if( idPost ) {
      return (<Button
        variant="raised"
        color="primary"
        onClick={() => this.handleUpdatePost(this.state.title, this.state.description, idPost)}
      >
      Update article
      </Button>)
    } else {
      return (<Button
        variant="raised"
        color="primary"
        onClick={() => this.handleAddPost(this.state.title, this.state.description)}
      >
      Public article
      </Button>) 
    }
  }

  render() {
    let idPost = null;
    idPost = this.props.location.pathname.split(':')[1];
    let defaulValueTitle = 'Input title of your post.';
    let defaulValueDescription = 'Input description of your post.';
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
                placeholder={defaulValueTitle}
                value={this.state.title}
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
                placeholder={defaulValueDescription}
                value={this.state.description}
              />
              </CardContent >
              <CardActions className="button">
              <div >
              {this.renderButton(idPost)}            
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