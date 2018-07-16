import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {insertDividerIntoText, insertImageIntoText, insertVideoIntoText} from 'redux/modules/posts/actions';
import { formValueSelector } from 'redux-form';
import MediaWidget from './MediaWidget';

const formSelector = formValueSelector('post');

const mapStateToProps = state => ({
  insertImageUrl: formSelector(state, 'insertImageUrl'),
  insertVideoUrl: formSelector(state, 'insertVideoUrl'),
});

const mapDispatchToProps = {
  insertDividerIntoText,
  insertImageIntoText,
  insertVideoIntoText
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MediaWidget));