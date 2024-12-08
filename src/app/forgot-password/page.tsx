"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { Logo } from "@/src/Assets/logo";
import Link from "next/link";
import { useForgotPassword } from "@/src/hooks/auth.hook";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  // Initialize react-hook-form

  const router = useRouter()

  const {mutate:forgotPasswordMutation,isSuccess} = useForgotPassword()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // Forgot password submit handler
  const onSubmitForgotPassword = async (data: any) => {
    console.log("Forgot Password Data:", data);
   forgotPasswordMutation(data.email)
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
          <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
            Enter your email to receive a link to reset your password
          </p>
        </div>

        {/* Form */}
        <div className="w-full max-w-md mt-8 h-96">
          <form onSubmit={handleSubmit(onSubmitForgotPassword)}>
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

            {/* Submit Button */}
            <Button type="submit" fullWidth color="primary" className="mt-6">
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

export default ForgotPassword;
