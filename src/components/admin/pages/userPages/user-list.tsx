import { useUserInfoHook } from "@/hooks/use-user-hook";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Filter, Plus } from "lucide-react";
import { DataTable } from "./tables/data-table";
import { userInfoColumns } from "./tables/user-columns";

export default function UserList() {
  const { data, isLoading, isError } = useUserInfoHook();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  if (!data) {
    return <div>No Data</div>;
  }
  console.log(data);
  return (
    <div className="flex flex-col w-full items-center justify-center p-12">
      <div className="flex justify-start w-full text-4xl mt-24 ">
        <h1>List of Users</h1>
      </div>
      <div className="justify-start w-full flex mt-12 ">
        <Link
          to="/dashboard/userForm"
          className="bg-black px-4 py-2 text-lg flex  items-center justify-center space-x-2 rounded-lg text-white"
        >
          <Plus size={24} />
          <h1>New User</h1>
        </Link>
      </div>
      <DataTable columns={userInfoColumns} data={data}></DataTable>
    </div>
  );
}
