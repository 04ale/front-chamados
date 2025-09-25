import axios from "axios";

const api = axios.create({

  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const storedData = localStorage.getItem("authData");

    if (storedData) {
      const authData = JSON.parse(storedData);
      const token = authData.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;