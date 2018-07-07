import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from 'redux/modules/auth/actions';
import Header from './Header.jsx';

const mapStateToProps = state => ({
  user: state.user.user,
});

const mapDispatchToProps = {
  logout,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
