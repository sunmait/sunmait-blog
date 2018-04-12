import APP_ACTIONS from './actionConstants';

const defaultState = {
  notification: null,
};

export default function(
  state = defaultState,
  { type, payload },
) {
  switch (type) {
    case APP_ACTIONS.ADD_NOTIFICATION:
      return handleAddNotification(state, payload);
    case APP_ACTIONS.DELETE_NOTIFICATION:
      return handleDeleteNotification(state);

    default:
      return state;
  }
}

const handleAddNotification = (state, notification) => {
  return {
    ...state,
    notification,
  };
};

const handleDeleteNotification = (state) => {
  const newState = Object.assign({}, state);
  delete newState.notification.status;
  delete newState.notification.message;

  return newState;
  // return { ...state, notification: {} };
};