import APP_ACTIONS from './actionConstants';
import { Dispatch } from 'redux/store';

export const addNotification = (notification) => (dispatch) => {
  if (notification.status === 403) {
    notification.message = 'You don\'t have access to this action';
  } else if (notification.status === 404) {
    notification.message = 'This item is not found';
  } else if (notification.status === 401) {
    notification.message = 'You should be authorized for this action';
  }
  dispatch({
    type: APP_ACTIONS.ADD_NOTIFICATION,
    payload: notification,
  });
};

export const deleteNotification = () => (dispatch) => {
  dispatch({
    type: APP_ACTIONS.DELETE_NOTIFICATION,
  });
};