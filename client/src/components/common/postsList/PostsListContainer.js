import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PostsList from './PostsListComponent';
import { formValueSelector } from 'redux-form';

const mapStateToProps = state => {
  return {
    searchQuery: formValueSelector('searchBar')(state, 'searchQuery') || '',
  };
};

export default withRouter(connect(mapStateToProps)(PostsList));
