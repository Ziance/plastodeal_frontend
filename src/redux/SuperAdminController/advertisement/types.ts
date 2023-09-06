import { LoadingState } from "../../../types/AppNav";

export type DashState = {
  currentUser: UserInfo | null;
  loading: LoadingState;
  advertisementData:any
  allAdvertisementData:any
};

export type UserInfo = {
  username?: any;
  accessToken: string;
  refreshToken: string;
  avatarUrl?: string;
  token?:string
};

export type AddAdvertisementRequest = {
  title?: string;
  description?: string;
  file?:any,
  categoryId?:any;
};

export type Advertisement = {
  id?: any;
 
};
export type ResponseInfo = {
  id?: any;
  
};
