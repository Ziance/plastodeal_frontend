import { LoadingState } from "../../../types/AppNav";

export type StaticPagesState = {
  staticPagesDetails: any;
  addJobFormdata: AddJobForm[];
  loading: LoadingState;
};

export type JobsInfo = {
  _id:  null | undefined;
  name:string;
  jobType?: any;
  jobCategory: string;
  jobTitle: string;
  jobLocation?: string;
  companyName?: string;
  expiryDate?: string;
  status?: boolean;
  action?: string;
  contactNo: string,
  email: string,
  jobDescription: string,
  jobExpireDate: string,
  jobFunctionalArea: string,
  maxAge: number,
  maxSalary: number,
  maxYear: number,
  minAge: number,
  minSalary: number,
  minYear: number,
  minimumEducation: any,
  webSite: any,
};
export type StaticPagesRequest ={
 id:any,
 title:any,
 description:any
}
export type AddJobForm = {
  jobType?: any;
  jobFunctionArea?: any;
  jobTitle?: any;
  education?: string;
  jobDetails?: string;
  age?: string;
  experience?: string;
  salary?: string;
  jobLocation?: string;
  jobExpirationDate?: string;
  companyName?: string;
  contactPerson?: string;
  phoneNumber?: number;
  email?: string;
  webSite?: string;
};
