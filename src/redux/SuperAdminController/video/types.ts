import { LoadingState } from "../../../types/AppNav";

export type DashState = {
  currentUser: UserInfo | null;
  loading: LoadingState;
  videoData:[]
};

export type UserInfo = {
  username?: any;
  accessToken: string;
  refreshToken: string;
  avatarUrl?: string;
  token?:string
};


export type AddVideoRequest = {
  title?: string;
  description?: string;
  file?:any
};

