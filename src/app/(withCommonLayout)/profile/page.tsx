import React from "react";

type TUser = {
  _id?: string;
  name: string;
  role: string;
  email: string;
  password?: string;
  status: string;
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

// Dummy user data for demonstration
const user: TUser = {
  name: "Sajeel Khan",
  role: "admin",
  email: "sajeel.khan@email.com",
  status: "active",
  isPremium: true,
  profilePhoto:
    "https://media.istockphoto.com/id/610003972/zh/%E5%90%91%E9%87%8F/vector-businessman-black-silhouette-isolated.jpg?s=1024x1024&w=is&k=20&c=fHByVo4W93dYjuMnLjdkbQ8suH7V_Y3TKB45aU4FShw=", // Replace with actual URL
  followers: ["user1", "user2"],
  following: ["user3", "user4"],
};

const ProfilePage = () => {
  return (
    <div className="flex flex-col items-center justify-start p-8 ">
      {/* Profile Header */}
      <div className="w-full bg-foreground-100 max-w-3xl shadow-lg rounded-xl overflow-hidden mb-10 p-8">
        {/* Profile Picture and Premium Badge */}
        <div className="relative flex justify-center items-center mb-6">
          <img
            className="w-36 h-36 rounded-full object-cover"
            src={user.profilePhoto || "https://via.placeholder.com/150"}
            alt={user.name}
          />
          {user.isPremium && (
            <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
              Verified
            </span>
          )}
        </div>

        <div className="text-center">
          {/* User Name */}
          <h2 className="text-3xl font-semibold">{user.name}</h2>
          <span className="text-xs  bg-secondary capitalize rounded-xl p-2">
            {user.role}
          </span>

          {/* Email and Phone */}
          <div className="mt-6 flex flex-col justify-center items-center gap-1">
            <span className="text-lg bg-primary-700 rounded-2xl text-background  p-1">Email: {user.email}</span>
            <span className="text-lg bg-primary-700 rounded-2xl text-background p-1">
              Phone: {user?.mobileNumber || "N/A"}
            </span>
          </div>

          {/* Followers and Following */}
          <div className="mt-6">
            <p className="text-lg">
              Followers: {user.followers ? user.followers.length : 0} |
              Following: {user.following ? user.following.length : 0}
            </p>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-8">
            <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
