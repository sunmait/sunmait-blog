import React from 'react';
import PropTypes from 'prop-types';
import AddPostFormContainer from './add-post-form/AddPostFormContainer';
import { getBEMClasses } from 'components/helpers/BEMHelper';
import 'assets/styles/AddPostPage.css';

const editPost = 'add-post';
const bemClasses = getBEMClasses([editPost]);

class AddPostPageNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: null
    };
  }

  componentDidMount() {
    this.getPostId();
  }

  getPostId() {
    const postId = parseInt(this.props.location.pathname.split(':')[1], 10);
    this.setState({postId});
  }

  updatePost() {
    const {Title, Description} = this.props.editPostValues;
    const {postId} = this.state;

    this.props.updatePost(Title, Description, postId);
    this.props.history.push(`/post/:${postId}`);
  }

  addPost() {
    const {Title, Description} = this.props.editPostValues;

    this.props.addPost(Title, Description);
    this.props.history.push('/home');
  }

  handleSubmit = values => {
    if (values.id) {
      return this.updatePost();
    }
    return this.addPost();
  }

  render() {
    const {postId} = this.state;

    return (
      <div className={bemClasses()}>
        <AddPostFormContainer
          label={postId ? " Update post" : "Publish post"}
          postId={postId}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

AddPostPageNew.propTypes = {
  addPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
};

export default AddPostPageNew;
