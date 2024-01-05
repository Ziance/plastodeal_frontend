/* eslint-disable import/prefer-default-export */
import axiosInstance, { isAxiosError } from "../../../services/api"
import { ChangePasswordRequest, PostRequirementRequest, ResetPasswordRequest, SignUpRequest } from "./types"

export const addPostReqAsync = async (request: PostRequirementRequest) => {
  try {
    const formData = new FormData()
    // formData.append("ConnectionName", request.connectionName || "")
    formData.append("name", request.name || "")
    formData.append("password", request.contactNo || "")
    formData.append("email", request.email || "")
    formData.append("subject", request.subject || "")
    formData.append("message", request.message || "")

    // const response = await axiosInstance.post<string>(`/auth/login`, formData, {
    const response = await axiosInstance.post<string>(`/api/login`,
      {
        // ---------------------
        email: "eve.holt@reqres.in",
        password: "cityslicka"
      }, {
      // headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    return response
  } catch (err) {
    return isAxiosError(err)
  }
}

export const addProductAsync = async (request: any) => {
  try {

    const formData = new FormData()
    // formData.append("ConnectionName", request.connectionName || "")
    formData.append("name", request.name || "")
    formData.append("description", request.description || "")
    formData.append("file", request.file || "")

    // const response = await axiosInstance.post<string>(`/auth/login`, formData, {
    const response = await axiosInstance.post<string>(`/product/${request?.categoryId}`, formData, {
      headers: {
        "Content-Type": "muiltipart/formdata",
        Accept: "application/json",
      },
    })

    return response
  } catch (err) {
    return isAxiosError(err)
  }
}
export const editProductAsync = async (request: any) => {
  try {
    const formData = new FormData()
    // formData.append("ConnectionName", request.connectionName || "")
    formData.append("name", request.name || "")
    formData.append("description", request.description || "")
    formData.append("file", request.file || "")

    // const response = await axiosInstance.post<string>(`/auth/login`, formData, {
    const response = await axiosInstance.put<string>(`/product/${request?.productId}`, formData, {
      headers: {
        "Content-Type": "muiltipart/formdata",
        Accept: "application/json",
      },
    })

    return response
  } catch (err) {
    return isAxiosError(err)
  }
}

export const viewProductByOtpAsync = async (request: any) => {
  try {
    const formData = new FormData()
    // formData.append("ConnectionName", request.connectionName || "")
    formData.append("name", request.name || "")
    formData.append("email", request.email || "")
    formData.append("phoneNumber", request.phone || "")
    formData.append("productId", request.productId || "")
    const response = await axiosInstance.post<string>(`/product/view`, {
      name: request.name,
      email: request.email,
      phoneNumber: request.phone,
      productId: request.productId
    })
    return response
  } catch (err: any) {
    return err.response
  }
}

export const viewProductWhenLoginAsync = async (request: any) => {
  try {
    const response = await axiosInstance.put<string>(`/product/view/`, {
      productId: request
    })
    return response
  } catch (err) {
    return isAxiosError(err)
  }
}

export const fetchGetApprovalBycategoryIdAsync = async (request: any) => {
  try {
    const response = await axiosInstance.get(`/product/${request.categoryId}?page=${request?.page}&&limit=${request?.rowsPerPage}`);
    return response.data;
  } catch (err) {
    return isAxiosError(err);
  }
};

export const EditApprovalStatusAsync = async (request: any) => {
  try {
    const { row } = request;
    const response = await axiosInstance.put(`/product/change-status/${row._id}`, {
      status: !row?.status
    });
    return response;
  } catch (err) {
    return isAxiosError(err);
  }
};

export const deleteApprovalAsync = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/product/${id}`);
    return response;
  } catch (err) {
    return isAxiosError(err);
  }
};

export const resetPasswordAsync = async (request: ResetPasswordRequest) => {
  try {
    const response = await axiosInstance.post<string>(`/bes/auth/reset-password`, request, {
      responseType: "text",
    })
    return response.data
  } catch (err) {
    return isAxiosError(err)
  }
}

export const changePasswordAsync = async (request: ChangePasswordRequest) => {
  try {
    const response = await axiosInstance.post<string>(`/bes/auth/change-password`, request, {
      responseType: "text",
    })
    return response.data
  } catch (err) {
    return isAxiosError(err)
  }
}

export const checkOtpAsync = async (request: any) => {
  try {
    const response = await axiosInstance.get<string>(`/product/view/${request?.productId}/${request?.otp}`)
    return response
  } catch (err: any) {
    return err.response
  }
}