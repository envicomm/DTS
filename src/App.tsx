import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Dashboard } from "./components/admin/pages/Dashboard";
import { Login } from "./components/common/Login";

function AdminRoutes() {
  const { pathname } = useLocation();

  return (
    <Routes>
      <Route path={pathname} element={<Dashboard />}></Route>
      <Route path={`${pathname}/../profile`} element={<Dashboard />}></Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
