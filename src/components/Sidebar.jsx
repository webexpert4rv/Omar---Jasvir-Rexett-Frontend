import React from "react";
import sidebarLogo from '../assets/img/rexett-logo-white.png'
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
import { IoBriefcase } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { Button } from "react-bootstrap";

const Sidebar = ({sideBarActive , closemainSidebar}) => {
    const logout=()=>{
       localStorage.clear()
        window.location.href="/"
    }
    return(
        <>
            <aside className={sideBarActive ? "sidebar active" : "sidebar"}>
                <div className="inner-sidebar h-100 d-flex flex-column justify-content-between align-items-center">
                    <div className="w-100">
                        <div className="d-flex justify-content-between align-items-center pe-4 mb-3">
                            <div className="sidebar-logo mt-3 mb-4">
                                <img src={sidebarLogo} alt="Sidebar Logo" />
                            </div>
                            <Button onClick={closemainSidebar} variant="transparent" className="main-btn outline-main-btn px-3 bg-white d-lg-none">&times;</Button>
                        </div>
                        <NavLink to={"/dashboard"} className="dashboard-link" activeClassName="active"><MdSpaceDashboard/> Dashboard</NavLink>
                        <ul className="sidebar-listing py-0">
                            <li className="sidebar-item">
                                <NavLink to={"/hired-developers"} className="side-link" activeClassName="active"><FaUserLarge /> Hired Developers</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={"/edit-profile"} className="side-link" activeClassName="active"><IoIosSettings /> Edit Profile</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={"/documents"} className="side-link" activeClassName="active"><IoDocuments /> Documents</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={'/time-reporting'} className="side-link" activeClassName="active"><BsClockFill /> Time Reporting</NavLink>
                            </li>
                            {/* <li className="sidebar-item">
                                <NavLink to={'/job-post'} className="side-link" activeClassName="active"><IoBriefcase /> Job Post</NavLink>
                            </li> */}
                            <li className="sidebar-item">
                                <NavLink to={'/job-posted'} className="side-link" activeClassName="active"><FaListUl /> Jobs</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={'/earned-back'} className="side-link" activeClassName="active"><PiCoinsFill /> Earned Back</NavLink>
                            </li>
                            {/* <li className="sidebar-item">
                                <NavLink to={'/invoice'} className="side-link" activeClassName="active"><FaFileInvoice /> Invoice</NavLink>
                            </li> */}
                        </ul>
                    </div>
                    <div className="w-100 px-3 mt-xxl-3">
                        <div>
                            <NavLink onClick={logout} className="bottom-link" activeClassName="active"><PiSignOutBold /> Sign Out</NavLink>
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
export default Sidebar;
