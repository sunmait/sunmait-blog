import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setTextareaSelectionValues } from 'redux/modules/posts/actions';
import { undoPost, redoPost } from 'redux/modules/undoRedoPost/actions';
import { findSelectedPost } from 'redux/selectors/findSelectedPost';
import EditPost from './AddPostForm';

const mapStateToProps = (state, props) => {
  return {
    initialValues: findSelectedPost(state.posts.posts, props.postId),
  };
};

const mapDispatchToProps = {
  setTextareaSelectionValues,
  undoPost,
  redoPost
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditPost)
);
