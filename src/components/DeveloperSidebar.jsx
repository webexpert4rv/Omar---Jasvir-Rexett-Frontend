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

const AdminSidebar = ({sideBarActive}) => {
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
                            <img src={sidebarLogo} alt="Sidebar Logo" />
                        </div>
                        <NavLink to={"/developer-dashboard"} className="dashboard-link" activeClassName="active"><MdSpaceDashboard/> Dashboard</NavLink>
                        <ul className="sidebar-listing py-0">
                            <li className="sidebar-item">
                                <NavLink to={"/developer-cv"} className="side-link" activeClassName="active"><FaUserLarge /> CV</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={"/edit-developer-profile"} className="side-link" activeClassName="active"><IoIosSettings /> Edit Profile</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={"/developer-documents"} className="side-link" activeClassName="active"><IoDocuments /> Documents</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={'/developer-time-reporting'} className="side-link" activeClassName="active"><BsClockFill /> Time Reporting</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="w-100 px-3 mt-3">
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
export default AdminSidebar;
