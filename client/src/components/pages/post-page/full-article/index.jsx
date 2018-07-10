import { connect } from 'react-redux';
import {deletePost} from 'redux/modules/posts/actions';
import FullArticle from './FullArticle';

const mapStateToProps = (state) => ({
  users: state.profile.usersById,
  user: state.user.user
});

const mapDispatchToProps = {
  deletePost
};

export default connect(mapStateToProps, mapDispatchToProps)(FullArticle);
