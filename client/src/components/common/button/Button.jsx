import React from 'react'
import 'assets/styles/Button.css';

const Button = props => {
  const { buttonColor, label, ...other } = props;

  return (
    <button
      {...other}
      className={`custom-button ${buttonColor}`}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  label: 'Button',
  buttonColor: 'default',
};

export default Button;
