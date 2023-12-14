/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axiosInstance from "../services/api";
import {
  getLocalAccessToken,
  getLocalRefreshToken,
  updateLocalAccessToken,
} from "../services/token";

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = getLocalAccessToken();
  console.log("onRequest token : " , token)
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error);

const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onResponseError = async (error: AxiosError) => {
  let retry = false;

  const originalConfig: AxiosRequestConfig = error.config!!;
  if (originalConfig.url !== "/auth/login" && error.response) {
    if (error?.response?.status === 401 && !retry) {
      retry = true;
      try {
        const rs = await axiosInstance.post("/auth/getToken", {
          refreshToken: getLocalRefreshToken(),
        });

        const { data } = rs.data;

        // store.dispatch(refreshToken(data.accessToken, data.refreshToken));
        updateLocalAccessToken(data.accessToken, data.refreshToken);

        return axiosInstance(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
  }
  return Promise.reject(error);
};

export const setupInterceptorsTo = (axiosObj: AxiosInstance): AxiosInstance => {
  axiosObj.interceptors.request.use(onRequest, onRequestError);
  axiosObj.interceptors.response.use(onResponse, onResponseError);
  return axiosObj;
};
