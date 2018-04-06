import AUTORIZE_USER from './actionConstant';
import { Dispatch } from 'redux/store';
import { IUser } from './reducer';

export type Login = () => (dispatch: Dispatch) => void;
export const login: Login = () => (dispatch: Dispatch) => {
  const user: IUser = {
    id: 4,
    Login: 'Chernikov',
    PhotoUrl: 'https://vk.com/images/camera_200.png',
    AccessToken: 'token',
  };

  dispatch({
    type: AUTORIZE_USER,
    payload: user,
  });
};