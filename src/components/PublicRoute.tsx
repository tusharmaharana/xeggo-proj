import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

interface PublicRouteProps {
  restricted: boolean;
}
const PublicRoute = ({ restricted }: PublicRouteProps) => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <>{!!user && restricted ? <Navigate to="todo" /> : <Outlet />}</>
  );
};

export default PublicRoute;
