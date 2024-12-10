import { useMutation } from "@tanstack/react-query";

import { updateProfile } from "../service/User";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  const toastId = 1;

  return useMutation({
    mutationFn: async (userData: FormData) => await updateProfile(userData),
    onSuccess: async () => {
      toast.success(`Profile updated!`, { id: toastId });
    },

    onError: (error) => {
      toast.error(error.message, { id: toastId });
    },
    onMutate: () => {
      toast.loading("Updating user...", { id: toastId });
    },
  });
};
