// components/PostCard.tsx

import React from "react";

import { TPost } from "@/src/types";
import { Image } from "@nextui-org/image";


interface PostCardProps {
  post: TPost;
  currentUserId: string;
}

const PostCard = ({ post, currentUserId }: PostCardProps) => {
  // Determine if the current user has upvoted or downvoted
    const hasUpvoted = post.upvotes.includes(currentUserId);
    const hasDownvoted = post.downvotes.includes(currentUserId);

  //   // Handlers
  //   const handleUpvote = () => {
  //     onUpvote(post.title); // Assuming post.title is unique, replace with post ID if available
  //   };

  //   const handleDownvote = () => {
  //     onDownvote(post.title); // Same as above
  //   };

  //   const handleComment = () => {
  //     onComment(post.title);
  //   };

  //   const handleShare = () => {
  //     onShare(post.title);
  //   };

  // Format the creation date
  const formattedDate = new Date(post?.createdAt).toLocaleDateString();

  return (
    <div className="w-full max-w-md px-6 py-6 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      {/* Author Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            className="object-cover w-12 h-12 border-2 border-blue-500 rounded-full dark:border-blue-400"
            alt={`${post.author.name} avatar`}
            src={post.author.profilePhoto || "/default-avatar.png"}
            width={48}
            height={48}
            // objectFit="cover"
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {post.author.name}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {/* {author.role.replace("_", " ")} */}
            </span>
          </div>
        </div>
        <span className="text-sm text-gray-400 dark:text-gray-500">
          {formattedDate}
        </span>
      </div>

      {/* Post Title */}
      <h3 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
        {post.title}
      </h3>

      {/* Post Image */}
      {post.images.length > 0 && (
        <div className="mt-4">
          <Image
            className="w-full h-64 object-cover rounded-lg"
            alt={post.images[0].caption || "Post image"}
            src={post.images[0].url}
            width={800}
            height={400}
            objectFit="cover"
          />
          {post.images[0].caption && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {post.images[0].caption}
            </p>
          )}
        </div>
      )}

      {/* Post Content */}
      <p className="mt-4 text-gray-700 dark:text-gray-300">{post.content}</p>

      {/* Interaction Buttons */}
      <div className="flex items-center justify-between mt-6">
        {/* Upvote & Downvote */}
        <div className="flex items-center space-x-4">
          <button
            // onClick={handleUpvote}
            className={`flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${
              hasUpvoted ? "font-bold" : ""
            }`}
            aria-label="Upvote"
          >
            {/* Upvote Icon */}
            <svg
              className="w-5 h-5 mr-1"
              fill={hasUpvoted ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              ></path>
            </svg>
            <span>{post.upvotes.length}</span>
          </button>
          <button
            // onClick={handleDownvote}
            className={`flex items-center text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 ${
              hasDownvoted ? "font-bold" : ""
            }`}
            aria-label="Downvote"
          >
            {/* Downvote Icon */}
            <svg
              className="w-5 h-5 mr-1"
              fill={hasDownvoted ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
            <span>{post.downvotes.length}</span>
          </button>
        </div>

        {/* Comment & Share */}
        <div className="flex items-center space-x-4">
          <button
            // onClick={handleComment}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400"
            aria-label="Comment"
          >
            {/* Comment Icon */}
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 
                9.863 0 01-4.255-.949L3 20l1.651-3.301C3.865 15.479 3 13.245 
                3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <span>Comment</span>
          </button>
          <button
            // onClick={handleShare}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400"
            aria-label="Share"
          >
            {/* Share Icon */}
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 
                2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 
                10-4 0v.083A6 6 0 004 11v3.159c0 
                .538-.214 1.055-.595 1.436L2 
                17h5m7 0v1a3 3 0 11-6 0v-1m6 
                0H9"
              ></path>
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
