import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { Field } from 'redux-form';
import { getBEMClasses } from 'helpers//BEMHelper';
import { format } from 'date-fns';

const baseClass = 'input-component';

export const InputComponent = props => {
  const classes = getBEMClasses([baseClass, props.customClass]);
  const { input, type, placeholder, disabled } = props;
  const { error, invalid, touched, dirty } = props.meta;
  if (type === 'date') {
    input.value = format(input.value, 'YYYY-MM-DD');
  }
  return (
    <TextField
      {...input}
      disabled={disabled}
      type={type}
      error={invalid && touched && !dirty}
      label={placeholder}
      className={classes()}
      helperText={error}
      margin="normal"
      variant="outlined"
    />
  );
};

const InputWithLabel = props => {
  return <Field name={props.name} component={InputComponent} {...props} />;
};

InputWithLabel.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  classModifiers: PropTypes.arrayOf(PropTypes.string),
};

InputWithLabel.defaultProps = {
  customClass: 'custom-input-component',
  classModifiers: [],
};

export default InputWithLabel;
