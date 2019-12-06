import { CHAT_CONSTANTS } from './chatConstants';

const defaultState = {
  chats: [],
  messages: [],
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case CHAT_CONSTANTS.GET_CHATS_SUCCESS:
      return handleGetChats(state, payload);
    case CHAT_CONSTANTS.GET_MESSAGES_SUCCESS:
      return handleGetMessages(state, payload);
      case CHAT_CONSTANTS.UPDATE_MESSAGES:
        return handleUpdateMessages(state, payload);
    default:
      return state;
  }
}

const handleGetChats = (state, payload) => {
  return { ...state, chats: [...state.chats, ...payload] };
};

const handleGetMessages = (state, payload) => {
  return { ...state, messages: [...state.messages, ...payload] };
};

const handleUpdateMessages = (state, payload) => {
  return { ...state, messages: [...payload]};
};

