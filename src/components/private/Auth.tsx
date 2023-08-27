import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../../hooks/use-auth";
import Spinner from "../ui/spinner/Spinner";

const AuthRoute = (): JSX.Element => {
  const { loggedIn, checkStatus } = useAuth();

  if (checkStatus) {
    return (
      <div className="w-full h-screen relative">
        <Spinner />
      </div>
    );
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;
