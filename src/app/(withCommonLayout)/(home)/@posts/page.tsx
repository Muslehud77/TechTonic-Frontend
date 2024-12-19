"use client"
import PostCard from "@/src/components/Feed/PostCard";
import { useCurrentUser } from "@/src/hooks/auth.hook";
import { useGetPosts } from "@/src/hooks/post.hooks";
import { getCurrentUser } from "@/src/service/auth";
import { getPosts } from "@/src/service/post";
import { TPost } from "@/src/types";

const Posts =  () => {

    const {data:user} = useCurrentUser()
    const {data} = useGetPosts({queryParams:[]})

   const posts = data?.data


  return (
    <main className="flex flex-wrap gap-3 justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {posts?.map((post:TPost) => (
        <PostCard
          key={post._id}
          post={post}
          currentUserId={user?._id!}
        //   onUpvote={handleUpvote}
        //   onDownvote={handleDownvote}
        //   onComment={handleComment}
        //   onShare={handleShare}
        />
      ))}
     
    </main>
  );
};

export default Posts;