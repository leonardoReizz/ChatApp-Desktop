/*  eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import * as types from './types';
import APIFriend from '../../API/Friends/index';
import APIFriendRequest from '../../API/FriendRequest/index';
import getUserById from '../../API/User/getUserById';
import { store } from '../../main';
import { Friend } from './types';
import { User } from '../User/types';

const IPCFriends = [
  {
    async getMyFriends(event: Electron.IpcMainEvent, arg: any) {
      const { _id, token } = store.get('user') as User;

      const result = await APIFriend.getMyFriends();
      const listUsers = await Promise.all(
        result.data.msg.map(async (friend: Friend) => {
          let getUser;
          if (friend.idUserOne !== _id) {
            getUser = await getUserById({ _id: friend.idUserOne, token });
          } else {
            getUser = await getUserById({ _id: friend.idUserTwo, token });
          }
          return getUser.data.msg[0];
        })
      );

      event.reply('getMyFriendsResponse', listUsers);
    },
    async createFriendRequest(
      event: Electron.IpcMainEvent,
      arg: types.CreateFriendRequest
    ) {
      const result = await APIFriendRequest.createFriendRequest(arg);
      event.reply('createFriendRequest', result);
    },
  },
];

export default IPCFriends;
