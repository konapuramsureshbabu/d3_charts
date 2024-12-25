import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const isAuthenticated=localStorage.getItem("isAuth")
  return isAuthenticated==="true" ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
