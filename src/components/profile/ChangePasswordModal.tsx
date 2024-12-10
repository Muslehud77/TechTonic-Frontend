"use client";

import { useDisclosure } from "@nextui-org/modal";
import TechTonicModal from "../modal";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useForm } from "react-hook-form";

const EditProfileModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isVisible, setIsVisible] = useState({
    oldPassword: false,
    newPassword: false,
  });

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();

  const toggleVisibility = (field: "oldPassword" | "newPassword") => {
    setIsVisible((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: any) => {
    console.log(data); // Process the form data here
  };

  return (
    <TechTonicModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <div className="w-full max-w-2xl p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Edit Profile
        </h2>

        {/* Profile Picture Preview */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={profilePreview || "https://via.placeholder.com/150"}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full object-cover"
            />
            <input
              type="file"
              {...register("profilePicture")}
              accept="image/*"
              onChange={handleImageChange}
              className="absolute bottom-0 right-0 opacity-0 cursor-pointer w-8 h-8"
            />
          </div>
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
        />

        {/* Phone Number Input */}
        <Input
          {...register("phone", { required: "Phone number is required" })}
          label="Phone Number"
          placeholder="Enter your phone number"
          fullWidth
          aria-label="Phone Number"
          isInvalid={!!errors.phone}
          errorMessage={errors?.phone?.message as string}
          className="mb-4"
        />

        {/* Old Password Input */}
        <Input
          {...register("oldPassword", {
            required: "Old password is required",
          })}
          label="Old Password"
          type={isVisible.oldPassword ? "text" : "password"}
          fullWidth
          aria-label="Old Password"
          isInvalid={!!errors.oldPassword}
          errorMessage={errors?.oldPassword?.message as string}
          className="mb-4"
          endContent={
            <button
              type="button"
              onClick={() => toggleVisibility("oldPassword")}
              aria-label="Toggle old password visibility"
            >
              {isVisible.oldPassword ? <EyeIcon /> : <EyeClosed />}
            </button>
          }
        />

        {/* New Password Input */}
        <Input
          {...register("newPassword", {
            required: "New password is required",
          })}
          label="New Password"
          type={isVisible.newPassword ? "text" : "password"}
          fullWidth
          aria-label="New Password"
          isInvalid={!!errors.newPassword}
          errorMessage={errors?.newPassword?.message as string}
          className="mb-4"
          endContent={
            <button
              type="button"
              onClick={() => toggleVisibility("newPassword")}
              aria-label="Toggle new password visibility"
            >
              {isVisible.newPassword ? <EyeIcon /> : <EyeClosed />}
            </button>
          }
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
