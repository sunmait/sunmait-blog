export const POSTS_ACTIONS = {
  GET_POSTS: 'GET_POSTS',
  GET_POSTS_SUCCESS: 'GET_POSTS_SUCCESS',

  GET_COMMENTS_FROM_CURRENT_POST: 'GET_COMMENTS_FROM_CURRENT_POST',

  GET_MORE_POSTS: 'GET_MORE_POSTS',
  GET_MORE_POSTS_SUCCESS: 'GET_MORE_POSTS_SUCCESS',

  SET_POSTS_FETCHING_STATUS: 'SET_POSTS_FETCHING_STATUS',
  SET_MORE_POSTS_FETCHING_STATUS: 'SET_MORE_POSTS_FETCHING_STATUS',

  ADD_POST: 'ADD_POST',

  UPDATE_POST: 'UPDATE_POST',
  UPDATE_POST_SUCCESS: 'UPDATE_POST_SUCCESS',

  DELETE_POST: 'DELETE_POST',
  DELETE_POST_SUCCESS: 'DELETE_POST_SUCCESS',

  CLEAR_POSTS_LIST: 'CLEAR_POSTS_LIST',

  LOAD_POST_IMAGE: 'LOAD_POST_IMAGE',

  SET_TEXTAREA_SELECTION_VALUES: 'SET_TEXTAREA_SELECTION_VALUES',

  INSERT_IMAGE: 'INSERT_IMAGE',

  INSERT_VIDEO: 'INSERT_VIDEO',

  INSERT_DIVIDER: 'INSERT_DIVIDER',
};

export const INITIAL_NUMBER_OF_POSTS = 12;

export const DESKTOP_LAZY_LOAD_POST_NUMBER = 3;
export const TABLET_LAZY_LOAD_POST_NUMBER = 4;
export const MOBILE_LAZY_LOAD_POST_NUMBER = 2;
