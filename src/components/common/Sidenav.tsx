import { BookUser, LayoutDashboard, UserRoundPlus } from "lucide-react";
import { NavLink } from "react-router-dom";

export const SideNav = () => {
  return (
    <div className="flex w-[298px] min-h-full ">
      <ul className="flex flex-col mt-24 space-y-4 w-full  text-[#333333] mx-2">
        <li>
          <NavLink
            to={`/dashboard/overview`}
            className={({ isActive }) => {
              return `justify-start items-center flex  w-full p-2 space-x-2 text-lg font-semibold rounded-md ${
                isActive ? "bg-[#007BFF]" : ""
              }`;
            }}
          >
            <LayoutDashboard className="" />
            <h1>Dashboard</h1>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/register"
            className={({ isActive }) => {
              return `justify-start items-center flex w-full p-2 space-x-2 text-lg font-semibold rounded-md ${
                isActive ? "bg-[#007BFF]" : ""
              }`;
            }}
          >
            <UserRoundPlus />
            <h1>Register</h1>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/users"
            className={({ isActive }) => {
              return `justify-start items-center flex w-full p-2 space-x-2 text-lg font-semibold rounded-md ${
                isActive ? "bg-[#007BFF]" : ""
              }`;
            }}
          >
            <BookUser />
            <h1>User list</h1>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/transaction"
            className={({ isActive }) => {
              return `justify-start items-center flex w-full p-2 space-x-2 text-lg font-semibold rounded-md ${
                isActive ? "bg-[#007BFF]" : ""
              }`;
            }}
          >
            <BookUser />
            <h1>Transaction</h1>
          </NavLink>
        </li>
        
      </ul>
    </div>
  );
};
