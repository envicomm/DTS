import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import { ReactNode, useEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserList from "./components/admin/pages/userPages/user-list";
import { ScrollArea } from "./components/ui/scroll-area";
import { toast } from "react-toastify";
import { UserForm } from "./components/admin/pages/userPages/forms/user-form";
import { Login } from "./components/common/Login";
import { Header } from "./components/common/header";
import { SideNav } from "./components/common/sidenav";
import { Dashboard } from "./components/admin/pages/dashboard";
import { checkAuth } from "./api/auth/auth";
import UserFormIndex from "./components/admin/pages/userPages/user-form-index";
import { UserAccountList } from "./components/admin/pages/userPages/user-account-list";
import { TransactionForm } from "./components/admin/transaction/forms/transactionForm";

type PrivateProsp = {
  children: ReactNode;
};

const adminQueryClient = new QueryClient();
const publicQueryClient = new QueryClient();

const PrivateAdminRoute = ({ children }: PrivateProsp) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkerAuth = async () => {
      try {
        await checkAuth();
        setIsAuthenticated(true);
      } catch (error) {
        toast.error("Unauthorized");
        navigate("/");
      }
    };
    checkerAuth();
  }, []);

  return isAuthenticated ? <>{children}</> : null;
};
function AdminRoutes() {
  return (
    <QueryClientProvider client={adminQueryClient}>
      <PrivateAdminRoute>
        <div className="flex flex-col w-full bg-[#F4F4F4] min-h-screen relative">
          <div className="flex w-full min-h-[77px] bg-white">
            <Header />
          </div>
          <div className="flex w-full min-h-screen">
            <div className="flex-none  w-[350px] bg-white m-4">
              <SideNav />
            </div>
            <div className="flex-grow z-10 p-4">
              <div className="flex  bg-white min-h-screen ">
                <ScrollArea className="h-full w-full p-12">
                  <Routes>
                    <Route path="/overview" element={<Dashboard />} />
                    <Route path={`/profile`} element={<Dashboard />} />
                    <Route path={`/userAccount`} element={<UserAccountList />} />
                    <Route path={`/register`} element={<UserForm />} />
                    <Route path={`/users`} element={<UserList />} />
                    <Route path={`/userForm/:id`} element={<UserFormIndex />} />
                    <Route path="/userForm" element={<UserFormIndex />} />
                    <Route path="/transactionForm" element={<TransactionForm />} />
                  </Routes>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </PrivateAdminRoute>
    </QueryClientProvider>
  );
}
function PublicRoutes() {
  return (
    <QueryClientProvider client={publicQueryClient}>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </QueryClientProvider>
  );
}
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard/*" element={<AdminRoutes />} />
          <Route path="/*" element={<PublicRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
