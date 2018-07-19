import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {setTextareaSelectionValues} from 'redux/modules/posts/actions';
import { findSelectedPost } from 'redux/selectors/findSelectedPost';
import EditPost from './AddPostForm';

const mapStateToProps = (state, props) => {
  return {
    initialValues: findSelectedPost(state.posts.posts, props.postId),
  }
};

const mapDispatchToProps = {
  setTextareaSelectionValues
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost));