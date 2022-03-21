import React, { ReactElement } from "react";
import { Navigate, Route } from "react-router-dom";

interface PublicRouteProps {
  component: () => ReactElement;
  restricted: boolean;
  path: string;
  exact: boolean;
}

// temporary islogin logic
const isLogin = () => true;

const PublicRoute = ({
  restricted,
  component: Component,
  ...rest
}: PublicRouteProps) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      children={() =>
        isLogin() && restricted ? <Navigate to="/todo" /> : <Component />
      }
    />
  );
};

export default PublicRoute;
