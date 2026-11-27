import axiosInstance from "../../helpers/axiosInstance";

export const loginAPI = async (data) => {
  const res = await axiosInstance.post("/login", data);
  return res.data;
};

export const logoutAPI = async (data) => {
  const res = await axiosInstance.post("/logout", data);
  return res.data;
};

export const registerAPI = async (data) => {
  const res = await axiosInstance.post("/register", data);
  return res.data;
};