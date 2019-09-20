import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(styles => ({
  inline: { ...styles.inline, fontSize: '13px' },
  inlineAuth: { ...styles.inline, fontSize: '17px' },
}));

export const Item = props => {
  const classes = useStyles(props.styles);
  const date = props.date;
  const user = props.user;

  return (
    <React.Fragment>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Avatar" src={props.userAvatar} />
        </ListItemAvatar>
        <ListItemText
          primary={date}
          data-cy="comment-date"
          secondary={
            <React.Fragment>
              <Typography component="span" className={classes.inlineAuth} color="textPrimary" data-cy="comment-auth">
                {user}
              </Typography>
              <Typography component="span" className={classes.inline} color="textPrimary" data-cy="comment-text">
                {' - ' + props.text}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
};

Item.propTypes = {
  userAvatar: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  date: PropTypes.string,
  user: PropTypes.string,
};

Item.defaultProps = {
  text: 'KekCheburek',
  userAvatar: 'https://pngimage.net/wp-content/uploads/2018/05/admin-avatar-png-5.png',
};
