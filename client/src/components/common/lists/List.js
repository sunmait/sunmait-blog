import React from 'react';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(styles => ({
  root: { ...styles.root, maxWidth: '360px' },
}));

export const ListItems = props => {
  const classes = useStyles(props.styles);
  return <List className={classes.root}>{props.children}</List>;
};

ListItems.propTypes = {
  styles: PropTypes.object.isRequired,
  children: PropTypes.array,
};

ListItems.defaultProps = {
  children: [],
};
