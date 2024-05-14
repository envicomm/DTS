import { TUserForm } from "@/schema/data-schema";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { UserForm } from "./forms/user-form";

export default function UserFormIndex() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const data: TUserForm[] = queryClient.getQueryData(["user-info"]) || [];

  const user = data?.find((user: any) => user.id === id);

  console.log(user);


  return (
    <div className="">{user ? <UserForm user={user} /> : <UserForm />}</div>
  );
}
