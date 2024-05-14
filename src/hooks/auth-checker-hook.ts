import { checkAuth } from "@/api/auth/auth";
import { useQuery } from "@tanstack/react-query";


export function useAuthCheckerHook() {
  return useQuery({
    queryKey: ['auth-checker'],
    queryFn: checkAuth,
    
  });
}