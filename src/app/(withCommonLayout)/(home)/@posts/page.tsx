import PostCard from "@/src/components/Feed/PostCard";
import { getCurrentUser } from "@/src/service/auth";
import { getPosts } from "@/src/service/post";
import { TPost } from "@/src/types";

const Posts = async () => {

    const user = await getCurrentUser()
    const {data:posts} = await getPosts([])
  


  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  items-center min-h-screen bg-gray-100 dark:bg-gray-900 ">
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