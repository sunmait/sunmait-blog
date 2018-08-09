import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Post from './Post';

const mapStateToProps = state => ({
  users: state.profile.usersById,
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)
);
