import {
  BookUser,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  LibraryBig,
  UserRoundPlus,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/api/auth/auth";
import PermissionsGate from "@/permissions/permission-gate";
import { SCOPES } from "@/permissions/permission-map";
import { useState } from "react"

export const SideNav = () => {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: logoutUser,
    onMutate: () => console.log("onMutate"),
    onSuccess: async (data) => {
      console.log(data);
      localStorage.clear();
      navigate("/");
    },
    onError: async () => console.log("onError"),
  });

  const logout = () => {
    mutation.mutate();
  };

  return (
    <div className="flex w-full min-h-full ">
      <ul className="flex flex-col mt-24 space-y-4 w-full  text-[#333333] mx-2">
        <li className="relative inline-block text-left ">
          <NavLink
            to={`/dashboard/overview`}
            className={({ isActive }) => {
              return `justify-start items-center flex  w-full p-2 space-x-2  rounded-md ${
                isActive ? "bg-[#007BFF]" : ""
              }`;
            }}
          >
            <LayoutDashboard className="" />
            <h1 className="text-2xl">Dashboard</h1>
          </NavLink>
        </li>

        <li className="relative inline-block text-left  ">
          <button
            onClick={() => setIsUserOpen(!isUserOpen)}
            className="justify-between flex w-full p-2 space-x-2 text-lg  rounded-md"
          >
            <div className="justify-start flex  space-x-2 items-center">
              <UserRoundPlus />

              <h1 className="text-2xl">User</h1>
            </div>
            <div
              className={`transition-transform duration-500 transform ${
                isUserOpen ? "rotate-180" : ""
              }`}
            >
              <ChevronDown />
            </div>
          </button>
          {isUserOpen && (
            <div className=" flex w-full rounded-md  ">
              <div
                className="py-1 flex flex-col gap-2 ml-12 mr-4 w-full"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <NavLink
                  to="/dashboard/userForm"
                  className={({ isActive }) => {
                    return `w-full block px-4 py-2 text-xl  hover:bg-[#007bffba]  rounded-md ${
                      isActive ? "bg-[#007BFF]" : ""
                    }`;
                  }}
                >
                  <h1>Register</h1>
                </NavLink>
                <NavLink
                  to="/dashboard/users"
                  className={({ isActive }) => {
                    return `w-full block px-4 py-2 text-xl  hover:bg-[#007bffba] rounded-md ${
                      isActive ? "bg-[#007BFF]" : ""
                    }`;
                  }}
                >
                  <h1>User list</h1>
                </NavLink>
                <NavLink
                  to="/dashboard/transaction"
                  className={({ isActive }) => {
                    return `w-full block px-4 py-2 text-xl  hover:bg-[#007bffba]  rounded-md ${
                      isActive ? "bg-[#007BFF]" : ""
                    }`;
                  }}
                >
                  <h1>Accounts</h1>
                </NavLink>
              </div>
            </div>
          )}
        </li>
        <li className="relative inline-block text-left  ">
          <button
            onClick={() => setIsTransactionOpen(!isTransactionOpen)}
            className="justify-between items-center flex w-full p-2 space-x-2 text-lg rounded-md"
          >
            <div className="justify-start flex items-center space-x-2">
              <LibraryBig />

              <h1 className="text-2xl">Transactions</h1>
            </div>
            <div
              className={`transition-transform duration-500 transform ${
                isTransactionOpen ? "rotate-180" : ""
              }`}
            >
              <ChevronDown />
            </div>
          </button>
          {isTransactionOpen && (
            <div className=" flex w-full rounded-md ">
              <div
                className="py-1 flex flex-col gap-2 ml-12 mr-4 w-full"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <NavLink
                  to="/dashboard/transactions"
                  className={({ isActive }) => {
                    return `w-full block px-4 py-2 text-xl  hover:bg-[#007bffba]  rounded-md ${
                      isActive ? "bg-[#007BFF]" : ""
                    }`;
                  }}
                >
                  <h1>Transaction list</h1>
                </NavLink>
                <NavLink
                  to="/dashboard/transactionForm"
                  className={({ isActive }) => {
                    return `w-full block px-4 py-2 text-xl  hover:bg-[#007bffba] rounded-md ${
                      isActive ? "bg-[#007BFF]" : ""
                    }`;
                  }}
                >
                  <h1>Add transaction</h1>
                </NavLink>
              </div>
            </div>
          )}
        </li>

        <li className="relative inline-block text-left text-sm">
          <Button
            variant="ghost"
            onClick={() => logout()}
            className="justify-start items-center flex w-full p-2 space-x-2 text-lg  rounded-md"
          >
            <BookUser />
            <h1 className="text-2xl font-normal">Logout</h1>
          </Button>
        </li>
      </ul>
    </div>
  );
};
