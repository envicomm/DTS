import axios from "axios";

const userApi = import.meta.env.VITE_USER_API;
export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${userApi}/`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Something went wrong while fetching user !");
  }
};
