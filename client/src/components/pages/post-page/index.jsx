import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { deletePost } from 'redux/modules/posts/postsActions';
import { getPost, addLikeOrDislike, fetchRating, getAveragePost, getUserPostRating } from 'redux/modules/post/actions';
import { addComment, getComments } from 'redux/modules/comments/commentsActions';
import PostPage from './PostPage.jsx';
import { reduxForm, formValueSelector, change } from 'redux-form';
import { compose } from 'redux';

const commentFormSelector = formValueSelector('postForm');

const mapStateToProps = (state, props) => {
  const text = commentFormSelector(state, 'commentDescription');
  const postId = Number(props.match.params.postId);
  const selectedPost = state.post.post && state.post.post.id === postId ? state.post.post : null;

  return {
    text,
    selectedPost,
    users: state.profile.usersById,
    user: state.user.user || {},
  };
};

const mapDispatchToProps = dispatch => ({
  getPost: postId => dispatch(getPost(postId)),
  addLikeOrDislike: (postId, userId) => dispatch(addLikeOrDislike(postId, userId)),
  deletePost,
  fetchRating: (userInfo, value, user) => dispatch(fetchRating(userInfo, value, user)),
  getUserPostRating: payload => dispatch(getUserPostRating(payload)),
  getAveragePost: postId => dispatch(getAveragePost(postId)),
  addComment: (id, text) => dispatch(addComment(id, text)),
  getComments: postId => dispatch(getComments(postId)),
  clearFormField: () => dispatch(change('postForm', 'commentDescription', '')),
});

const withForm = reduxForm({ form: 'postForm' });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withForm,
  withConnect,
  withRouter
)(PostPage);
