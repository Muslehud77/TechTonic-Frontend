"use server";

import axiosInstance from "@/src/config/AxiosInstance/axios.config";
import { cookies } from "next/headers";


export const updateProfile = async (userData: FormData) => {
  try {
    const { data } = await axiosInstance.patch("/profile", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (e: any) {
    console.log(e.response.data);
    throw new Error(e.response.data.message);
  }
};



