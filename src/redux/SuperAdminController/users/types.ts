import { LoadingState } from "../../../types/AppNav";

export type UserState = {
  userDetails: UserInfo[];
  loading: LoadingState;
  companyDetails: CompanyInfo[];
};

export type UserInfo = {
  userRole: string;
  id: any | null | undefined;
  accountName: any;
  name: any;
  organisationName: any;
  phone: any;
  firstName?: string;
  lastName: string;
  address: string;
  email?: string;
  userStatus?: boolean;
  phoneNumber?: number;
  password?: string;
  interestedIn?: string;
};

export type CompanyInfo = {
  firstName?: string;
  lastName: string;
  email?: string;
  phoneNumber?: number;
  password?: string;
};
