import axios from 'axios';
import { api } from '../../util/api';
import { ApiDefaultResult } from '../types';

export type Props = {
  fullName: string;
  email: string;
  password: string;
};

const userRegister = (data: Props): Promise<ApiDefaultResult> => {
  return axios
    .post(`${api}/user/register`, {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    })
    .then((result) => {
      return {
        status: result.status,
        data: result.data,
      };
    })
    .catch((err) => {
      console.log(err, ' ERROR REGISTER');
      return {
        status: err.response.status,
        data: err.response.data,
      };
    });
};

export default userRegister;
