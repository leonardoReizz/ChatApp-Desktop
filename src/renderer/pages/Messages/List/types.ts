export interface CurrentUser {
  _id: string;
  nameAndSurname: string;
  fullName: string;
  email: string;
  profilePicture: string | undefined;
}

export interface Friends {
  _id: string;
  fullName: string;
  imageProfile: string;
  status: string;
}
