import { POSTS_CONSTANTS } from './constants';

const defaultState = {
  posts: [],
  postsFetchingStatus: true,
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case POSTS_CONSTANTS.GET_POSTS:
      return handlePosts(state, payload);

    case POSTS_CONSTANTS.ADD_POST:
      return state;

    case POSTS_CONSTANTS.UPDATE_POST:
      return handleUpdatedPosts(state, payload);

    case POSTS_CONSTANTS.DELETE_POST:
      return handleDeletePost(state, payload);

    case POSTS_CONSTANTS.SET_POSTS_FETCHING_STATUS:
      return handleSetPostsFetchingStatus(state, payload);

    default:
      return state;
  }
}

function handleDeletePost(state, payload) {
  return { ...state, posts: payload };
}

function handleUpdatedPosts(state, updatedPosts) {
  return { ...state, posts: updatedPosts };
}

function handlePosts(state, posts) {
  return { ...state, posts, postsFetchingStatus: false };
}

function handleSetPostsFetchingStatus(state, isFetching) {
  return { ...state, postsFetchingStatus: isFetching };
}
