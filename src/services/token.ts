import { UserInfo } from "../redux/auth/types";

// This function use to get the local refresh token.
export const getLocalRefreshToken = (): string | null => {
  const userData: string | null = localStorage.getItem("user");
  if (userData === null) return null;
  const user = JSON.parse(userData);
  return user?.refreshToken;
};

export const getLocalAccessToken = (): string | null => {
  const userData: string | null = localStorage.getItem("user");
  console.log("getLocalRefreshToken : ", userData)
  if (userData === null) return null;
  const user: UserInfo = JSON.parse(userData);
  console.log("getLocalRefreshToken user : ", user)
  return user?.accessToken;
};

export const updateLocalAccessToken = (
  accessToken: string,
  refreshToken: string
) => {
  const userData: string | null = localStorage.getItem("user");
  if (userData === null) return null;
  const user: UserInfo = JSON.parse(userData);
  if (user) {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, accessToken, refreshToken })
    );
  }
  return null;
};

export const getUser = (): UserInfo | null => {
  const userData: string | null = localStorage.getItem("user");
  if (userData === null) return null;
  const user: UserInfo = JSON.parse(userData);
  return user;
};

export const updateUser = (user: any): any => {
  const userData: string | null = localStorage.getItem("user");
  console.log("user data", userData);
  if (userData === null) return null;
  const existUser: UserInfo = JSON.parse(userData);
  if (existUser) {
    const test = { ...existUser, user: user }
    localStorage.setItem("user", JSON.stringify(test));
  }
};

export const setUser = (user: UserInfo) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem("user");
};
