import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

import { toast } from "sonner";
import { forgotPassword, loginUser, registerUser, resetPassword } from "../service/auth";

export const useUserRegistration = () => {
  const toastId = 1;

  return useMutation({
    mutationFn: async (user: FieldValues) => await registerUser(user),
    onSuccess: () => {
      toast.success("User Registered Successfully", { id: toastId });
    },

    onError: (error) => {
      toast.error(error.message, { id: toastId });
    },
    onMutate: () => {
      toast.loading("Registering user...", { id: toastId });
    },
  });
};

export const useUserLogin = () => {
  const toastId = 1;

  return useMutation({
    mutationFn: async (user: FieldValues) => await loginUser(user),
    onSuccess: () => {
      toast.success("User Logged in Successfully", { id: toastId });
    },

    onError: (error) => {
      toast.error(error.message, { id: toastId });
    },
    onMutate: () => {
      toast.loading("Logging in...", { id: toastId });
    },
  });
};

export const useForgotPassword = () => {
  const toastId = 1;

  return useMutation({
    mutationFn: async (email: string) => await forgotPassword(email),
    onSuccess: () => {
      toast.success("Please check your email!", { id: toastId });
    },

    onError: (error: any) => {
    
      toast.error(error.message, { id: toastId });
    },
    onMutate: () => {
      toast.loading("Verifying the email...", { id: toastId });
    },
  });
};

export const useResetPassword = () => {
  const toastId = 1;

  return useMutation({
    mutationFn: async (payload: { password: string; token: string }) =>
      await resetPassword(payload.password,payload.token),
    onSuccess: () => {
      toast.success("Password has been updated!", { id: toastId });
    },

    onError: (error: any) => {
      toast.error(error.message, { id: toastId });
    },
    onMutate: () => {
      toast.loading("Updating the password...", { id: toastId });
    },
  });
};


