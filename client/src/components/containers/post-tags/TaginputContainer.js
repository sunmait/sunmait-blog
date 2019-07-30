import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Taginput from './Taginput';

const mapStateToProps = state => ({
  users: state.profile.usersById,
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Taginput)
);
