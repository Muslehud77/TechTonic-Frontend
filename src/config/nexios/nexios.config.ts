import { envConfig } from "@/src/config/envConfig";
import { getNewAccessToken } from "@/src/service/auth";

import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: envConfig.BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function (config) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (accessToken) {
      config.headers.authorization = accessToken;
    }

    return config;
  },
  async function (error) {
    const config = error.config;
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const res = await getNewAccessToken();

      const accessToken = res.data.accessToken;

      config.headers.authorization = accessToken;

      const cookieStore = await cookies();
      cookieStore.set("accessToken", accessToken);

      return axiosInstance(config);
    } else {
      return Promise.reject(error);
    }
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
