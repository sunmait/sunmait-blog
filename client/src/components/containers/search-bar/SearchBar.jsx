import React from 'react';
import { reduxForm } from 'redux-form';
import { getBEMClasses } from 'helpers//BEMHelper';
import Input from 'components/common/input/Input.js';

const searchBar = 'search-bar';
const bemClasses = getBEMClasses([searchBar]);

const SearchBar = props => {
  return (
    <form className={bemClasses('form')}>
      <Input name="searchQuery" placeholder="Search" customClass={bemClasses('input')} />
    </form>
    );
};

export default reduxForm({ form: 'searchBar' })(SearchBar);
