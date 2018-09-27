import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import posts from './modules/posts/reducer';
import user from './modules/auth/reducer';
import profile from './modules/profile/reducer';
import undoRedoPost from './modules/undoRedoPost/reducer';

const rootReducer = combineReducers({
  posts,
  user,
  profile,
  form: formReducer,
  undoRedoPost,
});

export default rootReducer;
