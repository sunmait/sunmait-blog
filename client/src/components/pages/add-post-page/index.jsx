import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { formValueSelector } from 'redux-form';
import { addPost, updatePost } from 'redux/modules/posts/actions'
import AddPostPageNew from './AddPostPageNew';

const editPostSelector = formValueSelector('editPost');

const mapStateToProps = state => ({
  posts: state.posts,
  editPostValues: editPostSelector(state, 'Title', 'Description'),
});

const mapDispatchToProps = {
  addPost,
  updatePost
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPostPageNew));