import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Dashboard } from "./components/admin/pages/Dashboard";
import { Login } from "./components/common/Login";
import { ReactNode, useEffect, useState } from "react";
import { Header } from "./components/common/Header";
import { SideNav } from "./components/common/Sidenav";
import { Register } from "./components/common/Register";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { publicDecrypt } from "crypto";
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
        <Header />
        <SideNav />
        <Routes>
          <Route path={pathname} element={<Dashboard />} />
          <Route path={`${pathname}/profile`} element={<Dashboard />} />
        </Routes>
      </PrivateAdminRoute>
    </QueryClientProvider>
  );
}
function PublicRoutes(){
  return(
    <QueryClientProvider client={publicQueryClient}>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </QueryClientProvider>
  )

}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/*" element={<AdminRoutes />} />
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
