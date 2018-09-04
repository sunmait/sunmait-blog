import React from 'react';
import PropTypes from 'prop-types';
import AddPostFormContainer from './add-post-form/AddPostFormContainer';
import { getBEMClasses } from 'helpers//BEMHelper';
import 'assets/styles/AddPostPage.css';

const editPost = 'add-post';
const bemClasses = getBEMClasses([editPost]);

class AddPostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { postId } = props.match.params;

    if (postId !== state.postId) {
      return {
        postId: postId === undefined ? null : Number(postId),
      };
    }

    return null;
  }

  componentDidMount() {
    this.props.getPosts();
  }

  updatePost() {
    const { Title, Description, ImageUrl } = this.props.editPostValues;
    const postId = this.state.postId;

    this.props.updatePost(Title, Description, ImageUrl, postId);
    this.props.history.push(`/post/${postId}`);
  }

  addPost() {
    const { Title, Description, ImageUrl } = this.props.editPostValues;

    this.props.addPost(Title, Description, ImageUrl);
    this.props.history.push('/home');
  }

  handleSubmit = values => {
    if (values.id) {
      return this.updatePost();
    }
    return this.addPost();
  };

  defineEditingOrCreationOfPost(postId) {
    if (postId) return 'Update post';
    return 'Publish post';
  }

  render() {
    return (
      <div className="content">
        <div className={bemClasses()}>
          <AddPostFormContainer
            label={this.defineEditingOrCreationOfPost(this.state.postId)}
            postId={this.state.postId}
            onSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

AddPostPage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
};

export default AddPostPage;
