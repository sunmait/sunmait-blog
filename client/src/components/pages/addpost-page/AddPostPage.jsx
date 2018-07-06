import React from 'react';
import 'assets/styles/AddPostPage.css';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import store from '../../../redux/store';
const action = ({ type, payload }) => store.dispatch({type, payload});

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
        action({type : 'ADD_POST_SAGA', payload: {title, description}});
        this.props.history.push('/home');
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
    action({type : 'UPDATE_POST_SAGA', payload: {title, description, idPost}});
    this.props.history.push(`/post/:${idPost}`);
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
    );
  }
}

export default AddPostPage;