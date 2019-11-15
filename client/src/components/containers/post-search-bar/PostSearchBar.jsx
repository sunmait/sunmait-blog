import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change } from 'redux-form';
import { getBEMClasses } from 'helpers//BEMHelper';
import { changeSearchTags } from '../../../redux/modules/posts/postsActions'
import Input from 'components/common/input/Input.js';
import Tag from 'components/containers/post-tags/Tag';

const searchBar = 'search-bar';
const bemClasses = getBEMClasses([searchBar]);

const PostSearchBarComponent = props => { 
  const dispatch = useDispatch();
  const changeTags = (searchTags) => dispatch(changeSearchTags(searchTags));
  const { searchTags } = useSelector(state => state.posts);
  const [searchedStr, setSearchedStr] = useState("")

  useEffect(()=>{
    return function(){
      changeTags([]);
    }
  },[])
  
  const handleAddTag = tag => {
    changeTags([...tag])
  };

  const handleDeleteTag = id => {
    const arr = [...searchTags];
    const tagToDelete = arr.splice(id, 1);
    changeTags(arr);
    const strAfterDelete = searchedStr.split(`#${tagToDelete}`).join("").trim();
    dispatch(change('posts', 'searchQuery', strAfterDelete));
    setSearchedStr(strAfterDelete);
  };

  const handleOnChange = e => {
    setSearchedStr(e.target.value.trim());
    const arr = e.target.value.split(" ");
    const arrTags = [];
    arr.forEach((word) => {
      word.includes('#') && arrTags.push(word.split('#')[1]);
    });
    handleAddTag(arrTags);
  };

  const renderTagsList = Tags => {   
    return (
      Tags&&
      <div className={bemClasses('container')} data-cy={'tags-container'}>
        {Tags.map((tag, index) => (
          <Tag key={index} tag={tag} id={index} deleteTag={handleDeleteTag} />
        ))}
      </div>
    );
  };
  
  return (
    <>
      <form
        className={bemClasses('form')}
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <Input
          name="searchQuery"
          placeholder="Search"
          customClass={bemClasses('input')}
          onChange={handleOnChange}
          id="search-bar"
        />
      </form>
      {renderTagsList(searchTags)}
    </>
  );
};

export const PostSearchBar = PostSearchBarComponent;