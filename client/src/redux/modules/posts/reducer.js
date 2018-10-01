import { POSTS_CONSTANTS } from './constants';

const defaultState = {
  posts: [],
  postsFetchingStatus: true,
  isNoMorePosts: false,
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case POSTS_CONSTANTS.GET_POSTS:
      return handlePosts(state, payload);

    case POSTS_CONSTANTS.UPDATE_POST:
      return handleUpdatedPosts(state, payload);

    case POSTS_CONSTANTS.SET_POSTS_FETCHING_STATUS:
      return handleSetPostsFetchingStatus(state, payload);

    case POSTS_CONSTANTS.CLEAR_POSTS_LIST:
      return handleClearPostsList(state);

    default:
      return state;
  }
}

function handleUpdatedPosts(state, updatedPosts) {
  return { ...state, posts: updatedPosts };
}

function handlePosts(state, posts) {
  const isNoMorePosts = posts.length === 0;
  const updatedPosts = [...state.posts, ...posts];
  return { ...state, posts: updatedPosts, isNoMorePosts };
}

function handleSetPostsFetchingStatus(state, isFetching) {
  return { ...state, postsFetchingStatus: isFetching };
}

function handleClearPostsList(state) {
  return { ...state, posts: [] };
}
