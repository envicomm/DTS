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
import {Header} from "./components/common/Header";
import { SideNav } from "./components/common/Sidenav";

type PrivateProsp = {
  children: ReactNode;
};
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
    <PrivateAdminRoute>
      <Header/>
      <SideNav/>
      <Routes>
        <Route path={pathname} element={<Dashboard />} />
        <Route path={`${pathname}/profile`} element={<Dashboard />} />
      </Routes>
    </PrivateAdminRoute>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={<AdminRoutes />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
