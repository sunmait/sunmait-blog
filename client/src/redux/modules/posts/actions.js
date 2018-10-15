import { SAGAS_POSTS_CONSTANTS } from 'sagas/posts/constants';
import { POSTS_CONSTANTS } from './constants';

export const getPosts = (count, offset) => {
  return {
    type: SAGAS_POSTS_CONSTANTS.GET_POSTS,
    payload: {
      count,
      offset,
    },
  };
};

export const addPost = (title, description, imageUrl) => {
  return {
    type: SAGAS_POSTS_CONSTANTS.ADD_POST,
    payload: {
      title,
      description,
      imageUrl,
    },
  };
};

export const changePost = (description, selectedItemId) => {
  return {
    type: SAGAS_POSTS_CONSTANTS.CHANGE_POST,
    payload: {
      description,
      selectedItemId,
    },
  };
};

export const loadPostImage = file => {
  return {
    type: SAGAS_POSTS_CONSTANTS.LOAD_POST_IMAGE,
    payload: {
      file,
    },
  };
};

export const setTextareaSelectionValues = (start, end) => {
  return {
    type: SAGAS_POSTS_CONSTANTS.SET_TEXTAREA_SELECTION_VALUES,
    payload: {
      start,
      end,
    },
  };
};

export const insertImageIntoText = url => {
  return {
    type: SAGAS_POSTS_CONSTANTS.INSERT_IMAGE,
    payload: {
      url,
    },
  };
};

export const insertVideoIntoText = url => {
  return {
    type: SAGAS_POSTS_CONSTANTS.INSERT_VIDEO,
    payload: {
      url,
    },
  };
};

export const insertDividerIntoText = () => {
  return {
    type: SAGAS_POSTS_CONSTANTS.INSERT_DIVIDER,
  };
};

export const updatePost = (title, description, imageUrl, idPost) => {
  return {
    type: SAGAS_POSTS_CONSTANTS.UPDATE_POST,
    payload: {
      title,
      description,
      imageUrl,
      idPost,
    },
  };
};

export const deletePost = id => {
  return {
    type: SAGAS_POSTS_CONSTANTS.DELETE_POST,
    payload: { postId: id },
  };
};

export const setPostsFetchingStatus = isFetching => {
  return {
    type: POSTS_CONSTANTS.SET_POSTS_FETCHING_STATUS,
    payload: isFetching,
  };
};

export const clearPostsList = () => {
  return {
    type: POSTS_CONSTANTS.CLEAR_POSTS_LIST,
  };
};
