import React from 'react';
import PropTypes from 'prop-types';
import { getBEMClasses } from 'helpers//BEMHelper';
import './Loader.css';

const baseClass = 'loader';

const Loader = props => {
  const classes = getBEMClasses([baseClass, props.customClass]);

  return <div className={classes(null, props.classModifiers)} />;
};

Loader.propTypes = {
  customClass: PropTypes.string,
  classModifiers: PropTypes.arrayOf(PropTypes.string),
};

Loader.defaultProps = {
  customClass: 'custom-loader-component',
  classModifiers: [],
};

export default Loader;
