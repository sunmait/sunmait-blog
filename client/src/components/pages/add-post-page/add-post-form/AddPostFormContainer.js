import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setTextareaSelectionValues } from 'redux/modules/posts/actions';
import EditPost from './AddPostForm';

const mapStateToProps = (state, props) => {
  const initialValues =
    state.post.post && state.post.post.id === props.postId
      ? { ...state.post.post, textareaSelectionStart: 0, textareaSelectionEnd: 0 }
      : {
          Title: '',
          Description: '',
          ImageUrl: '',
          textareaSelectionStart: 0,
          textareaSelectionEnd: 0,
        };
  return {
    initialValues,
  };
};

const mapDispatchToProps = {
  setTextareaSelectionValues,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditPost)
);
