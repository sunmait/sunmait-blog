import 'assets/styles/Article.css';
import React from 'react';
import { getBEMClasses } from 'helpers//BEMHelper';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { change } from 'redux-form';
import { connect } from 'react-redux';
const useStyles = makeStyles({
  root: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#2f80ed!important',
      color: '#fff',
    },
  },
});
const editPost = 'add-post-form';
const bemClasses = getBEMClasses([editPost]);

const Tag = props => {
  const { tag, id, deleteTag } = props;
  const handleDelete = () => {
    deleteTag(id);
  };
  const handleClick = e => {
    let input = document.getElementById('search-bar');
    props.change('posts', 'searchQuery', '#' + e.target.firstChild.textContent + ' ' + input.value);
  };
  const classes = useStyles();
  return (
    <div className={bemClasses('chip')}>
      <Chip
        className={classes.root}
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
export default connect(
  null,
  mapDispatchToProps
)(Tag);
