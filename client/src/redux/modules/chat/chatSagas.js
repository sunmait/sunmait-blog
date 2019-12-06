import { put, takeLatest, select, all } from 'redux-saga/effects';
import * as axios from 'axios';
import { SAGAS_CHAT_CONSTANTS, CHAT_CONSTANTS } from './chatConstants';
import { getChatsSuccess, getMessagesSuccess } from './chatActions'
import { chatsSelector, messagesSelector } from './chatSelectors';

function* getChats(action) {  
  const { user, count, offset } = action.payload;
  try {
    const chats = yield axios.get(
      `/api/chat/${user}&${count}&${offset}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
        },
      }
    );
    yield put(getChatsSuccess(chats.data));
    yield select(chatsSelector)
  } catch (error) {
    console.log(error);
  }
}

function* getMessages(action) {  
  const { user1, user2, count, offset } = action.payload;  
  try {
    const messages = yield axios.get(
      `/api/chat/${user1}/${user2}/${count}&${offset}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
        },
      }
    );
    yield put(getMessagesSuccess(messages.data));
    yield select(messagesSelector)
  } catch (error) {
    console.log(error);
  }
}

export function* chatSagas() {
  yield all([
    takeLatest(SAGAS_CHAT_CONSTANTS.GET_CHATS, getChats),
    takeLatest(SAGAS_CHAT_CONSTANTS.GET_MESSAGES, getMessages),
  ]);
}