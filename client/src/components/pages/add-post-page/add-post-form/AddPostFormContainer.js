import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { formValueSelector } from 'redux-form';

import { setTextareaSelectionValues } from 'redux/modules/posts/postsActions';
import EditPost from './AddPostForm';

const userFormSelector = formValueSelector('post');

const mapStateToProps = (state, props) => {
  const postData = userFormSelector(state, 'Description');

  const initialValues =
    state.post.post && state.post.post.id === props.postId
      ? {
          ...state.post.post,
          textareaSelectionStart: 0,
          textareaSelectionEnd: 0,
        }
      : {
          Title: '',
          Description: '',
          ImageUrl: '',
          textareaSelectionStart: 0,
          textareaSelectionEnd: 0,
        };

  return {
    initialValues,
    postData,
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
