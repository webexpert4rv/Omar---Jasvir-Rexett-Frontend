import React from "react";
import { FaBell } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { Dropdown } from "react-bootstrap";
const DeveloperNavigation = ({ onClick }) => {
    return (
        <>
            <header className="mb-4">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="">
                        {/* <button onClick={onClick} className="bars-btn"><HiBars3 /></button> */}
                    </div>
                    <div className="d-flex gap-3">
                        <Dropdown className="notification-dropdown">
                            <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="notification-dropdown-toggle p-0">
                                <button className="notification-btn"><FaBell /></button>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="notification-dropdown-menu">
                                <Dropdown.Item href="#" className="text-center no-notification">You have no notification</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Link to={'/developer-list'} className="text-decoration-none main-btn">Contact Support</Link>
                    </div>
                </div>
            </header>
        </>
    )
}
export default DeveloperNavigation;