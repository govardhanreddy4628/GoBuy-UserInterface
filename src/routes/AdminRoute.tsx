import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

const AdminRoute = () => {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) return <div>Loading...</div>;; 

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;