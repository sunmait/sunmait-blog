import React from 'react';

import { getBEMClasses } from 'helpers//BEMHelper';
import Input from 'components/common/input/Input.js';

const searchBar = 'search-bar';
const bemClasses = getBEMClasses([searchBar]);

const PostSearchBarComponent = props => {
  return (
    <form
      className={bemClasses('form')}
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <Input name="searchQuery" placeholder="Search" customClass={bemClasses('input')} id="search-bar" />
    </form>
  );
};

export const PostSearchBar = PostSearchBarComponent;
