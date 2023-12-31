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
        status: !row?.status,
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

export const postEditMasterAsync = async (request: any) => {
  try {
    const { params, postData, _id } = request;
    const response = await axiosInstance.put(
      `/masters/${params.dynamicPath}/${_id}`,
      postData
    );
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};

export const postAddMasterAsync = async (request: any) => {

  try {
    const { params, postData } = request;

    const formData = new FormData()
    formData.append("file", postData || "")

    
    const response = await axiosInstance.post(
      `/masters/${params.dynamicPath}`,
      params.dynamicPath === "banner" ? formData : postData
      ,
      {
        headers: {
          "Content-Type":params.dynamicPath==="banner" ? "muiltipart/formdata": "application/json",
           Accept: "application/json",
        }
      });

    return response?.data;
  } catch (err) {
    return isAxiosError(err);
  }
};
