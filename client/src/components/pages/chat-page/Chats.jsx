import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { chatsSelector, messagesSelector } from '../../../redux/modules/chat/chatSelectors';
import { getUserIdSelector } from '../../../redux/modules/auth/authSelectors';
import { getChats, getMessages } from '../../../redux/modules/chat/chatActions';
import '../../../assets/styles/ChatPage.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const Chats = ({ chats, openChat, setChatOpened }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const getAllChats = ({ user, count, offset }) => dispatch(getChats({ user, count, offset }));
  const getChatMessages = ({ user1, user2, count, offset }) => dispatch(getMessages({ user1, user2, count, offset }));

  const messages = useSelector(messagesSelector);
  const userId = useSelector(getUserIdSelector);

  return (
    <div className="chats">
      <List className={classes.root}>
        {chats.map(chat => (
          <ListItem button divider key={chat.chat[0].id} onClick={() => openChat(chat.userWith)}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={chat.userWith} secondary={chat.chat[0].message} />
            <span className="date">{chat.chat[0].date}</span>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
