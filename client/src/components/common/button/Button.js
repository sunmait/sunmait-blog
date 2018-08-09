import React from 'react';
import PropTypes from 'prop-types';
import 'assets/styles/Button.css';

const Button = props => {
  const { as: Component, buttonColor, ...otherProps } = props;

  return <Component className={`custom-button ${buttonColor}`} {...otherProps} />;
};

Button.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

Button.defaultProps = {
  as: 'button',
  children: 'Button',
  buttonColor: 'default',
};

export default Button;
