import axios from 'axios';
import { ApiDefaultResult } from '../types';

type CreateFriendRequest = {
  idUserReceive: string;
};

const createFriendRequest = (
  data: CreateFriendRequest
): Promise<ApiDefaultResult> => {
  const user = window.electron.store.get('user');
  return axios
    .post('/friendRequest', {
      idUserSend: user._id,
      idUserReceive: data.idUserReceive,
    })
    .then((result) => {
      return {
        status: result.status,
        data: result.data,
      };
    })
    .catch((error) => {
      console.log(error, ' ERROR CREATE FRIEND REQUEST');
      return {
        status: error.status,
        data: error.response.msg,
      };
    });
};

export default createFriendRequest;
