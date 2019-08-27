import 'assets/styles/Article.css';

import React from 'react';
import { getBEMClasses } from 'helpers//BEMHelper';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';

const editPost = 'add-post-form';
const bemClasses = getBEMClasses([editPost]);

const Tag = props => {
  const { tag, id, deleteTag } = props;
  const handleDelete = () => {
    deleteTag(id);
  };

  return (
    <div className={bemClasses('chip')}>
      <Chip
        style={{ fontSize: '15px' }}
        variant="outlined"
        color="primary"
        size="medium"
        label={tag}
        onDelete={deleteTag ? handleDelete : null}
      />
    </div>
  );
};

Tag.propTypes = {
  tag: PropTypes.string,
  id: PropTypes.number,
  deleteTag: PropTypes.func,
};

export default Tag;
