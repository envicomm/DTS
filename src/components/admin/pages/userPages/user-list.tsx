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
    <div className="w-full h-full p-4 flex flex-col items-center space-y-12">
      <div className="flex w-full mt-12 text-4xl">List of users</div>

      <Table>
        <TableCaption>User List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Profile</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Division</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Date Started</TableHead>
            <TableHead>Job Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={()=>window.open(user.signedUrl)}>

                <Avatar>
                  <AvatarImage src={user.signedUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </Button>
              </TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.assignedDivision}</TableCell>
              <TableCell>{user.assignedSection}</TableCell>
              <TableCell>{user.assignedPosition}</TableCell>
              <TableCell>{user.dateStarted.toString()}</TableCell>
              <TableCell>{user.jobStatus}</TableCell>
              <TableCell>
                <Button>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
