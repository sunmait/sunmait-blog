import * as React from 'react';
import 'assets/styles/Button.less';
import { Link } from 'react-router-dom';

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
