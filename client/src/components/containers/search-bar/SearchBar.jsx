import React from 'react';
import { reduxForm } from 'redux-form';
import { getBEMClasses } from 'components/helpers/BEMHelper';
import InputWithPlaceholder from 'components/common/input/InputWithPlaceholder.jsx';

const searchBar = 'search-bar';
const bemClasses = getBEMClasses([searchBar]);

const SearchBar = props => {
  return (
    <form className={bemClasses('form')}>
      <InputWithPlaceholder name="searchQuery" placeholder="Search" />
    </form>
    );
};

export default reduxForm({ form: 'searchBar' })(SearchBar);
