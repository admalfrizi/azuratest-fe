import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError<{ message?: string }>) => {
        const message =
        error.response?.data?.message ?? error.message ?? "Something went wrong";
        return Promise.reject(new Error(message));
    }
);

export default axiosInstance;