import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setTextareaSelectionValues, changePost } from 'redux/modules/posts/actions';
import EditPost from './AddPostForm';

const mapStateToProps = (state, props) => {
  const initialValues =
    state.post.post && state.post.post.id === props.postId
      ? { ...state.post.post }
      : {
          Title: '',
          Description: '<div id="text-0"><br></div>',
          ImageUrl: '',
          selectedItemId: null,
        };

  return {
    initialValues,
    description: state.form && state.form.post ? state.form.post.values.Description : null,
  };
};

const mapDispatchToProps = {
  setTextareaSelectionValues,
  changePost,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditPost)
);
