import { connect } from 'react-redux';
import Header from './Header.jsx';

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Header);