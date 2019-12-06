import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Messages } from './Messages';
import { Chats } from './Chats';
import { chatsSelector, messagesSelector } from '../../../redux/modules/chat/chatSelectors';
import { getUserIdSelector } from '../../../redux/modules/auth/authSelectors';
import { getChats, getMessages } from '../../../redux/modules/chat/chatActions';
import '../../../assets/styles/ChatPage.css';


export const ChatPage = props => {
  const dispatch = useDispatch();
  const getAllChats = ({ user, count, offset }) => dispatch(getChats({ user, count, offset }));
  const getChatMessages = ({ user1, user2, count, offset }) => dispatch(getMessages({ user1, user2, count, offset }));

  const chats = useSelector(chatsSelector);
  const userId = useSelector(getUserIdSelector);

  const [isChatOpen, setChatOpened] = useState(false);

  const openChat = user2 => {
    getChatMessages({ user1: userId, user2, count: 20, offset: 0 });
    setTimeout(() => {
      setChatOpened(true);
    }, 100);
  };

  useEffect(() => {
    getAllChats({ user: userId, count: 20, offset: 0 });
  }, []);

  return (
    <div className="chat-page">
      {isChatOpen ? (
        <Messages setChatOpened={setChatOpened} />
      ) : (
         <Chats chats={chats} openChat={openChat} setChatOpened={setChatOpened} />
      )}
    </div>
  );
};
