import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { formValueSelector } from 'redux-form';
import { addPost, updatePost } from 'redux/modules/posts/actions';
import { getPost } from 'redux/modules/post/actions';
import AddPostPage from './AddPostPage';

const editPostSelector = formValueSelector('post');

const mapStateToProps = state => ({
  post: state.post.post,
  editPostValues: editPostSelector(state, 'Title', 'Description', 'ImageUrl'),
});

const mapDispatchToProps = {
  getPost,
  addPost,
  updatePost,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddPostPage)
);
