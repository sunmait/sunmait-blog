import { combineReducers} from 'redux';
import auth, { IAuthState } from './modules/login/reducer';

const rootReducer = combineReducers<IStore>({
  auth,
});

export default rootReducer;

export interface IStore {
  auth: IAuthState;
}