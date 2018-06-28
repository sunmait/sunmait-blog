import * as React from 'react';
import 'assets/styles/AddPostPage.less';
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
    let idPost = +this.props.location.pathname.split(':')[1];
    if ( idPost ) {
      const editablePost = this.props.posts.posts.find((post) => post.id === idPost);
      this.state = {
        title: editablePost.Title || null,
        description: editablePost.Description || null,
        error: null
      }
    } else {
      this.state = {
        title: null,
        description: null,
        errorDescription: null,
        errorTitle: null,
        errorText: null
      };
    } 
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAddPost(title, description) {
    if( title && description ){
      if(description.length > 50){
        this.props.addPost(title, description)
          .then((res) => {
            this.props.history.push('/home');
          })
          .catch((err) => {
            console.log(err);
          });
        this.setState({
          errorDescription: null,
          errorTitle: null,
          errorText: null
        })
      } else {
        this.setState({
          errorDescription: true,
          errorTitle: null,
          errorText: 'Description should be more 50 simbols'
        })
      }
    } else {
      this.setState({
        errorTitle: !title ? true : null,
        errorDescription: !description ? true : null,
        errorText: (!title || !description) ? 'Empty line' : null
      })
    }
  }

  handleUpdatePost(title, description, idPost) {
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
  }

  renderButton = (idPost) => {
    if( idPost ) {
      return (
        <Button
          variant="raised"
          color="primary"
          onClick={() => this.handleUpdatePost(this.state.title, this.state.description, idPost)}
        >
          Update article
        </Button>
      )
    } else {
      return (
        <Button
          variant="raised"
          color="primary"
          onClick={() => this.handleAddPost(this.state.title, this.state.description)}
        >
          Public article
        </Button>
      )
    }
  }

  render() {
    const idPost = this.props.location.pathname.split(':')[1];
    const defaulValueTitle = 'Input title of your post.';
    const defaulValueDescription = 'Input description of your post.';

    return (
      <div className="main">
        <Header />
        <div className="content">
          <div className="AddPage">
            <Card className="post-form" >
              <CardContent>
                <h2 className="desc">
                  Title:
                </h2>
                <TextField
                  margin="normal"
                  name="title"
                  className="field"
                  onChange={this.handleInputChange}
                  placeholder={defaulValueTitle}
                  value={this.state.title}
                  error={this.state.errorTitle}
                  helperText={this.state.errorTitle ? this.state.errorText : null}
                />
                <h2 className="desc">
                  Description:
                </h2>
                <TextField
                  multiline
                  rows="30"
                  margin="normal"
                  name="description"
                  className="field"
                  onChange={this.handleInputChange}
                  placeholder={defaulValueDescription}
                  error={this.state.errorDescription}
                  helperText={this.state.errorDescription ? this.state.errorText : null}
                  value={this.state.description}
                />
              </CardContent>
              <CardActions className="button">
                <div >
                  { this.renderButton(idPost) }
                </div> 
              </CardActions>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AddPostPage;