import { LoadingState } from "../../types/AppNav";

export type DashState = {
  currentUser: UserInfo | null;
  loading: LoadingState;
};

export type UserInfo = {
  username?: any;
  accessToken: string;
  refreshToken: string;
  avatarUrl?: string;
  token?:string
};

export type PostRequirementRequest = {
  name?: any;
  contactNo?: any;
  email?:any,
  subject?:string;
  message?:string
};

export type ResetPasswordRequest = {
  username?: string;
};

export type ChangePasswordRequest = {
  recoveryCode: string;
  password: string;
};

export type SignUpRequest = {
  firstName?: string,
  lastName?:string,
  email?: string,
  phoneNumber?:any,
  countryCode?:any,
  password?: string,
  confirmPassword?:string,
  companyName?:string,
  companyType?:string,
  contactPerson?:string,
  companyContactNumber?:any,
  address?:string,
  country?:string,
  state?:string,
  city?:string,
  zipCode?:any,
  accept?: boolean,
  companyLogo?:any
};
