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
        // name:formData.get("name"),
        // contactNo:formData.get("contactNo"),
        // email:formData.get("email"),
        // subject:formData.get("subject"),
        // message:formData.get("message")

        // ---------------------
        email:"eve.holt@reqres.in",
        password:"cityslicka"
      }, {
      // headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    console.log("api response ",response);
    
    return response.data
  } catch (err) {
    return isAxiosError(err)
  }
}

export const addProductAsync = async (request: any) => {
  try {
    const formData = new FormData()
    // formData.append("ConnectionName", request.connectionName || "")
    formData.append("name", request.machineType || "")
    formData.append("description", request || "")
    formData.append("file", request.file || "")
    console.log("request id", request.categoryId);
    
    // const response = await axiosInstance.post<string>(`/auth/login`, formData, {
      const response = await axiosInstance.post<string>(`/product/${request?.categoryId}`, formData, {
        headers: {
          "Content-Type": "muiltipart/formdata",
          Accept: "application/json",
        },
    })
    console.log("api response ",response);
    
    return response.data
  } catch (err) {
    return isAxiosError(err)
  }
}
export const editProductAsync = async (request: any) => {
  try {
    const formData = new FormData()
    // formData.append("ConnectionName", request.connectionName || "")
    formData.append("name", request.machineType || "")
    formData.append("description", request || "")
    formData.append("file", request.file || "")
    console.log("request id", request.categoryId);
    
    // const response = await axiosInstance.post<string>(`/auth/login`, formData, {
      const response = await axiosInstance.put<string>(`/product/${request?.productId}`, formData, {
        headers: {
          "Content-Type": "muiltipart/formdata",
          Accept: "application/json",
        },
    })
    console.log("api response ",response);
    
    return response.data
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
    console.log("request id", request.productId);
    
    // const response = await axiosInstance.post<string>(`/auth/login`, formData, {
      const response = await axiosInstance.post<string>(`/product/view/`, 
      {
        name:request.name,
        email:request.email,
        phoneNumber: request.phone,
        productId: request.productId
      }
    //   , {
    //     headers: {
    //       "Content-Type": "muiltipart/formdata",
    //       Accept: "application/json",
    //     },
    // }
    )
    console.log("api response ",response);
    
    return response
  } catch (err) {
    return isAxiosError(err)
  }
}
export const viewProductWhenLoginAsync = async (request: any) => {
  try {
   
    
    // const response = await axiosInstance.post<string>(`/auth/login`, formData, {
      const response = await axiosInstance.put<string>(`/product/view/`, 
      {
      productId: request 
      }
    //   , {
    //     headers: {
    //       "Content-Type": "muiltipart/formdata",
    //       Accept: "application/json",
    //     },
    // }
    )
    console.log("api response ",response);
    
    return response
  } catch (err) {
    return isAxiosError(err)
  }
}
export const fetchGetApprovalByCatagoryIdAsync = async (request:any) => {
  
  try {
    const response = await axiosInstance.get(`/product/${request}`);
    return response.data ;
  } catch (err) {
    return isAxiosError(err);
  }
};
export const EditApprovalStatusAsync = async (request: any) => {
  try {
    const { params, row } = request;
    console.log("request approval",row);
    
    const response = await axiosInstance.put(
      `/product/change-status/${row._id}`,{
        status : !row?.status
      }
    );
    return response.data as any[];
  } catch (err) {
    return isAxiosError(err);
  }
};
export const deleteApprovalAsync = async (id: string) => {
  try {
    console.log("id=====>",id);
    
    const response = await axiosInstance.delete(`/product/${id}`);
    return response.data as any[];
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

export const createAccountAsync = async (request: SignUpRequest) => {
  // const newRequest = {
  //   email:"eve.holt@reqres.in",
  //   password:"pistol"
  // }
  try {
    const response = await axiosInstance.post<string>(`/api/register`, {
      // responseType: "text",
      email:"eve.holt@reqres.in",
      password:"pistol"
    })
    return response.data
  } catch (err) {
    return isAxiosError(err)
  }
}

export const checkOtpAsync = async (request: any) => {
  try {
    
    
    // const response = await axiosInstance.post<string>(`/auth/login`, formData, {
    //   const response = await axiosInstance.post<string>(`/product/${request?.categoryId}`, formData, {
    //     headers: {
    //       "Content-Type": "muiltipart/formdata",
    //       Accept: "application/json",
    //     },
    // })
    // const checkData =()=>{
     
    //   return response
    // }
    // const response = await  checkData()
  
    
    let response :any = {}
    if (request.otp==="881624") {
     response={message:"success", user:request?.user}
    } else {
      response={message:"rejected", user:null}
    };
    
    // eslint-disable-next-line no-unreachable
    return response
  } catch (err) {
    return isAxiosError(err)
  }
}