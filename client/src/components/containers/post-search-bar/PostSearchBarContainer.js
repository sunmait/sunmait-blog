import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PostSearchBar from './PostSearchBar';

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = {

}

export const PostSearchBarContainer = withRouter(connect(mapStateToProps)(PostSearchBar));
