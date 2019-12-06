import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { chatsSelector, messagesSelector } from '../../../redux/modules/chat/chatSelectors';
import { getUserIdSelector } from '../../../redux/modules/auth/authSelectors';
import { getChats, getMessages, updateMessages } from '../../../redux/modules/chat/chatActions';
import '../../../assets/styles/ChatPage.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    fontSize: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  receive: {
    backgroundColor: 'rgba(181, 181, 181, 0.3)',
    marginRight: 'auto',
    borderRadius: 20,
    width: 'fit-content',
    maxWidth: '45%',
    minWidth: 200,
    marginTop: 5,
  },
  send: {
    backgroundColor: 'rgba(118, 165, 219, 0.8)',
    marginLeft: 'auto',
    justifyItems: 'right',
    borderRadius: 20,
    width: 'fit-content',
    maxWidth: '45%',
    minWidth: 200,
    marginTop: 5,
  },
  input: {
    marginTop: 'auto',
    marginBottom: 10,
    width: '60%',
    maxWidth: 600,
  },
}));

export const Messages = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const updateChatMessages = newMessages => dispatch(updateMessages(newMessages));
  const messages = useSelector(messagesSelector);
  const userId = useSelector(getUserIdSelector);
  const [newMessage, setNewMessage] = useState('');

  const leaveToChats = () => {
    updateChatMessages([]);
    props.setChatOpened(false);
  };

  const sendMessage = e => {
    if (e.key === 'Enter') {
      // setNewMessage(e.target.value);
      console.log(e.target.value);
    }
  };

  return (
    <div className="messages">
      <div className={classes.root}>
        <ListItem button divider onClick={() => leaveToChats()}>
          <span className={classes.header}>{userId}</span>
        </ListItem>
        {messages.map(message => (
          <ListItem button key={message.id} className={userId === message.to ? classes.receive : classes.send}>
            <ListItemText primary={message.message} secondary={message.date} />
          </ListItem>
        ))}
      </div>
      <TextField
        className={classes.input}
        onKeyDown={e => sendMessage(e)}
        onChange={e => setNewMessage(e.target.value)}
        value={newMessage}
        id="outlined-basic"
        placeholder="Enter your message..."
        variant="outlined"
      />
    </div>
  );
};
