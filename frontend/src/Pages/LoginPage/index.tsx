import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";

const LoginPage = () => {
  const authContext = useAuthContext();
  return (
    <MantineProvider>
      <Notifications />
      <div className="container">
        {authContext.auth.isAuthenticated && <Navigate to="/" />}
        <Outlet />
      </div>
    </MantineProvider>
  );
};

export default LoginPage;
