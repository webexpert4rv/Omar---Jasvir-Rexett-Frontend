import React from "react";
import { FaBell } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { Dropdown } from "react-bootstrap";
import Notification from "./atomic/Notfication";
const VendorNavigation = ({ handleSidebar }) => {
    return (
        <>
            <header className="mb-4">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="">
                        {/* <button onClick={handleSidebar} className="bars-btn"><HiBars3 /></button> */}
                    </div>
                    <div className="d-flex align-items-center gap-3">
                       <Notification route="notification-vendor" job="" doc="documents" />
                        <Link to={'/register-developer'} className="text-decoration-none main-btn">Register new developer</Link>
                    </div>
                </div>
            </header>
        </>
    )
}
export default VendorNavigation;