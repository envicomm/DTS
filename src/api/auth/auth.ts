import { TLogin } from "@/schema/data-schema";
import axios from "axios";

const userApi = import.meta.env.VITE_USER_API;
axios.defaults.withCredentials = true;
export const loginUser = async (data: TLogin) => {
  try {
    const response = await axios.post(`${userApi}/login`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Something went wrong while logging in !");
  }
};