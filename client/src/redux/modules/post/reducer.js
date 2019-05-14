import { POST_CONSTANTS } from './constants';
import { POSTS_ACTIONS } from 'redux/modules/posts/postsConstants';

const defaultState = {
  post: null,
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case POST_CONSTANTS.GET_POST:
      return handleGetPost(state, payload);

    case POSTS_ACTIONS.UPDATE_POST_SUCCESS:
      return handleUpdatePost(state, payload);

    case POSTS_ACTIONS.DELETE_POST_SUCCESS:
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
