import * as types from './types';
import APIUser from '../../API/User/index';

const IPCUser = [
  {
    async userLogin(event: Electron.IpcMainEvent, arg: types.UserLogin) {
      const result = await APIUser.userLogin(arg);
      return event.reply('userLoginResponse', result);
    },
  },
  {
    async userRegister(event: Electron.IpcMainEvent, arg: types.UserRegister) {
      const result = APIUser.userRegister(arg);
      return event.reply('userRegisterResponse', result);
    },
  },
  {
    async getUser(event: Electron.IpcMainEvent, arg: types.GetUser) {
      const result = APIUser.getUser(arg);
      return event.reply('getUserResponse', result);
    },
  },
];

export default IPCUser;
