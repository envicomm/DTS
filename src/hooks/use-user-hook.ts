import { getUserInfo } from "@/api/userApi";
import { TUsers } from "@/schema/data-schema";
import { useQuery } from "@tanstack/react-query";

export function useUserInfoHook(){
    return useQuery<TUsers[]>({
        queryKey:['user-info'],
        queryFn: getUserInfo,
    })
}