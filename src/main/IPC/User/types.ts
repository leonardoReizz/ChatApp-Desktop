export type UserType = {
  _id: string;
  fullName: string;
  email: string;
  status: string;
  imageProfile: string;
  token: string;
};
export type UserLogin = {
  email: string;
  password: string;
};
export type UserRegister = {
  fullName: string;
  email: string;
  password: string;
};
export type GetUser = {
  _id: string;
};
