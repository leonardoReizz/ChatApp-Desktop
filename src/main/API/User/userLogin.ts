import axios from 'axios';
import { api } from '../../util/api';
import { store } from '../../main';
import { ApiDefaultResult } from '../types';

export type Props = {
  email: string;
  password: string;
};

const userLogin = async (user: Props): Promise<ApiDefaultResult> => {
  return axios
    .post(`${api}/user/login`, {
      email: user.email,
      password: user.password,
    })
    .then((result) => {
      store.set('user', result.data.msg);
      return {
        status: result.status,
        data: result.data,
      };
    })
    .catch((err) => {
      console.log(err, ' catch ERROR LOGIN');
      return {
        status: err.response.status,
        data: err.response.data,
      };
    });
};

export default userLogin;
