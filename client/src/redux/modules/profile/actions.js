import USER_CONSTANTS from './actionConstants';
import { Dispatch } from 'redux/store';
import * as axios from 'axios';
import history from 'components/containers/history';

const axiosRequest = axios;

export function getUsers() {
  return (dispatch) => {
    return axiosRequest
      .get(`/api/users`)
      .then((res) => {
        dispatch({
          type: USER_CONSTANTS.GET_USERS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };
}

export function getUser(userId) {
  return (dispatch) => {
    return axiosRequest
      .get(`/api/users/${userId}`)
      .then((res) => {
        dispatch({
          type: USER_CONSTANTS.GET_USER,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };
}

export function updateUser(userId, FirstName, LastName, Login ) {
  return (dispatch) => {
    return axiosRequest
      .patch(`/api/users/${userId}`, { FirstName, LastName, Login } )
      .then((res) => {
        dispatch({
          type: USER_CONSTANTS.CHANGE,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  };
}