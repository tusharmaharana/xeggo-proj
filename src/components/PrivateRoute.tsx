import React, { ReactElement } from "react";
import { Navigate, Route } from "react-router-dom";

interface PrivateRouteProps {
  component: () => ReactElement;
  path: string;
  exact: boolean;
}

// temporary islogin logic
const isLogin = () => true;

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, Navigate the user to /signin page
    <Route
      {...rest}
      children={() => (isLogin() ? <Component /> : <Navigate to="/signin" />)}
    />
  );
};

export default PrivateRoute;
