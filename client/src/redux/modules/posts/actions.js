
import {SAGAS_POSTS_CONSTANTS} from 'sagas/posts/constants';

export const getPosts = () => {
  return {
    type: SAGAS_POSTS_CONSTANTS.GET_POSTS
  }
};

export const addPost = (title, description, imageUrl) => {
  return {
    type: SAGAS_POSTS_CONSTANTS.ADD_POST,
    payload: {
      title,
      description,
      imageUrl
    }
  }
};

export const loadPostImage = (file) => {
  return {
    type: SAGAS_POSTS_CONSTANTS.LOAD_POST_IMAGE,
    payload: {
      file
    }
  }
};

export const updatePost = (title, description, imageUrl, idPost) => {
  return {
    type: SAGAS_POSTS_CONSTANTS.UPDATE_POST,
    payload: {
      title,
      description,
      imageUrl,
      idPost,
    }
  }
};

export const deletePost = id => {
  return {
    type: SAGAS_POSTS_CONSTANTS.DELETE_POST,
    payload: {postId: id}
  }
};
