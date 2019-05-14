import { POSTS_ACTIONS } from './postsConstants';

const getPostsActionCreator = type => (count, offset, search) => ({
  type,
  payload: {
    count,
    offset,
    search,
  },
});
export const getPosts = getPostsActionCreator(POSTS_ACTIONS.GET_POSTS);
export const getPostsSuccess = posts => ({
  type: POSTS_ACTIONS.GET_POSTS_SUCCESS,
  payload: posts,
});
export const getMorePosts = getPostsActionCreator(POSTS_ACTIONS.GET_MORE_POSTS);
export const getMorePostsSuccess = posts => ({
  type: POSTS_ACTIONS.GET_MORE_POSTS_SUCCESS,
  payload: posts,
});
export const searchPosts = search => ({
  type: POSTS_ACTIONS.SEARCH_POSTS,
  payload: search,
});

export const addPost = (title, description, imageUrl) => ({
  type: POSTS_ACTIONS.ADD_POST,
  payload: {
    title,
    description,
    imageUrl,
  },
});

export const loadPostImage = file => ({
  type: POSTS_ACTIONS.LOAD_POST_IMAGE,
  payload: {
    file,
  },
});

export const setTextareaSelectionValues = (start, end) => ({
  type: POSTS_ACTIONS.SET_TEXTAREA_SELECTION_VALUES,
  payload: {
    start,
    end,
  },
});

export const insertImageIntoText = url => ({
  type: POSTS_ACTIONS.INSERT_IMAGE,
  payload: {
    url,
  },
});

export const insertVideoIntoText = url => ({
  type: POSTS_ACTIONS.INSERT_VIDEO,
  payload: {
    url,
  },
});

export const insertDividerIntoText = () => ({
  type: POSTS_ACTIONS.INSERT_DIVIDER,
  payload: {},
});

export const updatePost = (title, description, imageUrl, idPost) => ({
  type: POSTS_ACTIONS.UPDATE_POST,
  payload: {
    title,
    description,
    imageUrl,
    idPost,
  },
});

export const deletePost = id => ({
  type: POSTS_ACTIONS.DELETE_POST,
  payload: { postId: id },
});

export const setPostsFetchingStatus = isFetching => ({
  type: POSTS_ACTIONS.SET_POSTS_FETCHING_STATUS,
  payload: isFetching,
});
export const setMorePostsFetchingStatus = isFetching => ({
  type: POSTS_ACTIONS.SET_MORE_POSTS_FETCHING_STATUS,
  payload: isFetching,
});

export const clearPostsList = () => ({
  type: POSTS_ACTIONS.CLEAR_POSTS_LIST,
});
