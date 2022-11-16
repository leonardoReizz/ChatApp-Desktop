export type MyFriend = {
  _id: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateFriendRequest = {
  idUserReceive: string;
}

export interface Friend {
  _id: string;
  idUserOne: string;
  idUserTwo: string;
}

