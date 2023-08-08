import { LoadingState } from "../../types/AppNav";

export type AuthState = {
  currentUser: UserInfo | null;
  loading: LoadingState;
};

export type UserInfo = {
  username?: any;
  accessToken: string;
  refreshToken: string;
  user?: User;
  avatarUrl?: string;
  token?: string;
};
export type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: any;
  countryCode?: any;
  password?: string;
  userRole?: string;
  interestedIn?: string;
  companyName?: string;
  companyType?: string;
  companyPersonName?: string;
  companyContactNumber?: any;
  companyContactCode?: any;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: any;
  userStatus?: boolean;
  isDelete?: boolean;
  createdAt?: any;
  updatedAt?: any;
  companyLogo?: any;
};

export type LoginRequest = {
  email: any;
  password: any;
  token?: string;
};

export type ResetPasswordRequest = {
  username?: string;
};
export type ForgotPasswordRequest = {
  email?: string;
};
export type ChangePasswordRequest = {
  recoveryCode: string;
  password: string;
};

export type SignUpRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: any;
  countryCode?: any;
  password?: string;
  confirmPassword?: string;
  companyName?: string;
  companyType?: string;
  contactPerson?: string;
  companyContactNumber?: any;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: any;
  accept?: boolean;
  companyLogo?: any;
  userRole?:any
};
