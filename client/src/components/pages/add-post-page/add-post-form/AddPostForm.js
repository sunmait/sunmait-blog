import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import Button from 'components/common/button/Button.jsx';
import InputWithPlaceholder from 'components/common/input/InputWithPlaceholder.jsx';
import Textarea from 'components/common/input/Textarea';
import { getBEMClasses } from 'components/helpers/BEMHelper';
import LoadPostImage from './load-post-image/LoadPostImage.js';
import MediaWidget from './media-widget/MediaWidgetContainer';
import 'assets/styles/AddPostPage.css';

const editPost = 'add-post-form';
const bemClasses = getBEMClasses([editPost]);

class EditPost extends React.Component {
  render() {
    const {valid, handleSubmit, label, description} = this.props;

    return (
      <form onSubmit={handleSubmit} className={bemClasses()}>
        <div className={bemClasses('title-container')}>
          <InputWithPlaceholder
            customClass={bemClasses('title')}
            name="Title"
            placeholder="Enter title of your post"
            autoComplete="off"
          />
          <div className={bemClasses('upload-label')}>
            <LoadPostImage {...this.props} />
          </div>
        </div>
        <div className={bemClasses('divider')} />
        <div className={bemClasses('description-container')}>
          <div className={bemClasses('add-button')}>
            <MediaWidget />
          </div>
          <Textarea
            customClass={bemClasses('textarea')}
            name="Description"
            placeholder="Enter description of your post"
          />
        </div>
        <div className={bemClasses('publish-post-button')}>
          <Button
            type="submit"
            buttonColor="primary"
            label={label}
            disabled={!valid}
          />
        </div>
      </form>
    );
  }
};

const validate = values => {
  const errors = {};
  if (!values.Title) {
    errors.Title = 'Required'
  } else if (values.Title.length <= 1) {
    errors.Title = 'Title is not filled'
  }
  if (!values.Description) {
    errors.Description = 'Required'
  } else if (values.Description.length < 50) {
    errors.Description = 'Description should be more 50 symbols'
  }
  if (!values.ImageUrl) {
    errors.ImageUrl = 'Required'
  }

  return errors;
};

EditPost.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({form: 'post', validate})(EditPost);
