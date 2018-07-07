import {withRouter} from 'react-router';
import { connect } from 'react-redux';
import {deletePost} from 'redux/modules/posts/actions';
import Post from './Post';

const mapStateToProps = state => ({
  users: state.profile.usersById,
  user: state.user.user
});

const mapDispatchToProps = {
  deletePost
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
