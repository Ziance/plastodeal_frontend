import { LoadingState } from "../../types/AppNav";

export type AuthState = {
  currentUser: UserInfo | null;
  loading: LoadingState;
};

export type UserInfo = {
  username?: any;
  accessToken: string;
  refreshToken: string;
  avatarUrl?: string;
};

export type LoginRequest = {
  username: any;
  password: any;
};

export type ResetPasswordRequest = {
  username?: string;
};

export type ChangePasswordRequest = {
  recoveryCode: string;
  password: string;
};

export type SignUpRequest = {
  username: string;
  email: string;
  password: string;
};
