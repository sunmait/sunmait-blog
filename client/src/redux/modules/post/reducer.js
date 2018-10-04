import { POST_CONSTANTS } from './constants';

const defaultState = {
  post: null,
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case POST_CONSTANTS.GET_POST:
      return handleGetPost(state, payload);

    case POST_CONSTANTS.UPDATE_POST:
      return handleUpdatePost(state, payload);

    case POST_CONSTANTS.DELETE_POST:
      return handleDeletePost(state);

    default:
      return state;
  }
}

function handleGetPost(state, post) {
  return { ...state, post: post };
}

function handleUpdatePost(state, post) {
  return { ...state, post: post };
}

function handleDeletePost(state) {
  return { ...state, post: null };
}
