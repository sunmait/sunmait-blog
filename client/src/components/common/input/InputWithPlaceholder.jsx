import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { Field } from 'redux-form';
import { getBEMClasses } from 'helpers//BEMHelper';

const baseClass = 'input-component';

export const InputComponent = props => {
  const classes = getBEMClasses([baseClass, props.customClass]);
  const { input } = props;

  return (
    <Input
      {...input}
      id={props.id}
      className={classes()}
      placeholder={props.placeholder}
      type={props.type}
      autoComplete={props.autoComplete}
    />
  );
};

const InputWithPlaceholder = props => {
  return <Field name={props.name} component={InputComponent} {...props} />;
};

InputWithPlaceholder.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  classModifiers: PropTypes.arrayOf(PropTypes.string),
};

InputWithPlaceholder.defaultProps = {
  customClass: 'custom-input-component',
  classModifiers: [],
  type: 'text',
};

export default InputWithPlaceholder;
