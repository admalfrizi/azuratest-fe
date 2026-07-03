import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (response) => {
        return { ...response.data, requestUrl: response.baseURL };
    }
);

export default apiClient;