import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getBEMClasses } from 'helpers/BEMHelper';
import { checkIfRowIsEmpty, findCaretYPosition } from 'helpers/addPostHelper';

const baseClass = 'textarea-component';

class EditableArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmptyDescription: true,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const editableArea = document.getElementById('editor');

    if (editableArea && props.description !== editableArea.innerHTML) {
      editableArea.innerHTML = props.description;

      if (editableArea.childNodes.length !== 1 || editableArea.innerText !== '\n') {
        props.getCaretParams(findCaretYPosition(), false);

        return { isEmptyDescription: false };
      }
    }
    return null;
  }

  disableBackspace = e => {
    if (e.keyCode === 8) {
      if (e.target.childNodes[0].tagName === 'IMG') {
        e.currentTarget.removeChild(e.target);
        this.setItemId(e.currentTarget);
      }

      if (e.target.childNodes.length === 1 && e.target.innerText === '\n') {
        e.preventDefault();
      }
    }
  };

  customOnChange = e => {
    e.preventDefault();

    if (e.target.childNodes.length === 1 && e.target.innerText === '\n') {
      this.setState({ isEmptyDescription: true });
    } else {
      this.setState({ isEmptyDescription: false });
    }

    this.setItemId(e.target);
    this.setParams();
  };

  onArrowsKeysUp = e => {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      this.setItemId(e.currentTarget);
      this.setParams();
    }
  };

  customOnClick = e => {
    e.preventDefault();

    this.setItemId(e.currentTarget);
    this.setParams();
  };

  customOnScroll = e => {
    this.setItemId(e.target);
    this.setParams();
  };

  setItemId = element => {
    const childElements = element.querySelectorAll('#editor>div');

    this.props.changePost(element.innerHTML);

    for (let item = 0; item < childElements.length; item++) {
      childElements[item].removeAttribute('style');
      const itemOffset = childElements[item].offsetTop;
      const itemId = `text-${itemOffset}`;

      childElements[item].id = itemId;
    }

    const userSelection = window.getSelection();

    if (userSelection.anchorNode) {
      const selectedItemId = userSelection.anchorNode.id || userSelection.anchorNode.parentNode.id;

      this.props.changePost(element.innerHTML, selectedItemId);
    }
  };

  setParams = () => {
    this.props.getCaretParams(findCaretYPosition(), checkIfRowIsEmpty());
  };

  render() {
    const { placeholder, customClass } = this.props;
    const { isEmptyDescription } = this.state;
    const classes = getBEMClasses([baseClass, customClass]);

    return (
      <Fragment>
        <div
          id="editor"
          contentEditable
          className={classes()}
          onInput={this.customOnChange}
          onClick={this.customOnClick}
          onKeyUp={this.onArrowsKeysUp}
          onKeyDown={this.disableBackspace}
          onScroll={this.customOnScroll}
          tabIndex="0"
        />
        {isEmptyDescription && <div className="add-post-form__textarea-placeholder">{placeholder}</div>}
      </Fragment>
    );
  }
}

EditableArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  classModifiers: PropTypes.arrayOf(PropTypes.string),
  setSelectionValues: PropTypes.func.isRequired,
};

EditableArea.defaultProps = {
  customClass: 'custom-input-component',
  classModifiers: [],
};

export default EditableArea;
