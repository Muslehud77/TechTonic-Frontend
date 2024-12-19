import { useMutation, useQuery } from "@tanstack/react-query";


import { getPosts } from "../service/post";
import { TQueryParams } from "../types";

export const useGetPosts = ({ queryParams } : {queryParams:TQueryParams}) => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getPosts(queryParams),
  });
};
