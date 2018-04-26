import POSTS_CONSTANTS from './actionConstants';
import { Dispatch } from 'redux/store';
import * as axios from 'axios';
import history from 'components/containers/history';
import sendRequest from 'components/helpers/authRequest';

const axiosRequest = axios;


export function getPosts() {
  return (dispatch) => {
    return axiosRequest
      .get('/api/posts')
      .then((res) => {
        dispatch({
          type: POSTS_CONSTANTS.GET_POSTS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };
}

export function addPost(Title, Description) {
  const UserId = JSON.parse(localStorage.getItem('User')).id;
  return (dispatch) => {
    return sendRequest('post', '/api/posts', { Title, Description, UserId })
      .then((res) => {
        dispatch({
          type: POSTS_CONSTANTS.ADD_POST,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }
}

export function updatePost(Title, Description, idPost) {
  return (dispatch) => {
    return sendRequest('patch', `/api/posts`, { idPost, Description, Title })
    .then((res) => {
      dispatch({
        type: POSTS_CONSTANTS.UPDATE_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  }
}

export function deletePost(idPost) {
  return (dispatch) => {
    return sendRequest('delete', `/api/posts/${idPost}`, idPost)
    .then((res) => {
      dispatch({
        type: POSTS_CONSTANTS.DELETE_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  }
}
