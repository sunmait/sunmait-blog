import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getBEMClasses } from 'components/helpers/BEMHelper';
import findCaretYPosition from 'components/helpers/findCaretYPosition';
import checkIfRowIsEmpty from 'components/helpers/checkIfRowIsEmpty';

const baseClass = 'textarea-component';

class TextareaComponent extends React.Component {
  constructor(props) {
    super(props);
    this.textareaRef = React.createRef();
  }

  customOnBlur = (e) => {
    this.props.input.onBlur(e);
    this.setParams(e, this.textareaRef);
  }

  customOnKeyUp = (e) => {
    if (e.keyCode >= 37 && e.keyCode <=40) {
      this.setParams(e, this.textareaRef);
    }
  }

  customOnClick = (e) => {
    this.setParams(e, this.textareaRef);
  }

  customOnChange = (e) => {
    this.props.input.onChange(e);
    this.setParams(e, this.textareaRef);
  }

  customOnScroll = (e) => {
    this.setParams(e, this.textareaRef);
  }

  setParams = (event, textareaRef) => {
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;

    this.props.setSelectionValues(start, end);
    this.props.getCaretParams(
      findCaretYPosition(textareaRef, event.target),
      checkIfRowIsEmpty(event.target, start)
    );
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
        onChange={this.customOnChange}
        onKeyUp={this.customOnKeyUp}
        onScroll={this.customOnScroll}
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
