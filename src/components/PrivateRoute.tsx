import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

const PrivateRoute = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    // Show the component only when the user is logged in
    // Otherwise, Navigate the user to /signin page
    <>{!!user ? <Outlet /> : <Navigate to="/signin" replace={true} />}</>
  );
};

export default PrivateRoute;
