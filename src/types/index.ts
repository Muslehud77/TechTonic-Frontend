import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TUser = {
  _id?: string;
  name: string;
  role: "admin" | "user";
  email: string;
  password?: string;
  status: "ACTIVE" | "BLOCKED";
  passwordChangedAt?: Date;
  mobileNumber?: string;
  profilePhoto?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isPremium?: boolean;
  expireAt?: Date | null;
  followers?: string[];
  following?: string[];
};

type Image = {
  url: string; // URL of the image
  caption: string; // Optional caption for the image
};

export type TPost = {
  _id:string;
  title: string;
  content: string;
  category:
    | "Web"
    | "Software Engineering"
    | "AI"
    | "Mobile"
    | "Networking"
    | "Other";
  tags: string[]; 
  images: Image[]; // Array of images with optional captions
  isPremium: boolean; // Whether the post is premium or not
  author: TUser; // Author ID (user who created the post)
  upvotes: string[]; // List of user IDs who upvoted the post
  downvotes: string[]; // List of user IDs who downvoted the post
  createdAt: string; // Timestamp of post creation
  updatedAt: string; // Timestamp of last update
  // Optional additional fields
  visibility?: "public" | "private" | "followers"; // Privacy setting for the post
};

export type TQueryParams = { name: string; value: string | boolean | number }[];