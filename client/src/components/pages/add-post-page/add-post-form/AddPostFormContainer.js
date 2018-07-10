import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm, formValueSelector } from 'redux-form';
import { findSelectedPost } from 'redux/selectors/findSelectedPost';
import EditPost from './AddPostForm';

const mapStateToProps = (state, props) => {
  const insightPostSelector = formValueSelector('post');

  return {
    initialValues: findSelectedPost(state.posts.posts, props.postId),
    description: insightPostSelector(state, 'Description'),
  }
};

export default withRouter(connect(mapStateToProps)(EditPost));