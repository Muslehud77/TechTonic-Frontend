"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { Logo } from "@/src/Assets/logo";
import Link from "next/link";
import { EyeClosed, EyeIcon } from "lucide-react";
import {  useSearchParams } from "next/navigation";
import { useResetPassword } from "@/src/hooks/auth.hook";
import { useState } from "react";
import { useRouter } from "next/navigation";


const ResetPassword = () => {

    const [passwordVisible,setPasswordVisible] = useState(false)

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const {mutate: resetPasswordMutation,isSuccess} = useResetPassword()

    const router = useRouter()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // Forgot password submit handler
  const onSubmitForgotPassword = (data: any) => {
    if(token){
        resetPasswordMutation({password:data.password,token})
    }
  };

  if(isSuccess){
    router.push("/login")
  }

  return (
    <section className="">
      <div className="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center">
            <Logo />
          </div>

          {/* Forgot Password Header */}
          <h2 className="mt-6 text-xl font-semibold text-center text-gray-800 dark:text-white">
            Reset your password
          </h2>
        </div>

        {/* Form */}
        <div className="w-full max-w-md mt-8 h-96">
          <form onSubmit={handleSubmit(onSubmitForgotPassword)}>
            {/* Email Input */}
            <Input
              {...register("password", { required: "New password is required" })}
              fullWidth
              label="New Password"
              placeholder="Enter your new password"
              aria-label="Password"
              errorMessage={errors?.password?.message as string}
              type={passwordVisible ? "text" : "password"}
              endContent={
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  aria-label="Toggle password visibility"
                >
                  {passwordVisible ? <EyeIcon /> : <EyeClosed />}
                </button>
              }
              isInvalid={!!errors.password}
              className="mt-4"
            />

            {/* Submit Button */}
            <Button
              disabled={!token}
              type="submit"
              fullWidth
              color="primary"
              className="mt-6"
            >
              Reset Password
            </Button>
          </form>

          {/* Additional Options */}
          <div className="mt-6 flex flex-col items-center">
            <span className="text-sm text-gray-500 uppercase dark:text-gray-400">
              Back to{" "}
              <Link href="/login" className="text-blue-500 hover:text-blue-600">
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
