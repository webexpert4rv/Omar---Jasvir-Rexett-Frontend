import React from "react";
import sidebarLogo from '../assets/img/logo-white-new.png'
import { Link, NavLink } from "react-router-dom"; // Import NavLink instead of Link
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { BsClockFill } from "react-icons/bs";
import { PiCoinsFill } from "react-icons/pi";
import { FaFileInvoice } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { BsFillQuestionCircleFill } from "react-icons/bs";

const VendorSidebar = ({ sideBarActive }) => {
    const logout=()=>{
        localStorage.clear()
         window.location.href="/vendor-login"
     }
    return(
        <>
            <aside className={sideBarActive ? "sidebar active" : "sidebar"}>
                <div className="inner-sidebar h-100 d-flex flex-column justify-content-between align-items-center">
                    <div className="w-100">
                        <div className="sidebar-logo mb-3">
                            <img src={sidebarLogo} alt="Sidebar Logo" />
                        </div>
                        <NavLink to={"/vendor-dashboard"} className="dashboard-link" activeClassName="active"><MdSpaceDashboard/> Dashboard</NavLink>
                        <ul className="sidebar-listing py-0">
                            <li className="sidebar-item">
                                <NavLink to={"/edit-vendor-profile"} className="side-link" activeClassName="active"><IoIosSettings /> Edit Profile</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={"/vendor-documents"} className="side-link" activeClassName="active"><IoDocuments /> Documents</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={'/vendor-revenue'} className="side-link" activeClassName="active"><PiCoinsFill /> Revenue</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={'/vendor-upload-invoice'} className="side-link" activeClassName="active"><FaFileInvoice /> Upload Invoice</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={'/vendor-time-reporting'} className="side-link" activeClassName="active"><BsClockFill /> Time Reporting</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="w-100 px-3">
                        <div>
                            <Link onClick={logout} className="bottom-link" activeClassName="active"><PiSignOutBold /> Sign Out</Link>
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
export default VendorSidebar;
