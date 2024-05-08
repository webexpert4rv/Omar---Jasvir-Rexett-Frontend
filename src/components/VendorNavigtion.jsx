import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import Notification from "./atomic/Notfication";
import { useTranslation } from "react-i18next";
import LanguageChange from "./atomic/LanguageChange";

const VendorNavigation = ({ handleSidebar }) => {
   const [vendorName , setVendorName] = useState("")
    const { t } = useTranslation()
    useEffect(() => {
        const str = String(localStorage.getItem("userName"));
        const string = String(localStorage.getItem("vendorName"))
        if (string) {
            const setName = string.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
            setVendorName(setName)
        } else {
            const setName = str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
            setVendorName(setName)
        }
    }, []);


    const tooltip = (
        <Tooltip id="tooltip">
            {vendorName}
        </Tooltip>
    );

    return (
        <>
            <header className="mb-4">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="">
                        {/* <button onClick={handleSidebar} className="bars-btn"><HiBars3 /></button> */}
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <LanguageChange />
                        <Notification route="notification-vendor" job="" doc="vendor-documents" />
                        <Link to={'/register-developer'} className="text-decoration-none main-btn">{t("registerNewDeveloper")}</Link>
                        <OverlayTrigger placement="bottom" overlay={tooltip}>
                            <div className="profile-view">
                                <span>{vendorName?.split("")[0]}</span>
                            </div>
                        </OverlayTrigger>
                    </div>
                </div>
            </header>
        </>
    )
}
export default VendorNavigation;