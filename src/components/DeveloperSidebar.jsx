import React from "react";
import sidebarLogo from '../assets/img/rexett-logo-white.png'
import { Link, NavLink, useNavigate } from "react-router-dom"; // Import NavLink instead of Link
import { MdSpaceDashboard } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { BsClockFill } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const AdminSidebar = ({sideBarActive}) => {
    const  { t } = useTranslation()
    const logout=()=>{
       localStorage.clear()
        window.location.href="/developer-login"
    }
    return(
        <>
            <aside className="sidebar">
                <div className="inner-sidebar h-100 d-flex flex-column justify-content-between align-items-center">
                    <div className="w-100">
                    <div className="sidebar-logo mt-3 mb-4">
                    <a href="https://rexett-web.rvtechnologies.in/">  <img src={sidebarLogo} alt="Sidebar Logo"/></a>
                        </div>
                        <NavLink to={"/developer-dashboard"} className="dashboard-link" activeClassName="active"><MdSpaceDashboard/> {t("dashboard")}</NavLink>
                        <ul className="sidebar-listing py-0">
                            <li className="sidebar-item">
                                <NavLink to={"/developer-cv"} className="side-link" activeClassName="active"><FaUserLarge /> {t("cv")}</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={"/edit-developer-profile"} className="side-link" activeClassName="active"><IoIosSettings /> {t("editProfile")}</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={"/developer-documents"} className="side-link" activeClassName="active"><IoDocuments /> {t("documents")}</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={'/developer-time-reporting'} className="side-link" activeClassName="active"><BsClockFill /> {t("timeReporting")}</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="w-100 px-3 mt-3">
                        <div>
                            <Link onClick={logout} className="bottom-link" activeClassName="active"><PiSignOutBold /> {t("signOut")}</Link>
                        </div>
                        <div>
                            <NavLink to={"/developer-faq"} className="bottom-link" activeClassName="active"><BsFillQuestionCircleFill /> {t("faq")}</NavLink>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
export default AdminSidebar;
