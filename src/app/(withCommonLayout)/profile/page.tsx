import TechTonicModal from "@/src/components/modal";
import EditProfileModal from "@/src/components/profile/EditProfileModal";
import { getCurrentUser } from "@/src/service/auth";
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



const ProfilePage = async () => {

const user = await getCurrentUser();


  return (
    <div className="flex flex-col items-center justify-start p-8 ">
      {/* Profile Header */}
      <div className="w-full bg-primary/20 backdrop-blur-md max-w-3xl  rounded-xl overflow-hidden mb-10 p-8">
        {/* Profile Picture and Premium Badge */}
        <div className="relative flex justify-center items-center mb-6">
          <img
            className="w-36 h-36 rounded-full object-cover"
            src={user?.profilePhoto || "https://via.placeholder.com/150"}
            alt={user?.name}
          />
          {user?.isPremium && (
            <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
              Verified
            </span>
          )}
        </div>

        <div className="text-center">
          {/* User Name */}
          <h2 className="text-3xl font-semibold">{user.name}</h2>
          <span className="text-xs capitalize rounded-xl p-2">
            {user?.role}
          </span>

          {/* Email and Phone */}
          <div className="mt-6 flex flex-col justify-center items-center gap-1">
            <span className="text-sm bg-default-100/50 rounded-2xl  p-2">Email: {user?.email}</span>
            <span className="text-sm bg-default-100/50 rounded-2xl p-2">
              Phone: {user?.mobileNumber || "N/A"}
            </span>
          </div>

          {/* Followers and Following */}
          <div className="mt-6">
            <p className="text-lg">
              Followers: {user?.followers?.length || 0} |
              Following: {user?.following?.length || 0}
            </p>
          </div>

          {/* Edit Profile Button */}
          <div className="flex justify-center items-center mt-6">
          <EditProfileModal/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
