import POSTS_CONSTANTS from './actionConstants';
import { Dispatch } from 'redux/store';
import * as axios from 'axios';
import history from 'components/containers/history';

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
