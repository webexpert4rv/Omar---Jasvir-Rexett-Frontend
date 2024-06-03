import React, { useState } from "react";
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
import { FaListUl } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { GiPalmTree } from "react-icons/gi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaQuestion } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const SidebarItem = ({ to, icon, label }) => (
    <li className="sidebar-item">
        <NavLink to={to} className="side-link" activeClassName="active">
            {icon} {label}
        </NavLink>
    </li>
);

const Sidebar = ({ sideBarActive, closemainSidebar }) => {
    const [floatingShow, setFloatingShow] = useState(false);
    const { t } = useTranslation();

    const handleFloating = () => {
        setFloatingShow(!floatingShow);
    };

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    const sidebarItems = [
        { to: "/client/dashboard", icon: <MdSpaceDashboard />, label: t("dashboard")},
        { to: "/client/hired-developers", icon: <FaUserLarge />, label: t("hireDevelopers") },
        { to: "/client/edit-profile", icon: <IoIosSettings />, label: t("editProfile") },
        { to: "/client/documents", icon: <IoDocuments />, label: t("documents") },
        { to: "/client/time-reporting", icon: <BsClockFill />, label: t("timeReporting") },
        { to: "/client/leave-request", icon: <GiPalmTree />, label: t("leaveRequests") },
        { to: "/client/job-posted", icon: <FaListUl />, label: t("jobs") },
        { to: "/client/earned-back", icon: <PiCoinsFill />, label: t("earnedBack") },
        { to: "/client/invoice", icon: <FaFileInvoice />, label: t("invoice") },
    ];

    return (
        <>
            <aside className={sideBarActive ? "sidebar active" : "sidebar"}>
                <div className="inner-sidebar h-100 d-flex flex-column justify-content-between align-items-center">
                    <div className="w-100">
                        <div className="d-flex justify-content-between align-items-center pe-4 mb-3">
                            <div className="sidebar-logo mt-3 mb-4">
                                <a href="https://www.rexett.com/">
                                    <img src={sidebarLogo} alt="Sidebar Logo" />
                                </a>
                            </div>
                            <Button onClick={closemainSidebar} variant="transparent" className="main-btn outline-main-btn px-3 bg-white d-lg-none">
                                &times;
                            </Button>
                        </div>
                        <ul className="sidebar-listing py-0">
                            {sidebarItems.map((item, index) => (
                                <SidebarItem key={index} {...item} />
                            ))}
                        </ul>
                    </div>
                    <div className="w-100 px-3 mt-xxl-3">
                        <div>
                            <NavLink onClick={logout} className="bottom-link" activeClassName="active">
                                <PiSignOutBold /> {t("signOut")}
                            </NavLink>
                        </div>
                    </div>
                </div>
            </aside>
            <div className={floatingShow ? "floating-area active" : "floating-area"}>
                <Button variant="transparent" className="floating-btn" onClick={handleFloating}>
                    {floatingShow ? <FaTimes /> : <FaQuestion />}
                </Button>
                <div className="floating-options">
                    <div className="mb-3">
                        <NavLink to={'https://rexett-support.rvtechnologies.info'} target="_blank" activeClassName="active" className="text-decoration-none">
                            <span className="icon-float"><TfiHeadphoneAlt /></span> <span className="float-text">{t("contactSupport")}</span>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to={"/client/faq"} activeClassName="active" className="text-decoration-none">
                            <span className="icon-float"><BsFillQuestionCircleFill /></span> <span className="float-text">{t("faq")}</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
