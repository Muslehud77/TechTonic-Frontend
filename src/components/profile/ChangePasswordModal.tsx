"use client";

import { useDisclosure } from "@nextui-org/modal";
import TechTonicModal from "../modal";

import { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useUpdatePassword } from "@/src/hooks/auth.hook";
import { useRouter } from "next/navigation";

const UpdatePassword = () => {

  const router = useRouter()
  

  const {mutate:updatePasswordMutation, isPending,isSuccess} = useUpdatePassword()

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isVisible, setIsVisible] = useState({
    oldPassword: false,
    newPassword: false,
  });

  const {
    handleSubmit,
    control,
    register,
    reset
    ,
    formState: { errors },
  } = useForm();

  const toggleVisibility = (field: "oldPassword" | "newPassword") => {
    setIsVisible((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

 
  const onSubmit = (data: any) => {
    updatePasswordMutation(data)
    onClose()
    reset()
  };

  useEffect(()=>{
    if(isSuccess){
      router.push("/login")
    }
  },[isSuccess])

 

  return (
    <TechTonicModal modalSize="md" buttonText="Update Password"  isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <div className="w-full max-w-2xl p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Update Password
        </h2>

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

export default UpdatePassword;
