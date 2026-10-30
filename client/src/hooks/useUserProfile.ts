import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { getCurrentUser } from "../services/auth.service";
import {
  updateProfile,
  type UpdateProfilePayload,
  type UpdateProfileResponse,
} from "../services/user.service";

import {
  useAuthStore,
  type AuthUser,
} from "../store/auth-store";

export function useUserProfile() {
  const queryClient = useQueryClient();

  const user = useAuthStore(
    (state) => state.user
  );

  const setUser = useAuthStore(
    (state) => state.setUser
  );

  const {
    data,
    isLoading,
    error,
  } = useQuery<{ user: AuthUser }>({
    queryKey: ["currentUser"],

    queryFn: getCurrentUser,

    enabled: Boolean(user),

    staleTime: 1000 * 60 * 5,

    retry: 1,
  });

  /*
   * IMPORTANT:
   *
   * Do NOT continuously copy React Query data
   * into Zustand with useEffect.
   *
   * That can overwrite freshly updated profile data
   * with stale cached data.
   */

  const updateProfileMutation =
    useMutation<
      UpdateProfileResponse,
      Error,
      UpdateProfilePayload
    >({
      mutationFn: updateProfile,

      onSuccess: (responseData) => {
        const updatedUser =
          responseData.user;

        /*
         * 1. Update Zustand immediately.
         *
         * ProfileCard and ProfileCompletion
         * will re-render immediately.
         */
        setUser(updatedUser);

        /*
         * 2. Replace React Query cache immediately.
         *
         * We do NOT wait for another request.
         */
        queryClient.setQueryData(
          ["currentUser"],
          {
            user: updatedUser,
          }
        );

        /*
         * 3. Optional background revalidation.
         *
         * This verifies server state without
         * replacing the UI with stale data first.
         */
        void queryClient.invalidateQueries({
          queryKey: ["currentUser"],
          refetchType: "active",
        });

        toast.success(
          "Profile updated successfully!"
        );
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to update profile."
        );
      },
    });

  /*
   * Prefer the React Query user when it exists,
   * otherwise use Zustand.
   */
  const currentUser =
    data?.user ?? user;

  return {
    user: currentUser,

    isLoading,

    error,

    updateProfile:
      updateProfileMutation.mutateAsync,

    isUpdating:
      updateProfileMutation.isPending,
  };
}