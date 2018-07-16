import { change } from 'redux-form';
import { POSTS_CONSTANTS } from 'redux/modules/posts/constants';

export default store => next => action => {

  if (action.type === POSTS_CONSTANTS.SET_TEXTAREA_SELECTION_VALUES) {
    store.dispatch(
      change('post', 'textareaSelectionStart', action.payload.start)
    );
    store.dispatch(
      change('post', 'textareaSelectionEnd', action.payload.end)
    );
  }
  
  next(action);
};
