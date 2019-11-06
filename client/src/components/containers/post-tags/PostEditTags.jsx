import 'assets/styles/Article.css';

import React from 'react';
import { getBEMClasses } from 'helpers//BEMHelper';
import { Paper } from '@material-ui/core';
import Tag from 'components/containers/post-tags/Tag';
import InputTagComponent from './EditTagInput';
import PropTypes from 'prop-types';

import { FieldArray } from 'redux-form';
import { useSelector } from 'react-redux';
import { getPostEditTagsSelector } from '../../../redux/modules/posts/postsSelectors';

const editPost = 'add-post-form';
const bemClasses = getBEMClasses([editPost]);

const PostEditTags = props => {
  const Tags = useSelector(getPostEditTagsSelector);
  const handleDeleteTag = id => {
    props.fields.remove(id);
  };

  const handleAddTag = tag => {
    props.fields.push({ Text: tag });
  };

  const renderTagsList = Tags => {
    return (
      <div className={bemClasses('container')} data-cy={'tags-container'}>
        {Tags.map((tag, id) => (
          <Tag key={id} tag={tag.Text} id={id} deleteTag={handleDeleteTag} />
        ))}
      </div>
    );
  };

  return (
    <>
    <Paper className={bemClasses('paper')}>
      <InputTagComponent addTag={handleAddTag} />
    </Paper>
    {renderTagsList(Tags)}
    </>
  );
};

PostEditTags.propTypes = {
  Tags: PropTypes.array,
  name: PropTypes.string,
};
export const PostEditTagsConnected = props => {
  return <FieldArray component={PostEditTags} name={props.name} {...props} />;
};
// default PostEditTagsConnected as PostEditTags;
export default PostEditTags;
