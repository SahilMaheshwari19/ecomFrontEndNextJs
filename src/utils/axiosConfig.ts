import axios from "axios";

const tokenApi = axios.create({
    baseURL: "http://localhost:8080",
});

tokenApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default tokenApi;
