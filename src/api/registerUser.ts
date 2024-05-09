

import axios from "axios";
const userApi = import.meta.env.VITE_USER_API;
export const registerUser = async (data: FormData) => {
    try {
        const response = await axios.post(`${userApi}/register`, data,{
            headers:{
                'Content-Type':'multipart/form-data'
                }
            });
            console.log(response)
    } catch (error) {
        console.log(error)
    }
 
};
