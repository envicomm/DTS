import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { ReactNode, useEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./components/common/header";
import { SideNav } from "./components/common/sidenav";
import { Dashboard } from "./components/admin/pages/dashboard";
import { Register } from "./components/common/register";
import Login from "./components/common/login";
import UserList from "./components/admin/pages/userPages/user-list";
import { ScrollArea } from "./components/ui/scroll-area";

type PrivateProsp = {
  children: ReactNode;
};

const adminQueryClient = new QueryClient();
const publicQueryClient = new QueryClient();

const PrivateAdminRoute = ({ children }: PrivateProsp) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <>{children}</> : null;
};
function AdminRoutes() {
  const { pathname } = useLocation();

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
                <ScrollArea className="h-full w-full">

                <Routes>
                  <Route path="/overview" element={<Dashboard />} />
                  <Route path={`${pathname}/profile`} element={<Dashboard />} />
                  <Route path={`/register`} element={<Register />} />
                  <Route path={`/users`} element={<UserList />} />
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
