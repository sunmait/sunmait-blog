import * as axios from 'axios';

export const login = async (Login, Password) => {
  return await axios.post(
    '/api/auth', {Login, Password}
  );
};
