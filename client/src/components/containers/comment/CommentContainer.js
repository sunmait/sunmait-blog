import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Comment from './Comment';

const mapStateToProps = state => ({
  users: state.profile.usersById,
  user: state.user.user,
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Comment)
);
