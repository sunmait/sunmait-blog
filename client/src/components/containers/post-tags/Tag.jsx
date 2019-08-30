import 'assets/styles/Article.css';

import React from 'react';
import { getBEMClasses } from 'helpers//BEMHelper';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { change } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const editPost = 'add-post-form';
const bemClasses = getBEMClasses([editPost]);

let Tag = props => {
  const { tag, id, deleteTag } = props;
  const handleDelete = () => {
    deleteTag(id);
  };
  const handleClick = e => {
    let input = document.getElementById('search-bar');
    props.change('posts', 'searchQuery', '#' + e.target.firstChild.textContent + ' ' + input.value);
  };
  return (
    <div className={bemClasses('chip')}>
      <Chip
        onClick={e => handleClick(e)}
        data-cy={'tag-item' + id}
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
const mapDispatchToProps = { change };
export default (Tag = connect(
  null,
  mapDispatchToProps
)(Tag));
