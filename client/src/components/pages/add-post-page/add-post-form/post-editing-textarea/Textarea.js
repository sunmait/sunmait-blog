import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getBEMClasses } from 'components/helpers/BEMHelper';

const baseClass = 'textarea-component';

class TextareaComponent extends React.Component {
  constructor(props) {
    super(props);
    this.textareaRef = React.createRef();
  }

  customOnBlur = (e) => {
    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;

    this.props.setSelectionValues(start, end);
    this.props.input.onBlur(e);
  }

  customOnKeyDown = (e) => {
    if (e.keyCode >= 37 && e.keyCode <=40) {
      console.log(e.code);
      console.log('moving caret', this.textareaRef.current.selectionStart);
    }
  }

  customOnClick = (e) => {
    const start = this.textareaRef.current.selectionStart;
    const end = this.textareaRef.current.selectionEnd;
    const rowIsEmpty = (this.props.input.value.substr(start-1, 2) === '\n\n');

    this.props.setSelectionValues(start, end);
    this.props.setCurrentRowValues(e.pageY, rowIsEmpty);
  }

  render() {
    const classes = getBEMClasses([baseClass, this.props.customClass]);
    const {input, placeholder} = this.props;
  
    return (
      <textarea
        {...input}
        placeholder={placeholder}
        className={classes()}
        onBlur={this.customOnBlur}
        onClick={this.customOnClick}
        onKeyDown={this.customOnKeyDown}
        ref={this.textareaRef}
      />
    );
  }
};

const Textarea = props => {
  return <Field name={props.name} component={TextareaComponent} {...props} />;
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  classModifiers: PropTypes.arrayOf(PropTypes.string),
  setSelectionValues: PropTypes.func.isRequired,
};

Textarea.defaultProps = {
  customClass: 'custom-input-component',
  classModifiers: [],
};

export default Textarea;
