import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getBEMClasses } from 'helpers//BEMHelper';

const baseClass = 'textarea-component';

export const TextareaComponent = props => {
  const classes = getBEMClasses([baseClass, props.customClass]);
  const {input} = props;

  return (
    <textarea
      {...input}
      placeholder={props.placeholder}
      className={classes()}
    />
  );
};

const Textarea = props => {
  return <Field name={props.name} component={TextareaComponent} {...props} />;
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  classModifiers: PropTypes.arrayOf(PropTypes.string),
};

Textarea.defaultProps = {
  customClass: 'custom-input-component',
  classModifiers: [],
};

export default Textarea;
