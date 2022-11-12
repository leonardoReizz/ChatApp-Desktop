/* eslint-disable import/no-cycle */
import axios from 'axios';
import { store } from '../../main';
import { api } from '../../util/api';
import * as types from './types';

const IPCUser = [
  {
    async userLogin(event: Electron.IpcMainEvent, arg: types.UserLogin) {
      axios
        .post(`${api}/user/login`, {
          email: arg.email,
          password: arg.password,
        })
        .then((result) => {
          store.set('user', result.data.msg);
          return event.reply('userLoginResponse', {
            status: result.status,
            data: result.data,
          });
        })
        .catch((err) => {
          console.log(err, ' catch ERROR LOGIN');
          return event.reply('userLoginResponse', {
            status: err.response.status,
            data: err.response.data,
          });
        });
    },
  },
  {
    async userRegister(event: Electron.IpcMainEvent, arg: types.UserRegister) {
      axios
        .post(`${api}/user/register`, {
          fullName: arg.fullName,
          email: arg.email,
          password: arg.password,
        })
        .then((result) => {
          return event.reply('userRegisterResponse', {
            status: result.status,
            data: result.data,
          });
        })
        .catch((err) => {
          console.log(err, ' ERROR REGISTER');
          return event.reply('userRegisterResponse', {
            status: err.response.status,
            data: err.response.data,
          });
        });
    },
  },
];

export default IPCUser;
