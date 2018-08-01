import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getBEMClasses } from 'helpers//BEMHelper';

const baseClass = 'input-component';

export const InputComponent = props => {
  const classes = getBEMClasses([baseClass, props.customClass]);
  const {input} = props;

  return (
    <input
      {...input}
      placeholder={props.placeholder}
      className={classes()}
      autoComplete="off" 
    />
  );
};

const Input = props => {
  return <Field name={props.name} component={InputComponent} {...props} />;
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  classModifiers: PropTypes.arrayOf(PropTypes.string),
};

Input.defaultProps = {
  customClass: 'custom-input-component',
  classModifiers: [],
};

export default Input;
