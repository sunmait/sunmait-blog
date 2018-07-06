import React from 'react'
import 'assets/styles/Button.css';

const Button = props => {
  const { buttonColor, onClick, label } = props;

  return (
    <button
      className={`custom-button ${buttonColor}`}
      onClick={onClick}
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
