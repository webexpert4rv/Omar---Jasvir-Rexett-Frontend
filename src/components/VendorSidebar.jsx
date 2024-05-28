import React, {useState} from "react";
import sidebarLogo from '../assets/img/rexett-logo-white.png'
import { Link, NavLink } from "react-router-dom"; // Import NavLink instead of Link
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { BsClockFill } from "react-icons/bs";
import { PiCoinsFill } from "react-icons/pi";
import { FaFileInvoice } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { useTranslation } from "react-i18next";
import { FaQuestion } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { Button } from "react-bootstrap";

const VendorSidebar = ({ sideBarActive }) => {
    const { t } = useTranslation()
    const logout=()=>{
        localStorage.clear()
         window.location.href="/vendor-login"
     }
     const [floatingShow, setFloatingShow] = useState(false);
     const handleFloating = () => {
         setFloatingShow(!floatingShow);
     }
    return(
        <>
            <aside className={sideBarActive ? "sidebar active" : "sidebar"}>
                <div className="inner-sidebar h-100 d-flex flex-column justify-content-between align-items-center">
                    <div className="w-100">
                        <div className="sidebar-logo mt-3 mb-4">
                           <a href="https://www.rexett.com/">  <img src={sidebarLogo} alt="Sidebar Logo"/></a>
                        </div>
                        <NavLink to={"/vendor-dashboard"} className="dashboard-link" activeClassName="active"><MdSpaceDashboard/> {t("dashboard")}</NavLink>
                        <ul className="sidebar-listing py-0">
                            <li className="sidebar-item">
                                <NavLink to={"/edit-vendor-profile"} className="side-link" activeClassName="active"><IoIosSettings /> {t("editProfile")}</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={"/vendor-documents"} className="side-link" activeClassName="active"><IoDocuments /> {t("documents")}</NavLink>
                            </li>
                            {/* <li className="sidebar-item">
                                <NavLink to={'/vendor-revenue'} className="side-link" activeClassName="active"><PiCoinsFill /> {t("revenue")}</NavLink>
                            </li> */}
                            <li className="sidebar-item">
                                <NavLink to={'/vendor-upload-invoice'} className="side-link" activeClassName="active"><FaFileInvoice /> Invoice</NavLink>
                            </li>
                            <li className="sidebar-item">
                                <NavLink to={'/vendor-time-reporting'} className="side-link" activeClassName="active"><BsClockFill /> {t("timeReporting")}</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="w-100 px-3">
                        <div>
                            <Link onClick={logout} className="bottom-link" activeClassName="active"><PiSignOutBold /> {t("signOut")}</Link>
                        </div>
                        {/*<div>
                            <NavLink to={'https://rexett-support.rvtechnologies.info'} target="blank" className="bottom-link" activeClassName="active"><TfiHeadphoneAlt /> Contact Support</NavLink>
                        </div>
                        <div>
                            <NavLink to={"/vendor-faq"} className="bottom-link" activeClassName="active"><BsFillQuestionCircleFill /> {t("FAQ")}</NavLink>
                        </div>*/}
                    </div>
                </div>
            </aside>
            <div className={ floatingShow ? "floating-area active" : "floating-area"}>
                <Button variant="transparent" className="floating-btn" onClick={handleFloating}>
                    { floatingShow ? <FaTimes /> : <FaQuestion />}
                </Button>
                <div className="floating-options">
                    <div className="mb-3">
                        <NavLink to={'https://rexett-support.rvtechnologies.info'} target="blank" activeClassName="active" className="text-decoration-none"><span className="icon-float"><TfiHeadphoneAlt /></span> <span className="float-text">Contact Support</span></NavLink>
                    </div>
                    <div>
                        <NavLink to={"/vendor-faq"} activeClassName="active" className="text-decoration-none"><span className="icon-float"><BsFillQuestionCircleFill /></span> <span className="float-text">{t("faq")}</span></NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
export default VendorSidebar;
