import React, { useState } from "react";
import sidebarLogo from "../../assets/img/rexett-logo-white.png";
import { Link, NavLink } from "react-router-dom"; // Import NavLink instead of Link

import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { PiSignOutBold } from "react-icons/pi";
import { FaTimes } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa6";

const RexettSideBar = ({ sidebarItems,floatingOptions,role }) => {
    const { t } = useTranslation();

    let currentRoute= role=="client"?"/":`/${role}-login`
    
    const logout = () => {
        localStorage.clear();
        window.location.href = currentRoute;
    };
    const [floatingShow, setFloatingShow] = useState(false);
    const handleFloating = () => {
        setFloatingShow(!floatingShow);
    }

    return (
        <>
            <aside className="sidebar">
                <div className="inner-sidebar h-100 d-flex flex-column justify-content-between align-items-center">
                    <div className="w-100">
                        <div className="sidebar-logo mt-3 mb-4">
                            <a href="https://www.rexett.com/">
                                <img src={sidebarLogo} alt="Sidebar Logo" />
                            </a>
                        </div>
                        {sidebarItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.to}
                                className="dashboard-link"
                                activeClassName="active"
                            >
                                {item.icon} {t(item.text)}
                            </NavLink>
                        ))}
                    </div>
                    <div className="w-100 px-3 mt-3">
                        <div>
                            <Link
                                onClick={logout}
                                className="bottom-link"
                                activeClassName="active"
                            >
                                <PiSignOutBold /> {t("signOut")}
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
                    {floatingOptions.map((option, index) => (
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
