import { POSTS_ACTION_CONSTANTS } from './postsConstants';

const getPostsActionCreator = type => (count, offset, search) => ({
  type,
  payload: {
    count,
    offset,
    search,
  },
});
export const getPosts = getPostsActionCreator(POSTS_ACTION_CONSTANTS.GET_POSTS);
export const getPostsSuccess = posts => ({
  type: POSTS_ACTION_CONSTANTS.GET_POSTS_SUCCESS,
  payload: posts,
});
export const getMorePosts = getPostsActionCreator(POSTS_ACTION_CONSTANTS.GET_MORE_POSTS);
export const getMorePostsSuccess = posts => ({
  type: POSTS_ACTION_CONSTANTS.GET_MORE_POSTS_SUCCESS,
  payload: posts,
});
export const searchPosts = search => ({
  type: POSTS_ACTION_CONSTANTS.SEARCH_POSTS,
  payload: search,
});

export const addPost = (title, description, imageUrl) => ({
  type: POSTS_ACTION_CONSTANTS.ADD_POST,
  payload: {
    title,
    description,
    imageUrl,
  },
});

export const loadPostImage = file => ({
  type: POSTS_ACTION_CONSTANTS.LOAD_POST_IMAGE,
  payload: {
    file,
  },
});

export const setTextareaSelectionValues = (start, end) => ({
  type: POSTS_ACTION_CONSTANTS.SET_TEXTAREA_SELECTION_VALUES,
  payload: {
    start,
    end,
  },
});

export const insertImageIntoText = url => ({
  type: POSTS_ACTION_CONSTANTS.INSERT_IMAGE,
  payload: {
    url,
  },
});

export const insertVideoIntoText = url => ({
  type: POSTS_ACTION_CONSTANTS.INSERT_VIDEO,
  payload: {
    url,
  },
});

export const insertDividerIntoText = () => ({
  type: POSTS_ACTION_CONSTANTS.INSERT_DIVIDER,
  payload: {},
});

export const updatePost = (title, description, imageUrl, idPost) => ({
  type: POSTS_ACTION_CONSTANTS.UPDATE_POST,
  payload: {
    title,
    description,
    imageUrl,
    idPost,
  },
});

export const deletePost = id => ({
  type: POSTS_ACTION_CONSTANTS.DELETE_POST,
  payload: { postId: id },
});

export const setPostsFetchingStatus = isFetching => ({
  type: POSTS_ACTION_CONSTANTS.SET_POSTS_FETCHING_STATUS,
  payload: isFetching,
});
export const setMorePostsFetchingStatus = isFetching => ({
  type: POSTS_ACTION_CONSTANTS.SET_MORE_POSTS_FETCHING_STATUS,
  payload: isFetching,
});

export const clearPostsList = () => ({
  type: POSTS_ACTION_CONSTANTS.CLEAR_POSTS_LIST,
});
