"use client";
import { IoLogoGoogle } from "react-icons/io";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { EyeClosed, EyeIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { signIn, signOut } from "next-auth/react";
import { Logo } from "@/src/Assets/logo";
import { useUserLogin, useUserRegistration } from "@/src/hooks/auth.hook";
import { useSearchParams, useRouter } from "next/navigation";

const SignInSignUp = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const router = useRouter();

  const {
    mutate: loginMutation,
    isPending: pendingLogin,
    isSuccess: isLoginSuccess,
    error: loginError, // Error from login mutation
  } = useUserLogin();



  const {
    mutate: registerMutation,
    isPending: pendingRegister,
    isSuccess: isRegisterSuccess,
    error: registerError, // Error from registration mutation
  } = useUserRegistration();


 

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
    getValues,
    formState: { errors },
  } = useForm();

  // Sign-in and sign-up form submit handlers
  const onSubmitSignIn = (data: any) => {
   
    loginMutation(data);
  };

  const onSubmitSignUp = (data: any) => {
   
    registerMutation(data);
  };

  // Handle redirection after successful login or registration
  if (isLoginSuccess || isRegisterSuccess) {
    if (redirect) {
      router.push(redirect);
    } else {
      router.push("/");
    }
  }

  return (
    <section className="">
      <div className="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center">
            <Logo />
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
            {/* Full Name Input (For Sign Up) */}
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email",
                },
              })}
              fullWidth
              label="Email"
              type="email"
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

            {/* Confirm Password (For Sign Up) */}
            {!isSignIn && (
              <div className="mt-4">
                <Input
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
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

            {/* Error Message (From Login or Registration) */}
            {loginError && isSignIn && (
              <div className="text-right text-sm text-red-500">
                {loginError.message}
              </div>
            )}
            {registerError && !isSignIn && (
              <div className="text-right text-sm text-red-500">
                {registerError.message}
              </div>
            )}

            {/* Submit Button */}
            <Button
              disabled={pendingLogin || pendingRegister}
              type="submit"
              fullWidth
              color="primary"
              className="mt-6"
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          {/* Forgot Password Link (For Sign In Only) */}
          {isSignIn && (
            <div className="mt-4 text-center">
              <a
                href="/forgot-password" // Link to the Forgot Password page
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Forgot your password?
              </a>
            </div>
          )}

          {/* Social Media Login Options (For Sign In Only) */}
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
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                  Sign in with Google
                </Button>

                {/* Github Login */}
                <Button
                  isIconOnly={true}
                  color="default"
                  onClick={() => signIn("github", { callbackUrl: "/" })}
                >
                  <FaGithub size={20} />
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
