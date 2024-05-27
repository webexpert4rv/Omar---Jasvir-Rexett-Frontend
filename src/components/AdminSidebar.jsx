import React, { useTransition } from "react";
import sidebarLogo from '../assets/img/rexett-logo-white.png'
import { Link, NavLink } from "react-router-dom"; // Import NavLink instead of Link
import { MdSpaceDashboard } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { BsClockFill } from "react-icons/bs";
import { PiCoinsFill } from "react-icons/pi";
import { FaFileInvoice } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa6";
import { PiUsersFourFill } from "react-icons/pi";
import { RiFileCopy2Fill } from "react-icons/ri";
import { BsToggles } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const AdminSidebar = ({ sideBarActive }) => {
    const { t } = useTranslation()
    const logout=()=>{
        localStorage.clear()
         window.location.href="/admin-login"
     }
    return(
        <>
            <aside className={sideBarActive ? "sidebar active" : "sidebar"}>
                <div className="inner-sidebar h-100 d-flex flex-column justify-content-between align-items-center">
                    <div className="w-100">
                        <div className="sidebar-logo mt-3 mb-4">
                        <a href="https://www.rexett.com/">  <img src={sidebarLogo} alt="Sidebar Logo"/></a>
                        </div>
                        <NavLink to={"/admin-dashboard"} className="dashboard-link" activeClassName="active"><MdSpaceDashboard/> {t("dashboard")}</NavLink>
                        <ul className="sidebar-listing py-0">
                            {/* <li className="sidebar-item"> */}
                                {/* <NavLink to={"/list-clients"} className="side-link" activeClassName="active"><FaUserLarge /> {t("listOfClients")}</NavLink> */}
                            {/* </li> */}
                            <li className="sidebar-item">
                                <NavLink to={"/applications"} className="side-link" activeClassName="active"><RiFileCopy2Fill /> <span className="d-flex align-items-center">{t("applications")} </span></NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={"/members"} className="side-link" activeClassName="active"><PiUsersFourFill /> {t("members")}</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={'/admin-job-listing'} className="side-link" activeClassName="active"><FaListUl /> {t("jobListing")}</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={"/edit-admin-profile"} className="side-link" activeClassName="active"><IoIosSettings /> {t("editProfile")}</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={"/admin-documents"} className="side-link" activeClassName="active"><IoDocuments /> {t("documents")}/{t("images")}</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={'/admin-time-reporting'} className="side-link" activeClassName="active"><BsClockFill /> {t("timeReporting")}</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={'/revenue'} className="side-link" activeClassName="active"><PiCoinsFill />Invoice</NavLink>
                            </li>
                            {/* <li className="sidebar-item">
                                <NavLink to={'/account-deletion-request'} className="side-link" activeClassName="active"><BsToggles /> {t("accountDeletionRequest")}</NavLink>
                            </li> */}
                        </ul>
                    </div>
                    <div className="w-100 px-3 mt-xxl-3">
                        <div>
                        <Link onClick={logout} className="bottom-link" activeClassName="active"><PiSignOutBold /> {t("signOut")}</Link>
                        </div>
                        <div>
                            <NavLink to={"/admin-faq"} className="bottom-link" activeClassName="active"><BsFillQuestionCircleFill /> {t("faq")}</NavLink>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
export default AdminSidebar;
