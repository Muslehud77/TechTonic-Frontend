"use client";
import { IoLogoGoogle } from "react-icons/io";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { EyeClosed, EyeIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import {signIn, signOut} from "next-auth/react";

const SignInSignUp = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isVisible, setIsVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const toggleVisibility = (field: "password" | "confirmPassword") => {
    setIsVisible((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Initialize react-hook-form
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // Sign-in and sign-up form submit handlers
  const onSubmitSignIn = (data: any) => {
    console.log("Sign-In Data:", data);
  };

  const onSubmitSignUp = (data: any) => {
    console.log("Sign-Up Data:", data);
  };

  return (
    <section className="">
      <div className="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt="Logo"
              width={40}
              height={40}
            />
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-center mt-6">
            <button
              type="button"
              onClick={() => {
                setIsSignIn(true);
                reset();
              }}
              className={`w-1/3 pb-4 font-medium text-center capitalize border-b ${
                isSignIn
                  ? "text-gray-800 border-blue-500 dark:border-blue-400 dark:text-white"
                  : "text-gray-500 border-gray-300 dark:border-gray-400 dark:text-gray-300"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignIn(false);
                reset();
              }}
              className={`w-1/3 pb-4 font-medium text-center capitalize border-b ${
                !isSignIn
                  ? "text-gray-800 border-blue-500 dark:border-blue-400 dark:text-white"
                  : "text-gray-500 border-gray-300 dark:border-gray-400 dark:text-gray-300"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="w-full max-w-md mt-8 h-96">
          <form
            onSubmit={handleSubmit(isSignIn ? onSubmitSignIn : onSubmitSignUp)}
          >
            {!isSignIn && (
              <Input
                {...register("name", { required: "Full name is required" })}
                label="Full Name"
                placeholder="Enter your full name"
                isInvalid={!!errors.name}
                errorMessage={errors?.name?.message as string}
              />
            )}
            {/* Email Input */}
            <Input
              {...register("email", { required: "Email is required" })}
              fullWidth
              label="Email"
              placeholder="Enter your email"
              aria-label="Email"
              isInvalid={!!errors.email}
              errorMessage={errors?.email?.message as string}
              className="mt-4"
            />

            {/* Password Input */}
            <Input
              {...register("password", { required: "Password is required" })}
              fullWidth
              label="Password"
              placeholder="Enter your password"
              aria-label="Password"
              errorMessage={errors?.password?.message as string}
              type={isVisible.password ? "text" : "password"}
              endContent={
                <button
                  type="button"
                  onClick={() => toggleVisibility("password")}
                  aria-label="Toggle password visibility"
                >
                  {isVisible.password ? <EyeIcon /> : <EyeClosed />}
                </button>
              }
              isInvalid={!!errors.password}
              className="mt-4"
            />

            {/* Confirm Password (for Sign Up) */}
            {!isSignIn && (
              <div className="mt-4">
                <Input
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                  fullWidth
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  aria-label="Confirm Password"
                  type={isVisible.confirmPassword ? "text" : "password"}
                  errorMessage={errors?.confirmPassword?.message as string}
                  endContent={
                    <button
                      type="button"
                      onClick={() => toggleVisibility("confirmPassword")}
                      aria-label="Toggle confirm password visibility"
                    >
                      {isVisible.confirmPassword ? <EyeIcon /> : <EyeClosed />}
                    </button>
                  }
                  isInvalid={!!errors.confirmPassword}
                />
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" fullWidth color="primary" className="mt-6">
              {isSignIn ? "Sign In" : "Sign Up"}
            </Button>
          </form>
          {isSignIn && (
            <div className="mt-6 flex flex-col items-center">
              <span className="text-sm text-gray-500 uppercase dark:text-gray-400">
                or login with social media
              </span>
              <div className="flex mt-4 space-x-4 w-full">
                {/* Google Login */}
                <Button
                  className="w-full"
                  variant="ghost"
                  startContent={<IoLogoGoogle size={20} />}
                  onClick={() => signIn("google",{callbackUrl:"/"})}
                >
                  Sign in with Google
                </Button>

                {/* Twitter Login */}
                <Button
                  isIconOnly={true}
                  color="default"
                  onClick={() => signIn("github",{callbackUrl:"/"})}
                >
                  <FaGithub size={20} />
                </Button>
                <Button
                  isIconOnly={true}
                  color="default"
                  onClick={() => signOut()}
                >
                  L
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignInSignUp;
