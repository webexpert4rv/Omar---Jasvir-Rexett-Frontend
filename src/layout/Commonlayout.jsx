import React, { useEffect, useState } from "react";
import { getToken } from "../helper/utlis";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import RexettSideBar from "../components/sideBar/RexettSideBar";
import RexettHeader from "../components/Header/RexettHeader";
import roleConfig from "../components/config/roleConfig";

const CommonLayout = ({ children }) => {
  const token = getToken("token");
  const { pathname } = useLocation();
  const basePath = pathname.split("-")[0];
  const derivedRole = basePath.split("/")[1];
  const [collapseLayout, showCollapseLayout] = useState(false);
  const handleShowCollpaseLayout = () => {
    showCollapseLayout(!collapseLayout);
  };

  let role;
  if (derivedRole == "super") {
    role = "superAdmin";
  } else {
    role = localStorage.getItem("role");
    if (role == "employee") {   
      role = "subAdmin";
    }
  }
  console.log(derivedRole,"inside common layout");
  const RoleConfig = roleConfig[role || derivedRole];
  const redirectPath = role ? RoleConfig?.privateRoute : RoleConfig?.publicRoute;

//   if (token && (role !== "admin" && role!=="superAdmin")) {
//     return <Navigate to={`${redirectPath}`} />;
//   }

  return (
    <div className="dashboard-layout">
      {basePath !== "/admin/video" && basePath !== "/admin/meeting" ? (
        token && (
          <RexettSideBar
            collapseActive={collapseLayout}
            sidebarItems={RoleConfig?.sidebarItems}
            floatingOptions={RoleConfig?.floatingOptions}
            role={role}
          />
        )
      ) : (
        <Outlet />
      )}

      <main
        className={
          collapseLayout ? "main-wrapper" : "main-wrapper collapsable-active"
        }
      >
        {basePath !== "/admin/video" && basePath !== "/admin/meeting" ? (
          <>    
            {token && (
              <RexettHeader
                collapseLayout={collapseLayout}
                handleCollapseSidebar={handleShowCollpaseLayout}
                {...RoleConfig?.headerProps}
              />
            )}
            <Outlet />
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default CommonLayout;
