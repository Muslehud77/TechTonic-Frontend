"use server";

import axiosInstance from "@/src/config/AxiosInstance/axios.config";
import { TQueryParams } from "@/src/types";
import { QueryClient } from "@tanstack/react-query";

export const getPosts = async (args: TQueryParams) => {
  try {
    const params = new URLSearchParams();

    if (args?.length) {
      args.map((arg) =>
        params.append(arg.name.toString(), arg.value.toString())
      );
    }

    const { data } = await axiosInstance.get("/post", { params });

    return data;
  } catch (e: any) {
    console.log(e.response.data);
    throw new Error(e.response.data.message);
  }
};

export const upvoteDownVote = async (payload: {
  postId: string;
  action: string;
}) => {
  try {
    const { data } = await axiosInstance.post("/post/upvote-downvote", payload);

    return data;
  } catch (e: any) {
    throw new Error(e.response.data.message);
  }
};
