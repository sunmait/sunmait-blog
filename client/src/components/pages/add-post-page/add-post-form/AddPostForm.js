import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Helmet } from 'react-helmet';
import Button from 'components/common/button/Button.js'
import InputWithPlaceholder from 'components/common/input/InputWithPlaceholder.jsx';
import Textarea from './post-editing-textarea/Textarea';
import { getBEMClasses } from 'helpers//BEMHelper';
import LoadPostImage from './load-post-image/LoadPostImageContainer.js';
import MediaWidget from './media-widget/MediaWidgetContainer';
import 'assets/styles/AddPostPage.css';

const editPost = 'add-post-form';
const bemClasses = getBEMClasses([editPost]);

class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widgetPositionStart: 0,
      widgetPadding: 0,
      isRowEmpty: (this.props.initialValues.Description.length === 0),
    };
    this.widgetRef = React.createRef();
  }

  componentDidMount() {
    this.setState({widgetPositionStart: this.widgetRef.current.offsetTop + 16});
  }

  componentWillReceiveProps(newProps) {
    if (newProps.initialValues !== this.props.initialValues) {
      this.setState({isRowEmpty: (newProps.initialValues.Description.length === 0)});
    }
  }
  
  getCaretParams = (caretPosition, isRowEmpty) => {
    const {widgetPositionStart} = this.state;
    if (widgetPositionStart !== 0) {
      const widgetPadding = caretPosition - widgetPositionStart;
      this.setState({widgetPadding: widgetPadding, isRowEmpty: isRowEmpty});
    }
  }

  render() {
    const {valid, handleSubmit, label, setTextareaSelectionValues, initialValues} = this.props;
    const {isRowEmpty, widgetPadding} = this.state;
    const pageTitle = initialValues.Title.length > 0 ? initialValues.Title : 'Create new post';

    return (
      <form onSubmit={handleSubmit} className={bemClasses()}>
        <Helmet title={pageTitle} />
        <div className={bemClasses('title-container')}>
          <InputWithPlaceholder
            customClass={bemClasses('title')}
            name="Title"
            placeholder="Enter title of your post"
            autoComplete="off"
          />
          <div className={bemClasses('upload-label')}>
            <LoadPostImage />
          </div>
        </div>
        <div className={bemClasses('divider')} />
        <div className={bemClasses('description-container')} id='description-container'>
          <div className={bemClasses('add-button')} ref={this.widgetRef}>
            {isRowEmpty && <MediaWidget paddingTop={widgetPadding} />}
          </div>
          <Textarea
            customClass={bemClasses('textarea')}
            name="Description"
            placeholder="Enter description of your post"
            setSelectionValues={setTextareaSelectionValues}
            setCurrentRowValues={this.setCurrentRowValues}
            getCaretParams={this.getCaretParams}
          />
        </div>
        <div className={bemClasses('publish-post-button')}>
          <Button
            as="button"
            buttonColor="primary"
            type="submit"
            disabled={!valid}
          >
            {label}
          </Button>
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

export default reduxForm({form: 'post', validate, enableReinitialize: true})(EditPost);
