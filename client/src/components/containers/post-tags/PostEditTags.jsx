import 'assets/styles/Article.css';

import React, { useState, useEffect } from 'react';
import { getBEMClasses } from 'helpers//BEMHelper';
import { Paper } from '@material-ui/core';
import Tag from 'components/containers/post-tags/Tag';
import InputTagComponent from './EditTagInput';
import PropTypes from 'prop-types';

const editPost = 'add-post-form';
const bemClasses = getBEMClasses([editPost]);

const PostEditTags = props => {
  const [tags, setTags] = useState([]);

  useEffect(
    () => {
      setTags(props.tags);
    },
    [props.tags]
  );

  const handleDeleteTag = id => {
    const updateTags = tags.filter(tag => tag.id !== id);
    setTags(updateTags);
  };

  const handleAddTag = tag => {
    let id = 0;
    tags.map(tag => (id = tag.id));
    const newTags = {
      id: id + 1,
      Text: tag,
    };
    setTags([...tags, newTags]);
  };

  const renderTagsList = () => {
    return (
      <React.Fragment>
        {tags.map(tag => (
          <Tag tag={tag.Text} id={tag.id} deleteTag={handleDeleteTag} key={tag.id} />
        ))}
      </React.Fragment>
    );
  };

  return (
    <Paper className={bemClasses('paper')}>
      {renderTagsList()}
      <InputTagComponent addTag={handleAddTag} />
    </Paper>
  );
};

PostEditTags.propTypes = {
  tags: PropTypes.array,
};

export default PostEditTags;
