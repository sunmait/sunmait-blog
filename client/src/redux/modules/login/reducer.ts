import AUTORIZE_USER from './actionConstant';

const defaultState: IAuthState = {
  user: null,
};

export default function(
  state: IAuthState = defaultState,
  {type, payload}: { type: string; payload: any },
) {
  switch (type) {
    case AUTORIZE_USER:
      return handleLogin(state, payload);
    default:
      return state;
  }
}

const handleLogin = (state: IAuthState, user: IUser) => {
  alert("Redux!");
  return {...state, user};
};

export interface IUser {
  id: number;
  Login: string;
  PhotoUrl: string;
  AccessToken: string;
}

export interface IAuthState {
  user: null | IUser;
}