"use client";

import { useDisclosure } from "@nextui-org/modal";
import TechTonicModal from "../modal";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { useForm } from "react-hook-form";
import { TUser } from "@/src/types";
import { Image } from "@nextui-org/image";
import { useUpdateProfile } from "@/src/hooks/profile.hooks";

const EditProfileModal = ({ user }: { user: TUser }) => {
  const { mutate: updateProfileMutation, isPending } = useUpdateProfile();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();
    const { profilePhoto, name, mobileNumber } = data;
    formData.append("data", JSON.stringify({ name, mobileNumber }));
    if (profilePhoto[0]) {
      formData.append("profilePhoto", profilePhoto[0]);
    }

    updateProfileMutation(formData);
    onClose();
  };

  return (
    <TechTonicModal isLoading={isPending} color="danger" buttonText="Edit Profile" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <div className="w-full max-w-2xl p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Edit Profile
        </h2>

        {/* Profile Picture Preview */}
        <div className="flex justify-center mb-6">
          <label htmlFor="imageInput" className="relative">
            <Image
              src={
                profilePreview ||
                user.profilePhoto ||
                "https://via.placeholder.com/150"
              }
              alt="Profile Picture"
              className="w-32 h-32 rounded-full object-cover"
            />
          </label>
          <input
            id="imageInput"
            type="file"
            {...register("profilePhoto")}
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            className="absolute bottom-0 right-0 opacity-0 cursor-pointer w-8 h-8"
          />
        </div>

        {/* Name Input */}
        <Input
          {...register("name", { required: "Name is required" })}
          label="Full Name"
          placeholder="Enter your full name"
          fullWidth
          aria-label="Full Name"
          isInvalid={!!errors.name}
          errorMessage={errors?.name?.message as string}
          className="mb-4"
          defaultValue={user?.name}
        />

        {/* Phone Number Input */}
        <Input
          {...register("mobileNumber")}
          label="Phone Number"
          placeholder="Enter your phone number"
          fullWidth
          aria-label="Phone Number"
          isInvalid={!!errors.mobileNumber}
          errorMessage={errors?.mobileNumber?.message as string}
          className="mb-4"
          defaultValue={user?.mobileNumber}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          color="primary"
          className="mt-4"
          onClick={handleSubmit(onSubmit)}
        >
          Save Changes
        </Button>
      </div>
    </TechTonicModal>
  );
};

export default EditProfileModal;
