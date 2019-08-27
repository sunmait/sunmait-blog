import React, { useState } from 'react';
import { getBEMClasses } from 'helpers//BEMHelper';
import PropTypes from 'prop-types';

const editPost = 'add-post-form';
const bemClasses = getBEMClasses([editPost]);

const InputTagComponent = props => {
  const { addTag } = props;
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(value);
      setValue('');
    }
  };

  return (
    <input
      type="text"
      placeholder="enter new tag"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className={bemClasses('input')}
      value={value}
    />
  );
};

InputTagComponent.propTypes = {
  addTag: PropTypes.func,
};

export default InputTagComponent;
