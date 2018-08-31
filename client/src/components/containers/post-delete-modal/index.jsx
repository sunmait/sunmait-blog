import { connect } from 'react-redux';
import { deletePost } from 'redux/modules/posts/actions';
import PostDeleteModal from './PostDeleteModal';
import { withRouter } from 'react-router';

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  deletePost,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostDeleteModal)
);
