import React from "react";
import sidebarLogo from '../assets/img/logo-main.png'
import { NavLink } from "react-router-dom"; // Import NavLink instead of Link
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

const AdminSidebar = ({ sideBarActive }) => {
    return(
        <>
            <aside className={sideBarActive ? "sidebar active" : "sidebar"}>
                <div className="inner-sidebar h-100 d-flex flex-column justify-content-between align-items-center">
                    <div className="w-100">
                        <div className="sidebar-logo text-center">
                            <img src={sidebarLogo} alt="Sidebar Logo" />
                        </div>
                        <NavLink to={"/admin-dashboard"} className="dashboard-link mb-4" activeClassName="active"><MdSpaceDashboard/> Dashboard</NavLink>
                        <ul className="sidebar-listing">
                            <li className="sidebar-item">
                                <NavLink to={"/list-clients"} className="side-link" activeClassName="active"><FaUserLarge /> List of clients</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={"/edit-admin-profile"} className="side-link" activeClassName="active"><IoIosSettings /> Edit Profile</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={"/admin-documents"} className="side-link" activeClassName="active"><IoDocuments /> Documents/Images</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={'/admin-time-reporting'} className="side-link" activeClassName="active"><BsClockFill /> Time Reporting</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={'/admin-job-listing'} className="side-link" activeClassName="active"><FaListUl /> Job Listing</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={'/revenue'} className="side-link" activeClassName="active"><PiCoinsFill /> Revenue</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={'/admin-invoice'} className="side-link" activeClassName="active"><FaFileInvoice /> Invoice</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="w-100 px-3">
                        <div>
                            <NavLink to={"/agency-login"} className="bottom-link" activeClassName="active"><PiSignOutBold /> Sign Out</NavLink>
                        </div>
                        <div>
                            <NavLink to={"/faq"} className="bottom-link" activeClassName="active"><BsFillQuestionCircleFill /> FAQ</NavLink>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
export default AdminSidebar;
