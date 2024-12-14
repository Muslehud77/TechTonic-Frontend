"use server";

import axiosInstance from "@/src/config/AxiosInstance/axios.config";
import { TQueryParams } from "@/src/types";


export const getPosts = async (args:TQueryParams) => {
  try {

    const params = new URLSearchParams();

    if (args?.length) {
      args.map((arg) =>
        params.append(arg.name.toString(), arg.value.toString())
      );
    }

    const { data } = await axiosInstance.get("/post",{params});
       
    return data;
  } catch (e: any) {
    console.log(e.response.data);
    throw new Error(e.response.data.message);
  }
};
