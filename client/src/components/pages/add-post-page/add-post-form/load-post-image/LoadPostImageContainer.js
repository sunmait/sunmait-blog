import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { formValueSelector } from 'redux-form';
import { loadPostImage } from 'redux/modules/posts/actions';
import LoadPostImage from './LoadPostImage';

const editPostSelector = formValueSelector('post');

const mapStateToProps = (state, props) => {
  return {
    urlValue: editPostSelector(state, 'ImageUrl'),
  };
};

const mapDispatchToProps = {
  loadPostImage,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoadPostImage)
);
