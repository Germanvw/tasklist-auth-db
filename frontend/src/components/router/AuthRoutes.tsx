import { Navigate } from "react-router-dom";
import { Outlet } from "react-router";

export const AuthRoutes = ({ uid }: any) => {
  return uid ? <Outlet /> : <Navigate to="/login" />;
};
