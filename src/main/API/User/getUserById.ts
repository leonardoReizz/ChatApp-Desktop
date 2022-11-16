import axios from 'axios';
import { api } from '../../util/api';
import { ApiDefaultResult } from '../types';
import { store } from "../../main";

type Props = {
  _id: string;
  token: string;
};

const getUserById = (data: Props): Promise<ApiDefaultResult> => {
  return axios
    .get(`${api}/user/id/${data._id}`, {
      headers: {
        authorization: data.token,
      },
    })
    .then((result) => {
      return {
        status: result.status,
        data: result.data,
      };
    })
    .catch((error) => {
      console.log(error, ' ERROR GET USER BY ID');
      return {
        status: error.status,
        data: {
          msg: error.response.msg
        },
      };
    });
};
export default getUserById;
