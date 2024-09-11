import React, { useEffect, useState } from "react";
import { getToken } from "../helper/utlis";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import RexettSideBar from "../components/sideBar/RexettSideBar";
import RexettHeader from "../components/Header/RexettHeader";
import roleConfig from "../components/config/roleConfig";

const PrivateLayout = ({ children }) => {
  const token = getToken("token");
  const { pathname } = useLocation();
  const basePath = pathname.split("-")[0];
  const derivedRole = basePath.split("/")[1];
  const [collapseLayout , showCollapseLayout] = useState(false);
  const handleShowCollpaseLayout = () => {
    showCollapseLayout(!collapseLayout);
  }

  let role;
  if (derivedRole == "super"){
     role = "superAdmin"
  }else{
     role = localStorage.getItem("role");
     if(role=="sub-admin"){
      role="subAdmin"
     }
  }

  
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
 

  return (
    <div className="dashboard-layout">
      {basePath !== "/admin/video" && basePath !== "/admin/meeting" ? (
        <RexettSideBar collapseActive={collapseLayout} sidebarItems={sidebarItems} floatingOptions={floatingOptions} role={role} />
      ) : (
        <Outlet />
      )}

      <main className={collapseLayout ? "main-wrapper" : "main-wrapper collapsable-active"}>
        {basePath !== "/admin/video" && basePath !== "/admin/meeting" ? (
          <>
            <RexettHeader collapseLayout={collapseLayout} handleCollapseSidebar={handleShowCollpaseLayout} {...headerProps} />
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
