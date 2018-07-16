import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import Button from 'components/common/button/Button.jsx';
import InputWithPlaceholder from 'components/common/input/InputWithPlaceholder.jsx';
import Textarea from './post-editing-textarea/Textarea';
import { getBEMClasses } from 'components/helpers/BEMHelper';
import LoadPostImage from './load-post-image/LoadPostImage.js';
import MediaWidget from './media-widget/MediaWidgetContainer';
import 'assets/styles/AddPostPage.css';

const editPost = 'add-post-form';
const bemClasses = getBEMClasses([editPost]);

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widgetPositionStart: 0,
      widgetRowNumber: 0,
      isEmptyRow: (props.initialValues.Description.length === 0),
    };
    this.widgetRef = React.createRef();
  }

  componentDidMount() {
    this.setState({widgetPositionStart: this.widgetRef.current.offsetTop + 16});
  }

  setCurrentRowValues = (caretPosition, isEmptyRow) => {
    const {widgetPositionStart} = this.state;

    if (widgetPositionStart !== 0) {
      const rowNumber = Math.floor((caretPosition - widgetPositionStart) / 19);
      this.setState({widgetRowNumber: (rowNumber > 0) ? rowNumber : 0, isEmptyRow});
    }
  }

  render() {
    const {valid, handleSubmit, label, setTextareaSelectionValues} = this.props;
    const {widgetRowNumber, isEmptyRow} = this.state;

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
          <div className={bemClasses('add-button')} ref={this.widgetRef}>
            {isEmptyRow && <MediaWidget paddingTop={(19 * widgetRowNumber)} />}
          </div>
          <Textarea
            customClass={bemClasses('textarea')}
            name="Description"
            placeholder="Enter description of your post"
            setSelectionValues={setTextareaSelectionValues}
            setCurrentRowValues={this.setCurrentRowValues}
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
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({form: 'post', validate})(EditPost);
