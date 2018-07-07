import {SAGAS_POSTS_CONSTANTS} from 'sagas/posts/constants';

export const getPosts = () => {
  return {
    type: SAGAS_POSTS_CONSTANTS.GET_POSTS
  }
};

export const addPost = (title, description) => {
  return {
    type: SAGAS_POSTS_CONSTANTS.ADD_POST,
    payload: {
      title,
      description
    }
  }
};

export const updatePost = (title, description, idPost) => {
  return {
    type: SAGAS_POSTS_CONSTANTS.UPDATE_POST,
    payload: {
      title,
      description,
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
