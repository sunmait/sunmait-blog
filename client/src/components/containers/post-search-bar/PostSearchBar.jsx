import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FieldArray, change } from 'redux-form';
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

  useEffect(()=>{
    return function(){
      changeTags([]);
    }
  },[])
  
  const handleAddTag = tag => {
    changeTags([...searchTags, tag])
  };

  const handleDeleteTag = id => {
    const arr = [...searchTags];
    arr.splice(id, 1);
    changeTags(arr);
  };

  const handleKeyDown = e => {
    if (e.target.value[e.target.value.length-1] === " ") {
      const arr = e.target.value.trim().split(" ");
      if(/^#.+$/.test(arr[arr.length-1])){
        e.preventDefault();
        handleAddTag(arr.pop().slice(1));
        dispatch(change('posts', 'searchQuery', `${arr.join(" ")} `))
      }
    }
  };

  const renderTagsList = Tags => {   
    return (
      Tags!==undefined&&
      <div className={bemClasses('container')} data-cy={'tags-container'}>
        {Tags.map((tag, id) => (
          <Tag key={id} tag={tag} id={id} deleteTag={handleDeleteTag} />
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
          onChange={handleKeyDown}
          id="search-bar"
        />
      </form>
      {renderTagsList(searchTags)}
    </>
  );
};

export const PostSearchBar = props => {
  return <FieldArray component={PostSearchBarComponent} name={props.name} {...props} />;
};