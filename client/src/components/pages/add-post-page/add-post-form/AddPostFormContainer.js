import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {loadPostImage} from 'redux/modules/posts/actions';
import { formValueSelector } from 'redux-form';
import { findSelectedPost } from 'redux/selectors/findSelectedPost';
import EditPost from './AddPostForm';

const postSelector = formValueSelector('post');

const mapStateToProps = (state, props) => {
  return {
    initialValues: findSelectedPost(state.posts.posts, props.postId),
    description: postSelector(state, 'Description'),
  }
};

const mapDispatchToProps = {
  loadPostImage
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost));