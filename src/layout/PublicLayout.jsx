import React from "react";
import { getToken } from "../helper/utlis";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import roleConfig from "../components/config/roleConfig";

const PublicLayout = ({ children }) => {
  const token = getToken("token");
  const role = localStorage.getItem("role");
  const { pathname } = useLocation();
  console.log(role,"rolepri")

  const basePath = pathname.split('-')[0];
  const derivedRole = basePath.split("/")[1];
  const { privateRoute,publicRoute } = roleConfig[role || derivedRole?derivedRole:"client"];
  const redirectPath = role? privateRoute :publicRoute

  if (token ) {
    return <Navigate to={`${redirectPath}`} />;
  }

  return <Outlet />;
};

export default PublicLayout;


