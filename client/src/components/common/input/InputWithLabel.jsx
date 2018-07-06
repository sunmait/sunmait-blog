import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { Field } from 'redux-form';
import { getBEMClasses } from 'components/helpers/BEMHelper';

const baseClass = 'input-component';

export const InputComponent = props => {
  const classes = getBEMClasses([baseClass, props.customClass]);
  const { input, type, placeholder } = props;
  const { error, invalid, touched, dirty } = props.meta;

  return (
    <TextField
      {...input}
      type={type}
      error={invalid && touched && !dirty}
      label={placeholder}
      className={classes()}
      helperText={error}
      margin="normal"
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
