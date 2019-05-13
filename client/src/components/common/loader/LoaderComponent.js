import React from 'react';
import PropTypes from 'prop-types';
import { getBEMClasses } from 'helpers//BEMHelper';
import './Loader.css';

const baseClass = 'loader';

export const LOADER_SIZES = {
  SMALL: 'small',
  BIG: 'big',
};

const Loader = ({ size, customClass }) => {
  const classes = getBEMClasses([baseClass, customClass]);

  return <div className={classes(null, size)} />;
};

Loader.propTypes = {
  customClass: PropTypes.string,
  size: PropTypes.oneOf(Object.values(LOADER_SIZES)),
};

Loader.defaultProps = {
  customClass: 'custom-loader-component',
  size: LOADER_SIZES.BIG,
};

export default Loader;
