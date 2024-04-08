import React from "react";
import { FaBell } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { Dropdown } from "react-bootstrap";
import Notification from "./atomic/Notfication";
const DeveloperNavigation = ({ onClick }) => {
    return (
        <>
            <header className="mb-4">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="">
                        {/* <button onClick={onClick} className="bars-btn"><HiBars3 /></button> */}
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <Notification route="notification-developer" job="" doc="documents" />
                        <Link to={'/developer-list'} className="text-decoration-none main-btn">Contact Support</Link>
                    </div>
                </div>
            </header>
        </>
    )
}
export default DeveloperNavigation;