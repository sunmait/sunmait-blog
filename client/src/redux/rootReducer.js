import { combineReducers} from 'redux';
import posts from './modules/posts/reducer';
import user from './modules/auth/reducer';

const rootReducer = combineReducers({
  posts,
  user
});

export default rootReducer;
