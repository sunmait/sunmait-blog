import React from 'react'
import 'assets/styles/Button.css';
import { Link } from 'react-router-dom';

const ButtonLink = props => {
  const { buttonColor, linkUrl, label } = props;

  return (
    <Link
      className={`custom-button ${buttonColor}`}
      to={linkUrl}
    >
      {label}
    </Link>
  );
};

ButtonLink.defaultProps = {
  label: 'Button',
  buttonColor: 'default',
};

export default ButtonLink;
