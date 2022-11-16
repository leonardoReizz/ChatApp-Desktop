import axios from 'axios';
import { api } from '../../util/api';
import { User } from '../User/types';
import { ApiDefaultResult } from '../types';
import { store } from '../../main';

const getMyFriends = (): Promise<ApiDefaultResult> => {
  const user = store.get('user') as User;
  return axios
    .get(`${api}/friends/${user._id}`, {
      headers: {
        authorization: user.token,
      },
    })
    .then((result) => {
      return {
        status: result.status,
        data: result.data,
      };
    })
    .catch((error) => {
      console.log(error, ' ERROR GET MY FRIENDS');
      return {
        status: error.status,
        data: error.response.msg,
      };
    });
};

export default getMyFriends;
