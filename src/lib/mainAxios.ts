import axios from "axios";

const mainApiClient = axios.create({
  baseURL: import.meta.env.VITE_MAIN_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// add a request interceptor to attach the token
mainApiClient.interceptors.request.use(
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

// add a response interceptor to handle errors
mainApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.clear();
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
          break;
        case 403:
          window.location.href = "/";
          console.error("Access denied");
          break;
        case 404:
          console.error("Page not found");
          break;
        case 500:
          console.error("Internal server error");
          break;
        default:
          console.error(error.response.data);
      }
    } else if (error.resquest) {
      console.error(error.request, "Network error");
    } else {
      console.error(error.message);
    }
    return Promise.reject(error);
  }
);

export default mainApiClient;
