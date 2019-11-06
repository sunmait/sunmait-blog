import { POSTS_ACTIONS } from './postsConstants';

const defaultState = {
  posts: [],
  postsFetchingStatus: true,
  morePostsFetchingStatus: false,
  noMorePosts: false,
  searchTags: [],
};

export default function(state = defaultState, { type, payload }) {
  switch (type) {
    case POSTS_ACTIONS.GET_POSTS_SUCCESS:
      return { ...state, posts: payload, postsFetchingStatus: false };

    case POSTS_ACTIONS.GET_MORE_POSTS_SUCCESS:
      return handleUploadMorePosts(state, payload);

    case POSTS_ACTIONS.UPDATE_POST_SUCCESS:
      return handleUpdatedPosts(state, payload);

    case POSTS_ACTIONS.SET_POSTS_FETCHING_STATUS:
      return handleSetPostsFetchingStatus(state, payload);

    case POSTS_ACTIONS.SET_MORE_POSTS_FETCHING_STATUS:
      return { ...state, morePostsFetchingStatus: payload };

    case POSTS_ACTIONS.CLEAR_POSTS_LIST:
      return handleClearPostsList(state);
      
    case POSTS_ACTIONS.CHANGE_SEARCH_TAGS:
      return handleChangeSearchTags(state, payload);

    default:
      return state;
  }
}

function handleUpdatedPosts(state, updatedPosts) {
  return { ...state, posts: updatedPosts };
}

function handleUploadMorePosts(state, posts) {
  const noMorePosts = posts.length === 0;
  const updatedPosts = [...state.posts, ...posts];

  return { ...state, posts: updatedPosts, noMorePosts, morePostsFetchingStatus: false };
}

function handleSetPostsFetchingStatus(state, isFetching) {
  return { ...state, postsFetchingStatus: isFetching };
}

function handleClearPostsList(state) {
  return { ...state, posts: [] };
}

function handleChangeSearchTags(state, payload ){
  return { ...state, searchTags: [...payload] };
}
