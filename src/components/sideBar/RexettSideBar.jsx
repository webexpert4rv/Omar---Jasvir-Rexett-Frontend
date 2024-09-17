import React, { useEffect, useState } from "react";
import sidebarLogo from "../../assets/img/rexett-logo-white.png";
import sidebarLogo2 from "../../assets/img/rexett-logo-white2.png";
import { Link, NavLink } from "react-router-dom";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { PiSignOutBold } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa6";
import { useSelector } from "react-redux";


const RexettSideBar = ({ sidebarItems, floatingOptions, role, collapseActive }) => {
    console.log(sidebarItems, "sidebarItems")
    const { t } = useTranslation();
    const { configDetails,allPermissionDetails } = useSelector(state => state.adminData)
    const [sidebarDataWithPermi,setSideBarDataWithPermi]=useState([])
    let currentRoute = role == "client" ? "/" : `/${role}-login`
    let {rolesWithPermissions}=allPermissionDetails

    const logout = () => {
        localStorage.clear();
        window.location.href = currentRoute;
    };
 console.log(rolesWithPermissions,"allPermissionDetails")
   
    const [floatingShow, setFloatingShow] = useState(false);
    const handleFloating = () => {
        setFloatingShow(!floatingShow);
    }

    // useEffect(()=>{
    //     if(rolesWithPermissions && rolesWithPermissions?.length>0){

    //     const updatedSecondArray = sidebarItems.map(item => {
    //         const isActive = rolesWithPermissions[0]?.permissions?.some(firstItem => firstItem.slug === item.slug);
    //         return { ...item, active: isActive };
    //       });
    //       setSideBarDataWithPermi(updatedSecondArray)
    //     }
        

    // },[allPermissionDetails])

    return (
        <>
            <aside className={collapseActive ? "sidebar" : "sidebar collapse-active"}>
                <div className="inner-sidebar h-100 d-flex flex-column justify-content-between align-items-center">
                    <div className="w-100">
                        <div className={collapseActive ? "sidebar-logo mt-3 mb-4" : "sidebar-logo mt-3 mb-4 logo-sidebar-wrapper"}>
                            <a href="https://www.rexett.com/">
                                { collapseActive ?
                                    <img src={configDetails?.company_logo ? configDetails?.company_logo : sidebarLogo   } alt="Sidebar Logo" />
                                    :
                                    <img src={sidebarLogo2} alt="Sidebar Logo" />
                                }
                            </a>
                        </div>
                        {sidebarItems.map((item, index) => (
                            <>
                                { collapseActive ?
                                    <NavLink
                                        key={index}
                                        to={item.to}
                                        className="dashboard-link"
                                        activeClassName="active"
                                    >
                                        <span className="sidebar-icon">
                                            {item.icon}
                                        </span>
                                        <span className="sidebar-text">
                                            {t(item.text)}
                                        </span>
                                    </NavLink> :

                                    <OverlayTrigger placement="right" overlay={<Tooltip>{t(item.text)}</Tooltip>}>
                                        <NavLink
                                            key={index}
                                            to={item.to}
                                            className="dashboard-link"
                                            activeClassName="active"
                                        >
                                            <span className="sidebar-icon">
                                                {item.icon}
                                            </span>
                                            <span className="sidebar-text">
                                                {t(item.text)}
                                            </span>
                                        </NavLink>
                                    </OverlayTrigger>
                               }
                            </>
                        ))}
                    </div>
                    <div className="w-100 px-3 mt-3">
                        <div>
                            <Link
                                onClick={logout}
                                className="bottom-link"
                                activeClassName="active"
                            >
                                <span className="sidebar-icon"><PiSignOutBold /></span> <span className="sidebar-text">{t("signOut")}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>
            <div className={floatingShow ? "floating-area active" : "floating-area"}>
                <Button variant="transparent" className="floating-btn" onClick={handleFloating}>
                    {floatingShow ? <FaTimes /> : <FaQuestion />}
                </Button>
                <div className="floating-options">
                    {floatingOptions?.map((option, index) => (
                        <div className="mb-3" key={index}>
                            <NavLink
                                to={option.to}
                                target={option.external ? "_blank" : ""}
                                activeClassName="active"
                                className="text-decoration-none"
                            >
                                <span className="icon-float">{option.icon}</span>
                                <span className="float-text">{option.text}</span>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default RexettSideBar;
