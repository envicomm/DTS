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
  return (
    <div className="w-full h-full p-4 flex flex-col items-center space-y-12">
      <div className="flex w-full mt-12 text-4xl">List of users</div>

      <Table>
        <TableCaption>User List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>

            <TableHead className="">Name</TableHead>

            <TableHead>Division</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Date Started</TableHead>
            <TableHead>Job Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>

              <TableCell className="flex  items-center justify-start">
                <Button
                  variant="ghost"
                  onClick={() => window.open(user.signedUrl)}
                  className=""

                >
                  <Avatar>
                    <AvatarImage src={user.signedUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
                {user.firstName} {user.lastName}
              </TableCell>

              <TableCell>{user.assignedDivision}</TableCell>
              <TableCell>{user.assignedSection}</TableCell>
              <TableCell>{user.assignedPosition}</TableCell>
              <TableCell>{user.dateStarted.toString()}</TableCell>
              <TableCell>{user.jobStatus}</TableCell>
              <TableCell className="flex gap-4 items-center justify-center">
                <Button>
                  <Link to={`/dashboard/userForm/${user.id}`} className="">
                    Edit
                  </Link>
                </Button>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
