import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { formValueSelector } from 'redux-form';
import { getPosts, addPost, updatePost } from 'redux/modules/posts/actions';
import AddPostPage from './AddPostPage';

const editPostSelector = formValueSelector('post');

const mapStateToProps = state => ({
  editPostValues: editPostSelector(state, 'Title', 'Description', 'ImageUrl'),
});

const mapDispatchToProps = {
  getPosts,
  addPost,
  updatePost,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddPostPage)
);
