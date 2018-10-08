import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getBEMClasses } from 'helpers//BEMHelper';
import { checkIfRowIsEmpty, findCaretYPosition } from 'helpers//addPostHelper';
import editTextHelper from '../../../../../helpers/editTextHelper';

const baseClass = 'textarea-component';

class TextareaComponent extends React.Component {
  customOnBlur = e => {
    this.props.input.onBlur(e);
    this.setParams(e);
  };

  onArrowsKeysUp = e => {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      this.setParams(e);
    }
  };

  customOnClick = e => {
    const selection = window.getSelection();
    if (selection.rangeCount) {
      const selectionText = selection.toString();

      const range = selection.getRangeAt(0);
      console.log(range);

      const textSelectionClass = e.target.className;

      console.log(range.startContainer.parentNode);

      editTextHelper(selectionText, textSelectionClass);
    }

    this.setParams(e);
  };

  customOnChange = e => {
    if (e.nativeEvent.inputType === 'historyRedo') {
      return;
    }

    this.props.input.onChange(e);
    this.setParams(e);
  };

  customOnScroll = e => {
    this.setParams(e);
  };

  setParams = event => {
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;

    this.props.setSelectionValues(start, end);
    this.props.getCaretParams(findCaretYPosition(event.target), checkIfRowIsEmpty(event.target, start));
  };

  render() {
    const classes = getBEMClasses([baseClass, this.props.customClass]);
    const { input, placeholder, changeDescription } = this.props;

    return (
      <textarea
        {...input}
        placeholder={placeholder}
        className={classes()}
        onBlur={this.customOnBlur}
        onClick={this.customOnClick}
        onChange={this.customOnChange}
        onKeyUp={this.onArrowsKeysUp}
        onScroll={this.customOnScroll}
        onKeyDown={changeDescription}
      />
    );
  }
}

const Textarea = props => {
  return <Field name={props.name} component={TextareaComponent} {...props} />;
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  classModifiers: PropTypes.arrayOf(PropTypes.string),
  setSelectionValues: PropTypes.func.isRequired,
  changeDescription: PropTypes.func.isRequired,
};

Textarea.defaultProps = {
  customClass: 'custom-input-component',
  classModifiers: [],
};

export default Textarea;
