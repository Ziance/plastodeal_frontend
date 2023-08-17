import axiosInstance, { isAxiosError } from "../../../services/api";

export const fetchMastersDataAsync = async (category: string) => {
  try {
    const response = await axiosInstance.get<any[]>(`/masters/${category}`);
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};

export const postEditStatusAsync = async (request: any) => {
  try {
    const { params, row } = request;
    const response = await axiosInstance.put(
      `/masters/${params.dynamicPath}/status/${row._id}`,
      {
        status: !row.status,
      }
    );
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};

export const postDeleteMasterAsync = async (request: any) => {
  try {
    const { params, row } = request;
    const response = await axiosInstance.delete(
      `/masters/${params.dynamicPath}/${row._id}`
    );
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};

export const postAddMasterAsync = async (request: any) => {
  try {
    let postData = {};
    const { params, textFieldValue } = request;

    if (params.dynamicPath === "country") {
      postData = {
        countryName: textFieldValue,
      };
    }

    if (params.dynamicPath === "state") {
      postData = {
        stateName: textFieldValue,
      };
    }
    if (params.dynamicPath === "faq") {
      postData = {
        stateName: textFieldValue,
      };
    }

    if (params.dynamicPath === "city") {
      postData = {
        cityName: textFieldValue,
      };
    }

    if (params.dynamicPath === "company-type") {
      postData = {
        companyType: textFieldValue,
      };
    }

    const response = await axiosInstance.post(
      `/masters/${params.dynamicPath}`,
      postData
    );
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};
