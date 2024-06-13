import React from "react";
import { getToken } from "../helper/utlis";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import roleConfig from "../components/config/roleConfig";

const PublicLayout = ({ children }) => {
  const token = getToken("token");
  let role = localStorage.getItem("role");
  const { pathname } = useLocation();

  if (!role) {
    role = "client";
  }

  const basePath = pathname.split("-")[0];
  const derivedRole = basePath.split("/")[1];
  let currentRoute = role || derivedRole;
  const { privateRoute, publicRoute } = roleConfig[currentRoute];
  const redirectPath = role ? privateRoute : publicRoute;

  if (token) {
    return <Navigate to={`${redirectPath}`} />;
  }

  return <Outlet />;
};

export default PublicLayout;
