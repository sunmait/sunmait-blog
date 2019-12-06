import { SAGAS_CHAT_CONSTANTS, CHAT_CONSTANTS } from './chatConstants';

export const getChatsSuccess = payload => {
  return {
    type: CHAT_CONSTANTS.GET_CHATS_SUCCESS,
    payload: payload,
  };
};

export const getMessagesSuccess = payload => {
  return {
    type: CHAT_CONSTANTS.GET_MESSAGES_SUCCESS,
    payload: payload,
  };
};

export const updateMessages = payload => {
  return {
    type: CHAT_CONSTANTS.UPDATE_MESSAGES,
    payload: payload,
  };
};

export const getChats = payload => {
  return {
    type: SAGAS_CHAT_CONSTANTS.GET_CHATS,
    payload: { user: payload.user, count: payload.count, offset: payload.offset },
  };
};

export const getMessages = payload => {
  return {
    type: SAGAS_CHAT_CONSTANTS.GET_MESSAGES,
    payload: { user1: payload.user1, user2: payload.user2, count: payload.count, offset: payload.offset },
  };
};
