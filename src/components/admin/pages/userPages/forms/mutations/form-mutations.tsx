
import { registerUserApi, updateUserInfoAPI } from "@/api/userApi/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRegisterUserMutation() {

  return useMutation({
    mutationFn: registerUserApi,
  });
}
export function useUpdateUserMutation() {
  return useMutation({
    mutationFn: updateUserInfoAPI,
    
  });
}
