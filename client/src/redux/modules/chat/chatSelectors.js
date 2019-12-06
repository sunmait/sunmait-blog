import { createSelector } from 'reselect';

export const chatsSelector = createSelector([state => state.chat.chats], chats => chats);
export const messagesSelector = createSelector([state => state.chat.messages], messages => messages);
