import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    withCredentials: false,
});

export default axiosInstance;
