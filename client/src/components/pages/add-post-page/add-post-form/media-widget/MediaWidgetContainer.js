import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MediaWidget from './MediaWidget';

const mapStateToProps = state => {

};

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MediaWidget));