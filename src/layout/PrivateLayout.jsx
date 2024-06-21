import React, { useEffect, useState } from "react";
import { getToken } from "../helper/utlis";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import RexettSideBar from "../components/sideBar/RexettSideBar";
import RexettHeader from "../components/Header/RexettHeader";
import roleConfig from "../components/config/roleConfig";

const PrivateLayout = ({ children }) => {
  const token = getToken("token");
  const role = localStorage.getItem("role");

  const { pathname } = useLocation();

  const basePath = pathname.split("-")[0];
  const derivedRole = basePath.split("/")[1];
  const {
    sidebarItems,
    floatingOptions,
    headerProps,
    privateRoute,
    publicRoute,
  } = roleConfig[role || derivedRole];
  const redirectPath = role ? privateRoute : publicRoute;

  if (!token || !roleConfig[role]) {
    return <Navigate to={`${redirectPath}`} />;
  }
  console.log(basePath, "basePath")

  return (
    <div className="dashboard-layout">
      {basePath !== "/admin/video" && basePath !== "/admin/meeting" ? (
        <RexettSideBar sidebarItems={sidebarItems} floatingOptions={floatingOptions} />
      ) : (
        <Outlet />
      )}

      <main className="main-wrapper">
        {basePath !== "/admin/video" && basePath !== "/admin/meeting" ? (
          <>
            <RexettHeader {...headerProps} />
            <Outlet />
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default PrivateLayout;
