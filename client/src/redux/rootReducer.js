import { combineReducers} from 'redux';
// import auth from './modules/auth/reducer';
import posts from './modules/posts/reducer';

const rootReducer = combineReducers({
  posts,
});

export default rootReducer;
